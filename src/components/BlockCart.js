import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const BlockCart = () => {

    const [storage, setStorage] = useState()

    useEffect(() => {
        if (localStorage.getItem('storage') != null) {
            setStorage(JSON.parse(localStorage.getItem('storage')).length)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localStorage.getItem('storage')]);

    return <li className="nav-item">
        <Link className="nav-link" to="/cart" style={{position: "relative"}}>
            <i className="bi bi-cart"/>
            <i style={{position: "absolute", bottom: 20, color: "red"}}>
                <b>{storage}</b>
            </i>
        </Link>
    </li>
}
export default BlockCart