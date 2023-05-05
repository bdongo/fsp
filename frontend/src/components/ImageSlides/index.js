import './ImageSlides.css';
import slide1 from '../../assets/liho1.jpeg'
import slide2 from '../../assets/tony.jpeg'
import slide3 from '../../assets/unwin4.jpeg'
import { useEffect, useState } from 'react'

const ImageSlides = () => {
    const [slideImage, setSlideImage] = useState(0);
    const [slideTransition, setSlideTransition] = useState(false);
    const [slogan1, setSlogan1] = useState(true)
    const [slogan2, setSlogan2] = useState(false)
    const [slogan3, setSlogan3] = useState(false)
    const [currentSlogan, setCurrentSlogan] = useState(1);
    const [bar1, setBar1] = useState(false)
    const [bar2, setBar2] = useState(false)
    const [bar3, setBar3] = useState(false)

    
    const slides = [slide1, slide2, slide3]
    const slogans = [setSlogan1, setSlogan2, setSlogan3]

    useEffect(() => {
        const slideShow = setInterval(() => {
            setSlideTransition(true);

            setTimeout(() => {
                setSlideImage((slideImage + 1) % slides.length);
                slogans[currentSlogan](true)
                let previousSlogan = (currentSlogan - 1 + 3) % 3
                slogans[previousSlogan](false)
                setCurrentSlogan((currentSlogan + 1) % 3)
                setSlideTransition(false);
            }, 275)
        }, 7000)
        return () => clearInterval(slideShow)
    }, [slideImage])

    // useEffect(()=> {
    //     const increment = 110 / (7000 / 3)

    //     if (!bar1) {
    //         let width = 0
    //         let bar1Interval = setInterval(()=>{
    //             width += increment
    //             document.getElementById("bar-one").style.height = `${width}px`;
    //             if (width === 110) {
    //                 clearInterval(bar1Interval)
    //             }
    //         }, 1)
    //         if (width === 110) {
    //             clearInterval(bar1Interval)
    //         }
    //         console.log(width)
    //         setBar1(true)
    //     } else if (!bar2) {

    //         setBar1(true)
    //     } else if (!bar3) {

    //         setBar1(false)
    //         setBar2(false)
    //     }
    // }, [slideImage, bar1, bar2, bar3])

    return (
        <>
            <div className='loading-bar-container'>
                <div className='loading-bar'>
                    <div id='bar bar-one'></div>
                    {slogan1 &&
                    <div className='slogan-container'>
                        <h2>Hungry?</h2>
                        <button className='red-button'>American(New)</button>
                    </div>}
                </div>
                <div className='loading-bar'>
                    <div id='bar bar-two'> </div>
                   {slogan2 &&
                    <div className='slogan-container'>
                        <h2>Pizza?</h2>
                        <button className='red-button'>Pizza</button>
                    </div>}
                </div>
                <div className='loading-bar'>
                    <div id='bar bar-three'></div>
                    {slogan3 &&
                    <div className='slogan-container'>
                        <h2>Thirsty?</h2>
                        <button className='red-button'>Wine Bars</button>
                    </div>}
                </div>
            </div>
            <img
                src={slides[slideImage]}
                className={`slideshow-image ${slideTransition ? 'hidden' : ''}`}
            />
        </>

    )
}

export default ImageSlides