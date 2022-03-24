import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import BasicApi from "../api/BasicApi";
import '../assets/css/Header.css'

const Header = () => {
    const [category, setCategory] = useState({message: null, success: null, data: []})

    useEffect(() => {
        fetch(BasicApi.getAllCategory('structure=true').url)
            .then((res) => res.json())
            .then((o) => setCategory(o));
    }, []);
    console.log(category)

    return <header>
        <nav className="fixed-top container">
            <ul className="nav nav-tabs bg-primary">
                <li className="nav-item" style={{border: "1px solid white"}} >
                    <Link className="nav-link active" to="/">Trang chủ</Link>
                </li>

                <li className="nav-item dropdown" style={{border: "1px solid white"}}>
                    <Link className="nav-link dropdown-toggle" style={{color: "white"}} data-toggle="dropdown" to="/product" role="button"
                          aria-expanded="false">Sản phẩm</Link>
                    <div className="dropdown-menu">
                        {category.data.map(o =>
                            <>
                                <Link key={o.id} className="dropdown-item"
                                      to={`/product?category=${o.id}`}>{o.name}</Link>
                                {o.categories1.map(oo =>
                                    <ul key={oo.id}>
                                        <li>
                                            <a className="dropdown-item">{oo.name}</a>
                                            {oo.categories2.map(ooo =>
                                                <ul key={ooo.id}>
                                                    <li>
                                                        <a className="dropdown-item">{ooo.name}</a>
                                                    </li>
                                                </ul>
                                            )}
                                        </li>
                                    </ul>
                                )}
                            </>
                        )}
                    </div>
                </li>
                <li className="nav-item" style={{border: "1px solid white"}}>
                    <a className="nav-link" style={{color: "white"}} href="#">Giỏ hàng <i className="bi bi-cart"></i></a>
                </li>
                <li className="nav-item" style={{border: "1px solid white"}}>
                    <a className="nav-link" style={{color: "white"}}>Tài khoản <i className="bi bi-person-circle"></i></a>
                </li>
            </ul>
        </nav>
    </header>
}
export default Header