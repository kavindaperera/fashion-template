import { SubmissionError, reset } from 'redux-form'
import { closeModal } from '../modals/modalActions'
import React from 'react';
import { toastr } from 'react-redux-toastr'
import firebase from '../../app/config/firebase';
import {asyncActionStart,asyncActionFinish,asyncActionError} from "../async/asyncActions";
import { createNewReviewObj } from '../../app/common/util/helpers';
import {Icon,} from 'semantic-ui-react';

/*
export const oldShareReview = (review, item, currentStore) => {

    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = firebase.firestore();
        const fb = getFirebase();
        const user = fb.auth().currentUser;
        const toastrOptions = {
            timeOut: 6000,
            icon: (<Icon  circular name='star outline' size='big' />),
            progressBar: true,
          }

        if(user!==null && review ){
            dispatch(asyncActionStart());
            let reviewObj = createNewReviewObj(user, review)
            return firestore
                .collection('Stores')
                .doc(currentStore)
                .collection('Items')
                .doc(item)
                .get()
                .then(dataSnapshot => {
                    let reviews = dataSnapshot.get('reviews')
                    return reviews ? reviews : []
                })
                .then(reviews => { 
                    reviews.forEach( review => {
                        if (review.buyer == user.uid){
                            throw new Error ('Already Reviewed')
                        }
                    })
                    reviews.push(reviewObj)
                    return firestore
                        .collection('Stores')
                        .doc(currentStore)
                        .collection('Items')
                        .doc(item)
                        .update({ 'reviews' : reviews})
                        .then(
                            toastr.light('Review Shared', 'Thank you for Reviewing', toastrOptions)
                        ).then(
                            dispatch(updateRatings(review.rating, item, currentStore))
                        )
                }).then(
                    dispatch(asyncActionFinish())
                ).catch((error) => {
                    dispatch(asyncActionError())
                    console.log(error.name)
                    toastr.error('Already Reviewed', "Visit Item Details to view the review",toastrOptions);
                })
        } else {
            dispatch(asyncActionError())
            toastr.error('Error', 'Something When Wrong, Try Again!!');
        }
    }

}


export const updateRatings = (rating, item, currentStore) => {
    return async (dispatch, { }) => {
        const firestore = firebase.firestore();
        if(rating){
            dispatch(asyncActionStart());
            return firestore
                .collection('Stores')
                .doc(currentStore)
                .collection('Items')
                .doc(item)
                .get()
                .then(dataSnapshot => {
                    let ratingObj = dataSnapshot.get('rating');
                    ratingObj.ratingCount += 1;
                    ratingObj.totalRating += rating;
                    return ratingObj
                }).then( ratingObj => {
                    return firestore
                        .collection('Stores')
                        .doc(currentStore)
                        .collection('Items')
                        .doc(item)
                        .update({ 'rating' : ratingObj})
                 } )
        }
    }

}*/



export const shareReview = (review, item, currentStore) => {

    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = firebase.firestore();
        const fb = getFirebase();
        const user = fb.auth().currentUser;
        const toastrOptions = {
            timeOut: 6000,
            icon: (<Icon  circular name='star outline' size='big' />),
            progressBar: true,
          }

        if(user!==null && review ){
            dispatch(asyncActionStart());
            let reviewObj = createNewReviewObj(user, review)

            let ItemDocRef = firestore.collection('Stores')
                                .doc(currentStore)
                                .collection('Items')
                                .doc(item)
            await firestore.runTransaction( async (transaction) => {
                const dataSnapshot = await transaction.get(ItemDocRef)
                let reviews = dataSnapshot.get('reviews')
                reviews.forEach( review => {
                    if (review.buyer == user.uid){
                        throw new Error ('Already Reviewed')
                    }
                    })
                reviews.push(reviewObj)
                console.log(reviews)

                let ratingObj  = dataSnapshot.get('rating')
                ratingObj.ratingCount += 1;
                ratingObj.totalRating += review.rating;

                await transaction.update(ItemDocRef, { 'reviews' : reviews, 'rating' : ratingObj} )

                toastr.light('Review Shared', 'Thank you for Reviewing', toastrOptions)

                dispatch(asyncActionFinish())

                dispatch(closeModal())

            })

            .catch((error) => {
                dispatch(asyncActionError())
                console.log(error)
                toastr.error("Transaction failed: ", error.message ,toastrOptions);
            })
        } else {
            dispatch(asyncActionError())
            toastr.error('Error', 'Something When Wrong, Try Again!!');
        }
    }

}