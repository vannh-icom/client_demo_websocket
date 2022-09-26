import OrderInfo from "./OrderInfo";

function AppElectric(props) {
    const {order,closeOrder} = props;
    const handleAcceptOrder = ()=>{
        props.handleAcceptOrder(order)
    }
    return (
        <div>
            {order ?
            <div className="orderDetail">
                <OrderInfo order={order} /> 
                {closeOrder ? <p>Đơn hàng đã quá thời hạn tiếp nhận</p>
                :
                <button onClick={handleAcceptOrder} className="btn btn-success">Nhận Order</button>
                }
            </div>
            :null}
        </div>
    );
}
export default AppElectric;