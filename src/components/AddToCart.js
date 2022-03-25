const AddToCart = (props) => {
    let price = props.product.data.price + ''
    let money = props.product.data.money + ''
    return <>
        <h2>{props.product.data.name}</h2>
        <p>
            <del
                className="text-secondary">{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </del>
            VND
        </p>
        <h3 className="text-danger">{money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND</h3>
        <p style={{marginTop: 20}}>Số lượng</p>
        <input type="number" className="form-control" style={{maxWidth: 100, display: "inline"}} min="1" max="1000"/>
        <button style={{margin: "-5px 0 0 5px"}} className="btn btn-success">
            <i className="bi bi-cart-plus"></i>
        </button>
    </>
}
export default AddToCart