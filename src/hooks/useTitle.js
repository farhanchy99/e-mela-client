import {useEffect} from "react"

const useTitle = title =>{
    useEffect(()=>{
        document.title=`${title} - GoodMan Gaming`;
    }, [title])
}

export default useTitle;