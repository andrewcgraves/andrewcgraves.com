import Pill from "./Pill"

const defaultElements = [{name: "ceramics", isDisabled: false}, {name: "design", isDisabled: true}, {name: "projects", isDisabled: true}]

export default function UniversalHeaderBar({children = null}) {
    return (
        <div className='p-4 w-fit flex gap-8 flex-wrap'>
            <a href="/">
                <img className='w-10' src='/website-large-dark.svg' />
            </a>
            {children == null ? defaultElements.map(element => {
                let link = `/${element['name']}`

                return (
                    <Pill link={link} isDisabled={element.isDisabled}>
                        <p>{element['name'].toUpperCase()}</p>
                    </Pill>
                )
            }): children}
        </div>
    )
}