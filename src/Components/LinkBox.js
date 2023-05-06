import Image from 'next/image'

export default function LinkBox({ link, imgSrc, size}) {
    return(
        <a href={link} target="_blank" className={`object-contain aspect-square flex-none h-${size}`}>
            <div className='p-4 bg-slate-950 hover:bg-slate-900 rounded-xl hover:scale-105 hover:-translate-x-1/8 hover:-translate-y-1 hover:drop-shadow-lg ease-in-out duration-200 h-full grid place-content-center'>
                <Image src={imgSrc}/>
            </div>
        </a>
    )
}