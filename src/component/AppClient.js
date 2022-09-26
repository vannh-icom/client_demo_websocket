function AppClient(props) {
    const handleCreateOrder = ()=>{
        props.handleCreateOrder(true)
    }

    return (
        <div>
            <button onClick={handleCreateOrder} className="btn btn-danger">Tạo order</button>
        </div>
    );
}
export default AppClient;