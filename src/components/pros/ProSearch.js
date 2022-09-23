export const ProSearch = ({setterFunction}) => {
    return (
        <div className="search-pro">
            <input onChange={(event) => {
                setterFunction(event.target.value)
            }}
            type="text" placeholder="Enter project type" className="input-search"/>
        </div>
    )
}