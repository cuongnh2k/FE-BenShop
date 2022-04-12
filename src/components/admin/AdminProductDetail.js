import {useEffect, useState} from "react";
import BasicApi from "../../api/BasicApi";
import AdminApi from "../../api/AdminApi";
import Domain from "../../api/Domain";
import AdminAddProductImage from "../../pages/admin/AdminAddProductImage";
import AdminDeleteProductImage from "./AdminDeleteProductImage";

const AdminProductDetail = (props) => {
    const [product, setProduct] = useState(props.product)

    const [name, setName] = useState(product.name)
    const [price, setPrice] = useState(product.price)
    const [discount, setDiscount] = useState(product.discount)
    const [description, setDescription] = useState(product.discount)


    const [checked, setChecked] = useState([...product.categories.map(ca => ca.id)])

    const handleCheck = (id) => {
        setChecked(prev => {
            if (checked.includes(id)) {
                return checked.filter(item => item !== id)
            }
            return [...prev, id]
        })
    }
    useEffect(() => {
        fetch(AdminApi.editProduct(props.product.id).url, {
            method: AdminApi.editProduct(props.product.id).method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            },
            body: JSON.stringify({
                name: name,
                price: price,
                discount: discount,
                description: description,
                categories: checked.toString()
            })
        })
            .then(resp => resp.json())
            .then(o => {
                    console.log(o.message)
                    if (o.success === false) {
                        if (o.errorCode === 401) {
                            if (localStorage.getItem('refreshToken') == null) {
                                window.location = Domain + "/login"
                            } else {
                                fetch(BasicApi.refreshToken().url, {
                                    method: BasicApi.refreshToken().method,
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': 'Bearer ' + localStorage.getItem('refreshToken')
                                    }
                                })
                                    .then(resp => resp.json())
                                    .then(oo => {
                                        if (oo.success === false) {
                                            document.location = window.location = Domain + "/login"
                                        } else {
                                            localStorage.setItem('accessToken', oo.data.accessToken)
                                            localStorage.setItem('refreshToken', oo.data.refreshToken)
                                            AdminProductDetail()
                                        }
                                    })
                            }
                        }
                    }
                }
            )
    }, [name, price, discount, description, checked]);

    return <>
        <p className="text-primary" data-toggle="modal"
           data-target={`#ChiTietProductAdmin${product.id}`}>Chi tiết</p>
        <div className="modal fade" id={`ChiTietProductAdmin${product.id}`} tabIndex="-1"
             aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{name}</h5>
                        <button type="button" className="close" data-dismiss="modal"
                                aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-md-9">
                                <div className="row">
                                    <div className="col-sm-9">
                                        <ul>
                                            <li><AdminAddProductImage product={product}/></li>
                                            <li style={{marginTop: 10}}>Mã sản phẩm: <a
                                                href={`/product-detail?id=${product.id}`}>{product.id}</a>
                                            </li>
                                            <li style={{marginTop: 10}}>
                                                Tên: <input className="form-control" defaultValue={name}
                                                            onChange={e => setName(e.target.value)}/>
                                            </li>
                                            <li style={{marginTop: 10}}>
                                                Giá: <input defaultValue={price}
                                                            onChange={e => setPrice(e.target.value)}/> VND
                                            </li>
                                            <li style={{marginTop: 10}}>
                                                Giảm giá: <input style={{width: 150}}
                                                                 defaultValue={discount}
                                                                 type="number"
                                                                 onChange={e => setDiscount(e.target.value)}/> %
                                            </li>
                                            <li style={{marginTop: 10}}>Giá thực
                                                tế: {(price / 100 * (100 - discount)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND
                                            </li>
                                            <li style={{marginTop: 10}}>Mô tả:
                                                <textarea className="form-control" rows="10"
                                                          onChange={e => setDescription(e.target.value)}>{description}</textarea>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-sm-3">
                                        {product.productImages.map(pi =>
                                            <div key={pi.id}>
                                                <i className="bi bi-pencil-fill text-warning"/>
                                                <AdminDeleteProductImage productImage={pi}/>
                                                <img src={pi.path} className="img-thumbnail"
                                                     alt={product.name}/>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                {props.category.data.map(oo =>
                                    <div key={oo.id}>
                                        <input type="checkbox" checked={checked.includes(oo.id)}
                                               onChange={() => handleCheck(oo.id)}/>
                                        {oo.name}
                                        <br/>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default AdminProductDetail