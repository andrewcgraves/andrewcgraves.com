export default function Pill({ link, h = 8, children, isDisabled = false}) {

    if (isDisabled) {
        return (
            <div className={`object-contain flex-none h-${h} w-fit header-cat`}>
                <div className='rounded-lg h-full grid place-content-center disabled'>
                    {children}
                </div>
            </div>
        )
    } else {
        return (
            <a href={link} className={`object-contain flex-none h-${h} w-fit header-cat`}>
                <div className='rounded-lg hover:px-4 ease-in-out duration-200 h-full grid place-content-center hover:bg-black hover:text-white'>
                    {children}
                </div>
            </a>
        )
    }

}