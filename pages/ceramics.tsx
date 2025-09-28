import Head from 'next/head'
import UniversalHeaderBar from '../src/Components/UniversalHeaderBar.js'
import Pill from '../src/Components/Pill.js'

import PhotoSwipeLightbox from 'photoswipe/lightbox'
import 'photoswipe/style.css'

import { useEffect, useState } from 'react'

interface Photo {
    src: string,
    width: number,
    height: number,
    caption: string
}

const photos: Array<Photo> = [
    {
        src: "ceramics/two-mugs.jpg",
        width: 200,
        height: 100,
        caption: ""
    },
    {
        src: "ceramics/ramen-bowls.jpg",
        width: 200,
        height: 3,
        caption: ""
    },
    {
        src: "ceramics/raw-angular-mugs.jpg",
        width: 2,
        height: 3,
        caption: ""
    },
    {
        src: "ceramics/raw-various-pieces.jpg",
        width: 2,
        height: 3,
        caption: ""
    },
    {
        src: "ceramics/two-celedon-mugs.jpg",
        width: 2,
        height: 3,
        caption: ""
    },
    {
        src: "ceramics/cobalt-cup-and-saucer.jpg",
        width: 3024,
        height: 4032,
        caption: ""
    },
    {
        src: "ceramics/single-mug.jpg",
        width: 2,
        height: 3,
        caption: ""
    },
]

export default function Ceramics() {
    // useEffect(() => {
    //     let lightbox = new PhotoSwipeLightbox({
    //         gallery: '#image-gallery',
    //         children: 'a',
    //         pswpModule: () => import('photoswipe')
    //     })
    //     lightbox.init()

    //     return () => {
    //         lightbox.destroy();
    //     }
    // }, [])

    return (
        <div>
            <Head>
                <title>Andrew Graves</title>
                <meta name="description" content="I'm Andrew Graves and this is my personal website!" />
                <link rel="icon" href="/logo.png" />
            </Head>
            <main>
                <UniversalHeaderBar/>
                <div className='main-container'>
                    <h1>Ceramics: IN PROGRESS</h1>
                    <p>Ceramics has become a big part of my life in the last few years. I teach and produce work with CSU Channel Islands, where I graduated. Ceramics is one of the ways I unwind, and express my creativity. Here are some of my favorite pieces.</p>
                    <div id="image-gallery" className="pwsp-gallery grid grid-cols-2 md:grid-cols-3 gap-4 pt-8">
                        {photos.map(photo => {
                            return (
                                // <a href={photo.src}
                                // data-pswp-width={photo.width}
                                // data-pwsp-height={photo.height}
                                // data-cropped="true"
                                // target="_blank"
                                // rel="noreferrer"
                                // >
                                //     <img src={photo.src}></img>
                                // </a>
                                <img className="max-w-full object-cover object-center" src={photo.src}></img>
                            )
                        })}
                    </div>
                </div>
            </main>
        </div>
    )
}
