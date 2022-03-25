import {useEffect, useState} from "react";

const BlockCart = () => {

    const [storage, setStorage] = useState()

    useEffect(() => {
        if(localStorage.getItem('storage')!=null){
            setStorage(JSON.parse(localStorage.getItem('storage')).length)
        }
    }, [storage]);

    return <li className="nav-item">
        <a className="nav-link" href="/" style={{position: "relative"}}>
            <i className="bi bi-cart"/>
            <i style={{position: "absolute", bottom: 20, padding: "0 5px 0 5px", color: "red"}}>
                <b>{storage}</b>
            </i>
        </a>
    </li>
}
export default BlockCart