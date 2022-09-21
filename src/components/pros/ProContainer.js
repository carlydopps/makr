import { useState } from "react"
import { ProList } from "./ProList"
import { ProSearch } from "./ProSearch"

export const ProContainer = () => {

    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <ProSearch setterFunction={setSearchTerms}/>
        <ProList searchTermState={searchTerms}/>
    </>
}