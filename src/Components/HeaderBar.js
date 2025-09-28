export default function HeaderBar({children}) {
    return (
        <div className='p-4 w-fit flex gap-8 flex-wrap'>
            <a href="/">
                <img className='w-10' src='/website-large-dark.svg' />
            </a>
            {children}
        </div>
    )
}