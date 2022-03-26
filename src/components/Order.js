import Domain from "../api/Domain";

const Order = () => {

    const handlePayment = () => {
        if (localStorage.getItem('accessToken') == null) {
            window.location = Domain + "/login"
        }
    }

    return <button onClick={handlePayment} className="btn btn-success">
        Đặt hàng
    </button>
}
export default Order