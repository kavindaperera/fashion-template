import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const SocialLogin = ({socialLogin, currentStore}) => {
    return (
           <div>
             <Button onClick={()=> socialLogin('facebook', currentStore)} type="button" style={{ marginBottom: '10px' }} fluid color="facebook">
               <Icon name="facebook" /> Continue with Facebook
             </Button>
             {/*<Button onClick={()=> socialLogin('google')} type="button" fluid color="google plus">
               <Icon name="google plus" />
               Login with Google
             </Button>*/}
           </div>
    )
}

export default SocialLogin
