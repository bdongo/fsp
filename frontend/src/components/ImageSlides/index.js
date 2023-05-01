import './ImageSlides.css';
import slide1 from '../../assets/liho1.jpeg'
import slide2 from '../../assets/tony.jpeg'
import slide3 from '../../assets/unwin4.jpeg'
import { useEffect, useState } from 'react'

const ImageSlides = () => {
    const [slideImage, setSlideImage] = useState(0);
    const [slideTransition, setSlideTransition] = useState(false);
    
    const slides = [slide1, slide2, slide3]

    useEffect(() => {
        const slideShow = setInterval(() => {
            setSlideTransition(true);

            setTimeout(() => {
                setSlideImage((slideImage + 1) % slides.length);
                setSlideTransition(false);
            }, 275)
        }, 7000)
        return () => clearInterval(slideShow)
    }, [slideImage])

    return (
        <img
            src={slides[slideImage]}
            className={`slideshow-image ${slideTransition ? 'hidden' : ''}`}
        />
    )
}

export default ImageSlides