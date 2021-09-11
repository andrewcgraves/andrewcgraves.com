// import Head from 'next/head'
import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import styles from '../../styles/Home.module.css'

export default function LinkBox({ link, imgSrc, width, height }) {
    return(
        <div>
            <a className={styles.linkBox} href={link} target="_blank">
                <Image src={imgSrc} width={width} height={height}/>
            </a>
        </div>
    )
}