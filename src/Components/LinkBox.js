// import Head from 'next/head'
import Image from 'next/image'
// import styles from '../styles/Home.module.css'
// import styles from '../../styles/Home.module.css'

export default function LinkBox({ link, imgSrc, width, height }) {
    return(
        <a href={link} target="_blank">
            <div className='p-4 bg-slate-950 hover:bg-slate-900 rounded-xl hover:scale-105 hover:-translate-x-1/8 hover:-translate-y-1 hover:drop-shadow-lg ease-in-out duration-200'>
                <Image src={imgSrc} width={width} height={height}/>
            </div>
        </a>
    )
}