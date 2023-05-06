export default function HeaderBar({children}) {
    return (
        <div className='w-fit mb-4 flex gap-4 flex-wrap'>
            {children}
        </div>
    )
}