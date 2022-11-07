import OrderInfo from "./OrderInfo";

function AppElectric(props) {
    const {orders,closeOrder} = props;
    const handleAcceptOrder = (order)=>{
        props.handleAcceptOrder(order)
    }
    let ordersView = orders && orders.length > 0 ?
    orders.map((order, idx)=>{
        return (
            <div key={idx} style={{ marginBottom: '20px' }}>
                <OrderInfo order={order} /> 
                <button onClick={()=>handleAcceptOrder(order)} className="btn btn-success">Nhận Order</button>
            </div>
        )
    }):null;
    return (
        <div>
            {ordersView}
        </div>
    );
}
export default AppElectric;