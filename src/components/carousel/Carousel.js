import React from 'react';

import './Carousel.css';
import Image from '../helpers/Image';
import Button from '../helpers/Button';

const Carousel = ({imageSrcList}) => {
    let scrollPerClick;
    let imagePadding = 20;
    let scrollAmount = 0;
    let btnClass = 'sliderbutton';
    let leftBtnClass = btnClass + ' switchLeft';
    let rightBtnClass = btnClass + ' switchRight';

    const assetsURL = process.env.PUBLIC_URL + '/assets/';
    const noImageSelectedImageSrc = assetsURL + 'no-image-selected.png';

    return (
        <div>
            <div className="prev-image-container">
                <Image src={noImageSelectedImageSrc} isPreviewImg={true} />
            </div>
            <div className="carousel">
                <div className="sliders">
                    {
                        typeof imageSrcList !== undefined && imageSrcList !== null && imageSrcList.length > 0
                        ? imageSrcList.map((image) => (
                            image && <Image key={image} src={assetsURL+ image} isPreviewImg={false} onImageClick={onImageClick}  />
                        ))
                        : <p className='text'> Something went wrong :( </p>                       
                    }  
                </div>

                <Button className={leftBtnClass} text='<' onClick={sliderScrollLeft}/>
                <Button className={rightBtnClass} text='>' onClick={sliderScrollRight}/>
            </div>
        </div>
    )

    function sliderScrollLeft() {
        const sliders = getSliderElement();
        scrollPerClick = getSliderImageWidth();

        if(sliders && scrollPerClick){
            sliders.scrollTo({
                top:0,
                left: (scrollAmount -= scrollPerClick),
                behavior: 'smooth'
            });
        
            if(scrollAmount < 0){
                scrollAmount = 0;
            }
        }
    }
        
    function sliderScrollRight(params) {
        const sliders = getSliderElement();
        scrollPerClick = getSliderImageWidth();

        if(sliders && scrollPerClick && scrollAmount <= sliders.scrollWidth - sliders.clientWidth){
            sliders.scrollTo({
                top:0,
                left: (scrollAmount += scrollPerClick),
                behavior: 'smooth'
            });
        }
    }

    function onImageClick(imgSrc){
        if(imgSrc){
            document.querySelector('.preview-image').src = imgSrc;
        }
    }

    function getSliderElement() {
        return document.querySelector('.sliders');
    }

    function getSliderImageWidth() {
        const sliders = getSliderElement();
        
        if(sliders){
            return sliders.firstChild.clientWidth + imagePadding;
        }

        return null;
    }
}

export default Carousel