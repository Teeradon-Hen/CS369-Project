import axios from 'axios'
import WaitAMinute from './Component/WaitAMinute';
import PassVerify from './Component/PassVerify';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import HeaderMobile from './Component/HeaderMobile';
import MenusMobile from './Component/MenusMobile';
import MenusDetailMobile from './Component/MenusDetailMobile';
import CartMobile from './Component/CartMobile';
import OrderMobile from './Component/OrderMobile';
import PaymentMobile from './Component/PaymentMobile';
import PaymentAddSlipMobile from './Component/PaymentAddSlipMobile';
import Waiting from './Component/Waiting';
const Menu = 0
function App(props) {

  const [menus, setMenu] = useState([])
  const [cartItems, setCartItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    axios.get('/api/menu/getAll/?ResId=62912d1d24463445b1a9e8de').then(res => {
      console.log(res)
      setMenu(res.data)
    })
  }, [])

  const onAddCart = (data) => {
    const exist = cartItems.find(e => e._id === data._id);
    if (exist) {
      setCartItems(cartItems.map(e => e._id === data._id ? { _id: data._id, foodName: data.foodName, foodPrice: data.foodPrice, quantity: data.quantity, orderNote: data.orderNote } : e));
    } else {
      setCartItems([...cartItems, { _id: data._id, foodName: data.foodName, foodPrice: data.foodPrice, quantity: data.quantity, orderNote: data.orderNote }])
    }
  }

  const onDelCart = (id, event) => {
    let items = cartItems.filter(e => {
      return e._id !== id;
    })
    setCartItems(items);
    // event.stopPropagation();
    event.preventDefault();

  }

  const onReset = (e) => {
    cartItems.forEach(e => {
      setOrderItems([...orderItems, { foodId: e._id, quantity: e.quantity, orderNote: e.orderNote }])
    })
    console.log(orderItems)
    axios.post('http://localhost:4000/api/order/add/?name=hiwkaow1&tableNo=1', orderItems).then(res => {
      console.log(res)
      setOrderItems([])
    })
    setCartItems([]);
  }

  return (
    <div >
      <BrowserRouter>
        <HeaderMobile />
        <Routes>

          <Route path='/customer/menus' element={<MenusMobile countCartItems={cartItems.length} />} />
          <Route path='/customer/menus/:id' element={<MenusDetailMobile menus={menus} cartItems={cartItems} onAddCart={onAddCart} onDelCart={onDelCart} />} />
          <Route path='/customer/menus/cart' element={<CartMobile countCartItems={cartItems.length} cartItems={cartItems} onReset={onReset} />} />
          <Route path='/customer/order' element={<OrderMobile orderItems={orderItems} menus={menus} />} />
          <Route path='/customer/order/payment' element={<PaymentMobile />} />
          <Route path='/customer/order/payment/add-slip' element={<PaymentAddSlipMobile />} />
          <Route path='/customer/waiting' element={<Waiting />} />
          <Route path='/customer/completely' element={<PassVerify />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
