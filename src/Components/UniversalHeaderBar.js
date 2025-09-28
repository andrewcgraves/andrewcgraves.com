import Pill from "./Pill"

const defaultElements = ["ceramics", "design", "projects"]

export default function UniversalHeaderBar({children = null}) {
    return (
        <div className='p-4 w-fit flex gap-8 flex-wrap'>
            <a href="/">
                <img className='w-10' src='/website-large-dark.svg' />
            </a>
            {children == null ? defaultElements.map(element => {
                let link = `/${element}`

                return (
                    <Pill link={link}>
                        <p>{element.toUpperCase()}</p>
                    </Pill>
                )
            }): children}
        </div>
    )
}