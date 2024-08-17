export default function Pill(props) {
    return(
        <div onClick={props.onClick} className='px-4 py-2 bg-slate-950 hover:bg-slate-900 rounded-lg hover:px-8 ease-in-out duration-200 h-full grid place-content-center cursor-pointer'>
            {props.children}
        </div>
    )
}