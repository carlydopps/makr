export const ProSearch = ({setterFunction}) => {
    return (
        <div>
            <input onChange={(event) => {
                setterFunction(event.target.value)
            }}
            type="text" placeholder="Enter project type"/>
        </div>
    )
}