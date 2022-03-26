import {Link} from "react-router-dom";
import {useState} from "react";
import {useNotification} from "react-hook-notification";
import Order from "../components/Order";

const Cart = () => {
    document.title = 'Giỏ hàng'
    const notification = useNotification();
    let storage = localStorage.getItem('storage')
    let list
    let sum = 0
    if (storage != null) {
        list = JSON.parse(storage)
        list.map(o => {
            sum += o.money * o.quantity
        })
    } else {
        list = []
    }
    const [listState, setListState] = useState(list)

    const handleDescription = (id, description) => {
        let list = JSON.parse(localStorage.getItem('storage'))
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === id) {
                list[i].description = description
                break
            }
        }
        localStorage.setItem('storage', JSON.stringify(list))
    }

    const handleQuantityCong = (id) => {
        let list = JSON.parse(localStorage.getItem('storage'))
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === id) {
                list[i].quantity += Number(1)
                if (list[i].quantity > 1000) {
                    list[i].quantity -= Number(1)
                    notification.error({
                        text: 'Số lượng tối đa 1000'
                    })
                }
                break
            }
        }
        localStorage.setItem('storage', JSON.stringify(list))
        setListState(list)
    }
    const handleQuantityTru = (id) => {
        let list = JSON.parse(localStorage.getItem('storage'))
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === id) {
                list[i].quantity -= Number(1)
                if (list[i].quantity < 1) {
                    list[i].quantity += Number(1)
                    notification.error({
                        text: 'Số lượng tối thiểu 1'
                    })
                }
                break
            }
        }
        localStorage.setItem('storage', JSON.stringify(list))
        setListState(list)
    }

    const handleQuantityXoa = (id) => {
        let list = JSON.parse(localStorage.getItem('storage'))
        let list1 = list.filter(o => o.id !== id)
        localStorage.setItem('storage', JSON.stringify(list1))
        setListState(list1)
    }

    return <main style={{marginTop: 120, minHeight: 500}}>
        <p className="text-warning">
            <div style={{marginBottom: 20}}>
                <Link to="/">Trang chủ</Link>/<Link to="/product">Sản phẩm</Link>/Giỏ hàng
            </div>
        </p>
        {listState.map(o =>
            <div key={o.id} className="row text-secondary" style={{marginTop: 5}}>
                <div className="col-sm-2">
                    <Link to={`/product-detail?id=${o.id}`}>
                        <img className="img-fluid" style={{maxHeight: 200, borderRadius: 5}} src={o.image} alt=""/>
                    </Link>
                </div>
                <div className="col-sm-10" style={{padding: 0, margin: 0}}>
                    <ul>
                        <li>Mã sản phẩm: <span>{o.id}</span></li>
                        <li>Tên: <span>{o.name}</span></li>
                        <li>Giá: <span>{o.money}</span></li>
                        <li>Yêu cầu:
                            <textarea onChange={(e) => handleDescription(o.id, e.target.value)}
                                      className="form-control">{o.description}</textarea>
                        </li>
                        <li>
                            Số lượng: <input type="number" className="form-control"
                                             style={{maxWidth: 100, display: "inline", marginTop: 5}}
                                             value={o.quantity}/>
                            <i className="bi bi-plus-circle-fill text-success" style={{margin: "0 30px"}}
                               onClick={() => handleQuantityCong(o.id)}/>
                            <i className="bi bi-dash-circle-fill text-danger" onClick={() => handleQuantityTru(o.id)}/>
                            <i className="bi bi-trash3-fill text-danger" style={{margin: "0 0 0 30px"}}
                               onClick={() => handleQuantityXoa(o.id)}/>
                        </li>
                        <li>Thành tiền:
                            <span> {o.money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} x {o.quantity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} = {(o.money * o.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</span>
                        </li>
                    </ul>
                </div>
                <div className="col-12">
                    <hr/>
                </div>
            </div>
        )}
        <h3 className="text-secondary">Tổng: <span
            className="text-danger">{sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</span></h3>
        <Order/>
    </main>
}
export default Cart