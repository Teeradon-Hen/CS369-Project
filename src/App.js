import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Header from './Component/Header'
import SignUp from './Component/SignUp'

import Login from './Component/Login'

import AddMenu from './Component/AddMenu'
import EditMenu from './Component/EditMenu'
import Menus from './Component/Menus';
import { AuthProvider } from './Authentication'
import RequireAuth from "./RequiredAuth"
import Payment from './Component/Payment';
import PaymentTable from './Component/PaymentTable';
import PaymentConfirm from './Component/PaymentConfirm';

import QRcode from './Component/QRcode';
import EditRes from './Component/EditRes';
import EditResPwd from './Component/EditResPwd';
import Order from './Component/Order';
import HeaderMobile from './Component/HeaderMobile';
import MenusMobile from './Component/MenusMobile';
import MenusDetailMobile from './Component/MenusDetailMobile';
import CartMobile from './Component/CartMobile';
import OrderMobile from './Component/OrderMobile';
import PaymentMobile from './Component/PaymentMobile';
import PaymentAddSlipMobile from './Component/PaymentAddSlipMobile';
import Waiting from './Component/Waiting';
import PassVerify from './Component/PassVerify';
import NotFound from './Component/NotFound';
import OrderTable from './Component/OrderTable';
import axios from 'axios'
import React ,{ useState, useEffect } from "react";
import { useAuth } from './Authentication';

function App() {

  const [menus, setMenu] = useState([])
  const [cartItems, setCartItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  // const auth = useAuth();
  // const { token, userInfo } = auth.authState;
  // var userInfo._id = '62912d1d24463445b1a9e8de';
  var userInfoid = '62912d1d24463445b1a9e8de';
  useEffect(() => {
    axios.get(`/api/menu/getAll/?ResId=${userInfoid}`).then(res => {
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
    const arr = []
    cartItems.forEach(ele => {
      console.log("ele", ele)
      console.log("id", ele._id)
      // setOrderItems([...orderItems, { foodId: ele._id, quantity: ele.quantity, orderNote: ele.orderNote }],() => {
      //   console.log("orderItems inner", orderItems)
      // })
      arr.push({ foodId: ele._id, quantity: ele.quantity, orderNote: ele.orderNote });

      // setOrderItems(oldArray => [...oldArray,  { foodId: ele._id, quantity: ele.quantity, orderNote: ele.orderNote }]);

    })
    console.log("orderItems", orderItems)
    axios.post('http://localhost:4000/api/order/add/?name=hiwkaow1&tableNo=1', arr).then(res => {
      console.log(res)


    })
    .finally(err =>{
      setOrderItems([])
      setCartItems([]);
    })
  }

  return (
    <BrowserRouter>
      <AuthProvider>

        <Header />
        <HeaderMobile />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/edit-res" element={<RequireAuth><EditRes /></RequireAuth>} />
          <Route path="/edit-res/pwd" element={<RequireAuth><EditResPwd /></RequireAuth>} />
          <Route path="order" element={<RequireAuth><Order /></RequireAuth>} />
          <Route path="order/:id" element={<RequireAuth><OrderTable /></RequireAuth>} />

          <Route path="menus/add" element={<RequireAuth><AddMenu /></RequireAuth>} />
          <Route path="menus" element={<RequireAuth><Menus /></RequireAuth>} />
          <Route path="menus/edit/:id" element={<RequireAuth><EditMenu /></RequireAuth>} />
          <Route path="payment" element={<Payment />} />
          <Route path="payment/:id" element={<PaymentTable />} />
          <Route path="payment/:id/confirm" element={<PaymentConfirm />} />
          <Route path="qr-code" element={<QRcode />} />

          <Route path='/customer/menus' element={<MenusMobile countCartItems={cartItems.length} />} />
          <Route path='/customer/menus/:id' element={<MenusDetailMobile menus={menus} cartItems={cartItems} onAddCart={onAddCart} onDelCart={onDelCart} />} />
          <Route path='/customer/menus/cart' element={<CartMobile countCartItems={cartItems.length} cartItems={cartItems} onReset={onReset} />} />
          <Route path='/customer/order' element={<OrderMobile orderItems={orderItems} menus={menus} />} />
          <Route path='/customer/order/payment' element={<PaymentMobile />} />
          <Route path='/customer/order/payment/add-slip' element={<PaymentAddSlipMobile />} />
          <Route path='/customer/waiting' element={<Waiting />} />
          <Route path='/customer/completely' element={<PassVerify />} />
          <Route path='*' element={<NotFound />} />

        </Routes>
      </AuthProvider>

    </BrowserRouter>
  );
}

export default App;
