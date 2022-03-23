import '../css/Header.css'
import {useEffect, useState} from "react";
import BasicApi from "../api/BasicApi";

const Header = () => {
    const [category, setCategory] = useState()

    useEffect(() => {
        fetch(BasicApi.getAllCategory('structure=true').url)
            .then((res) => res.json())
            .then((data) => setCategory(data));
    }, []);

    console.log(category)

    return <>

    </>
}
export default Header