import React, { useState } from 'react'
import './Slider.css'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';


const slides = [
    {
        img: '/img/slider/online.jpg',
        alt: 'Online Publications',
    },
    {
        img: '/img/slider/timeline.jpg',
        alt: 'Timeline of Art History',
    },
    {
        img: '/img/slider/primers.jpg',
        alt: 'Primers',
    },
    {
        img: '/img/slider/art.jpg',
        alt: 'Art at Home',
    },
    {
        img: '/img/slider/blogs.jpg',
        alt: 'Blogs',
    },
    {
        img: '/img/slider/openaccess.jpg',
        alt: 'Open Access',
    },
    {
        img: '/img/slider/ceramicist.jpg',
        alt: 'From the Vaults',
    },
    {
        img: '/img/slider/educators.jpg',
        alt: 'Resources for Educators',
    },
    {
        img: '/img/slider/curatorial.jpg',
        alt: 'Collection Areas',
    },
    {
        img: '/img/slider/audioguide.jpg',
        alt: 'Audio Guide Online',
    },
    {
        img: '/img/slider/150th.jpg',
        alt: 'Celebrate 150 years',
    },
    {
        img: '/img/slider/project.jpg',
        alt: 'The Artist Project',
    },
]

export default function Slider() {

    const [index, setIndex] = useState(4)

    const prev = () => {
        if (index >= 1) {
            setIndex(index => index - 1)
        }
    }

    const next = () => {
        if (index <= 7) {
            setIndex(index => index + 1)
        }
    }


    return (
        <div className="slider-wrapper">
            <div className="slider" style={{ left: (-25 * index) + 'vw' }}>
                {
                    slides.map(item => 
                        <figure className="slide" key={item.img}>
                            <img src={item.img} alt={item.alt} />
                            <figcaption>{item.alt}</figcaption>
                        </figure>
                    )
                }
            </div>
            <div id="prev" onClick={prev}><ArrowBackIcon /></div>
            <div id="next" onClick={next}><ArrowForwardIcon /></div>
        </div>
    )
}
