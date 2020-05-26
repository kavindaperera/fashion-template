import React, { Component } from 'react';
import LazyImage from '../lazyImage/LazyImage';




class TestComponent extends Component {

   

    render() {


        const src = "https://aritzia.scene7.com/is/image/Aritzia/zoom/s20_03_a03_76700_18319_on_a.jpg"
        const thumb = "https://aritzia.scene7.com/is/image/Aritzia/large/s20_03_a06_68177_221_on_b.jpg"

        return (
                <div>
                    <LazyImage alt="test" thumb={thumb} src={src}/>
                </div>
        );
    }
};

export default TestComponent