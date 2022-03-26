import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import BasicApi from "../api/BasicApi";
import BlockCart from "./BlockCart";

const Header = () => {
    const [category, setCategory] = useState({message: null, success: null, data: []})

    useEffect(() => {
        fetch(BasicApi.getAllCategory('structure=true').url)
            .then((res) => res.json())
            .then((o) => setCategory(o));
    }, []);

    return <header>
        <nav className="fixed-top container">
            <Link to="/">
                <h2 className="align-middle text-center" style={{backgroundColor: "white"}}>
                    <em>
                        <b className="text-warning"> Ben<span className="text-muted"> Shop</span></b>
                    </em>
                </h2>
            </Link>
            <ul className="nav nav-tabs" style={{backgroundColor: "white", marginTop: -10}}>
                <li className="nav-item">
                    <Link className="nav-link active" to="/">Trang chủ</Link>
                </li>

                <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" data-toggle="dropdown" to="/product" role="button"
                          aria-expanded="false">Sản phẩm</Link>
                    <div className="dropdown-menu">
                        {category.data.map(o =>
                            <div key={o.id}>
                                <Link className="dropdown-item"
                                      to={`/product?category=${o.id}`}>{o.name}</Link>
                                {o.categories1.map(oo =>
                                    <ul key={oo.id}>
                                        <li>
                                            <Link to={`/product?category=${oo.id}`}
                                                  className="dropdown-item">{oo.name}</Link>
                                            {oo.categories2.map(ooo =>
                                                <ul key={ooo.id}>
                                                    <li>
                                                        <Link to={`/product?category=${ooo.id}`}
                                                              className="dropdown-item">{ooo.name}</Link>
                                                    </li>
                                                </ul>
                                            )}
                                        </li>
                                    </ul>
                                )}
                            </div>
                        )}
                    </div>
                </li>
                <BlockCart/>
                <li className="nav-item">
                    <a className="nav-link" href="/"><i className="bi bi-person-circle"/></a>
                </li>
            </ul>
        </nav>
    </header>
}
export default Header