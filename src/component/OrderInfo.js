function OrderInfo(props) {
    const {order} = props;
    return (
        <div>
            <h3>Đơn hàng: {order.order_code}</h3>
            <p>Thời gian đặt: {order.expected_support_time}</p>
            <p>Địa chỉ: {order.latitude} - {order.longitude}</p>
        </div>
    );
}
export default OrderInfo;