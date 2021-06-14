// import Head from 'next/head'
import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import styles from '../../styles/Home.module.css'

export default function LinkBox({ link, imgSrc, width, height }) {
    return(
        <div>
            <button className={styles.linkBox} onClick={() => window.open(link)}>
                <Image src={imgSrc} width={width} height={height}/>
            </button>
            {/* <div style={{position: 'relative', top: '-24px', left: '70px'}}>
                <Image src="/linkImg.png" width={32} height={32}/>
            </div> */}
        </div>
    )
}