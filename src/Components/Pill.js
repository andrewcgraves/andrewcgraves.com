export default function Pill({ link, h = 8, children}) {
    return(
        <a href={link} className={`object-contain flex-none h-${h} w-fit `}>
            <div className='px-4 py-2 bg-slate-950 hover:bg-slate-900 rounded-lg hover:px-8 ease-in-out duration-200 h-full grid place-content-center'>
                {children}
            </div>
        </a>
    )
}