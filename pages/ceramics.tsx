import Head from 'next/head'
import UniversalHeaderBar from '../src/Components/UniversalHeaderBar.js'

import PhotoSwipeLightbox from 'photoswipe/lightbox'
import 'photoswipe/style.css'
import Image from 'next/image.js'

interface Photo {
    src: string,
    width: number,
    height: number,
    caption: string
}

const photos: Array<Photo> = [
    {
        src: "https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f102cf27e30aa6989_d20250928_m175150_c004_v0402007_t0052_u01759081910219",
        width: 4032,
        height: 3024,
        caption: ""
    },
    {
        src: "https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f1071b9487835410b_d20250928_m175133_c004_v0402026_t0024_u01759081893909",
        width: 6240,
        height: 4160,
        caption: ""
    },
    {
        src: "https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f10786810c074c97b_d20250928_m175136_c004_v0402000_t0057_u01759081896368",
        width: 4032,
        height: 3024,
        caption: ""
    },
    {
        src: "https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f107d8a16ace0d755_d20250928_m175144_c004_v0402029_t0054_u01759081904111",
        width: 6240,
        height: 4160,
        caption: ""
    },
    {
        src: "https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f1197e503498e592d_d20250928_m175148_c004_v0402026_t0003_u01759081908161",
        width: 4032,
        height: 3024,
        caption: ""
    },
    {
        src: "https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f11984df882bd8f37_d20250928_m175126_c004_v0402012_t0036_u01759081886846",
        width: 3024,
        height: 4032,
        caption: ""
    },
    {
        src: "https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f101f76678969f1dc_d20250928_m175145_c004_v0402028_t0032_u01759081905173",
        width: 3024,
        height: 4032,
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
                    <div id="image-gallery" className="pwsp-gallery grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0 sm:gap-4 pt-8">
                        <div>
                            {photos.map((photo, index) => {
                                if (index % 3 == 0) {
                                    return <Image className="photo-grid-photo" id={photo.src} src={photo.src} alt={photo.caption} width={photo.width} height={photo.height}></Image>
                                }
                            })}
                        </div>
                        <div>
                            {photos.map((photo, index) => {
                                if (index % 3 == 1) {
                                    return <Image className="photo-grid-photo" id={photo.src} src={photo.src} alt={photo.caption} width={photo.width} height={photo.height}></Image>
                                }
                            })}
                        </div>
                        <div>
                            {photos.map((photo, index) => {
                                if (index % 3 == 2) {
                                    return <Image className="photo-grid-photo" id={photo.src} src={photo.src} alt={photo.caption} width={photo.width} height={photo.height}></Image>
                                }
                            })}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
