import "./App.css";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import AppClient from './component/AppClient';
import AppElectric from "./component/AppElectric";

const socket = io("ws://1.53.252.177:5000");
// const socket = io("ws://localhost:5000");
function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [appType, setAppType] = useState(1);
  const [id, setId] = useState(null);
  const [order, setOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [closeOrder, setCloseOrder] = useState(null);
  const [orderStatus, setOrderStatus] = useState(false);
  useEffect(() => {
    // const tempSocket = io("ws://1.53.252.177:5000");
    socket.on("connect", () => {
      console.log(socket.id); // "G5p5..."
      setIsConnected(true);
    });
    socket.on('disconnect', ()=>{
      setIsConnected(false);
    })

    let urlSearch = new URLSearchParams(window.location.search);
    let tempId = urlSearch.get('id');
    let appId = urlSearch.get('type') ?? 1;
    socket.on(tempId,(data)=>{
      console.log('====================================');
      console.log(data);
      console.log('====================================');
      if(data.msg || false) {
        socket.disconnect();  
      }
      if(data.action === 'close_order' || false) {
        setCloseOrder(data.order_code);
      }
      if(data.action === 'find_electrician' || false) { 
        setOrder(data);
      }
    })
    socket.on(`cus-${tempId}`, (data)=>{
      console.log(data);
      setOrderStatus(data);  
    })
    setAppType(parseInt(appId));
    setId(parseInt(tempId));
  }, []);
  
  useEffect(()=>{
    let tempOrders = [...orders];
    order && tempOrders.push(order);
    tempOrders && setOrders(tempOrders);
  },[order])

  useEffect(()=>{
    let tempOrders = [...orders];
    if(closeOrder) {
      tempOrders = tempOrders.filter((order)=>{
        return order.order_code !== closeOrder
      });
      setOrders(tempOrders);
    }
    
  },[closeOrder])
  
  function handleCreateOrder(flag){
    if(flag) {
      console.log("CALL");
      let url = "http://localhost:5000/broadcast";
      let postData = {
          data : {
            user_id: 123,
            order_code: 123,
            latitude: 123.123123,
            longitude: 123.123412,
            expected_support_time: "2022-09-21 13:00:00"
        }
      };
      fetch(url, {
        headers:{
          'Content-Type':'application/json',
          'token':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlZhbk5IIiwiaWF0IjoxNTE2MjM5MDIyfQ.Am5WHiA-6vg-ZXoNQueCooJvicHRLEyDi1jvKy__tBo'
        },
        method:'POST',
        body:JSON.stringify(postData)
      }).then(res=>res.json())
      .then(res=>{
        console.log(res);
      }).catch(err=>{
        console.log(err);
      })
    }
  }

  function handleTestClick(){
    
  }

  function handleAcceptOrder(order) {
    let support_time = "2022-07-12 20:12",
    expected_fee = 70000;
    console.log(order);
    let data = {
      order_code: order.order_code,
      customer_worker_site_id:order.customer_worker_site_id,
      electrician_worker_site_id: id,
      electrician_working_site_id:20984,
      expected_fee:expected_fee,
      electrician_note:"Tôi sẽ đến lúc 8h tối"
    }
    try {
      let event = `order-accept`;
      console.log("ACCEPT ORDER", order.order_code);
      socket.emit(event, data);
      let tempOrders = orders.filter((o)=>o.order_code !== order.order_code);
      setOrders(tempOrders)
    } catch (error) {
      console.log(error);      
    }    
  }
  console.log("ORDERS", orders);
  
  return (
    <div className="App">
      <button onClick={handleTestClick}>Test</button>
      <h3>{appType === 2 ? 'App Thợ' : 'App Epoint'}</h3>
      {appType === 1 ? <AppClient handleCreateOrder={handleCreateOrder} orderStatus={orderStatus} /> : 
      <AppElectric orders={orders} closeOrder={closeOrder} handleAcceptOrder={handleAcceptOrder}/>}
    </div>
  );
}

export default App;
