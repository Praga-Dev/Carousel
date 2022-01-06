import React, { useRef, useEffect, useState } from 'react';

import './Carousel.css';
import Image from '../helpers/Image';
import Button from '../helpers/Button';

const Carousel = ({ imageSrcList }) => {
    const assetsURL = process.env.PUBLIC_URL + '/assets/';
    const noImageSelectedImageSrc = assetsURL + 'no-image-selected.png';
    const imagePadding = 30;
    const btnClass = 'sliderbutton';
    const leftBtnClass = btnClass + ' switchLeft';
    const rightBtnClass = btnClass + ' switchRight';

    let slidersRef = useRef(null);
    let scrollPerClickRef = useRef(0);

    let [scrollAmount, setScrollAmount] = useState(0);
    let [activeSlide, setActiveSlide] = useState(noImageSelectedImageSrc);

    useEffect(() => {
        if (slidersRef.current && slidersRef.current.firstChild && slidersRef.current.firstChild.clientWidth
            && !isNaN(slidersRef.current.firstChild.clientWidth)) {
            scrollPerClickRef.current = slidersRef.current.firstChild.clientWidth + imagePadding;
        }
    })

    return (
        <>
            <div className="prev-image-container">
                <Image src={activeSlide} isPreviewImg={true} />
            </div>
            <div className="carousel">
                <div ref={slidersRef} className="sliders">
                    {
                        typeof imageSrcList !== undefined && imageSrcList !== null && imageSrcList.length > 0
                            ? imageSrcList.map((image) => (
                                image && <Image key={image} src={assetsURL + image} isPreviewImg={false} onImageClick={onImageClick} />
                            ))
                            : <p className='text'> Something went wrong :( </p>
                    }
                </div>

                <Button className={leftBtnClass} text='<' onClick={sliderScrollLeft} />
                <Button className={rightBtnClass} text='>' onClick={sliderScrollRight} />
            </div>
        </>
    )

    function sliderScrollLeft() {
        const sliders = slidersRef.current;

        if (sliders && scrollPerClickRef.current && !isNaN(scrollPerClickRef.current)) {
            sliders.scrollTo({
                top: 0,
                left: (scrollAmount -= scrollPerClickRef.current),
                behavior: 'smooth'
            });

            if (scrollAmount < 0) {
                setScrollAmount(0);
            }
        }
    }

    function sliderScrollRight() {
        const sliders = slidersRef.current;

        if (sliders && scrollPerClickRef.current && !isNaN(scrollPerClickRef.current)
            && scrollAmount <= sliders.scrollWidth - sliders.clientWidth) {
            sliders.scrollTo({
                top: 0,
                left: (scrollAmount += scrollPerClickRef.current),
                behavior: 'smooth'
            });
        }
    }

    function onImageClick(imgSrc) {
        if (imgSrc) {
            setActiveSlide(imgSrc);
        }
    }
}

export default Carousel