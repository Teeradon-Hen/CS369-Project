import React, { useState, useEffect } from 'react'
import logo from '../logoHiwKaow.png'
import bg from '../bg.png'
import { useAuth } from '../Authentication';
import { Link, useNavigate, } from 'react-router-dom';
import axios from 'axios'
import { RightImage, TextWithLine } from '../styled-component/LoginStyled'
import { InputUserName, InputPassword } from '../styled-component/InputStyled'
import { SignInButton, SignUpButton } from '../styled-component/ButtonStyled'
import swal from 'sweetalert';

export default function Login() {
     const navigate = useNavigate();
     const auth = useAuth()
     const [username, setUserName] = useState('')
     const [password, setPassword] = useState('')

     useEffect(() => {
          if (auth.isAuthenticated()) {
               console.log(auth.isAuthenticated())
               // Redirect unauthorized user to the /login page, but save the current location they were    
               navigate("/menus");
          }
     }, [])

     const handleSubmit = (e) => {
          e.preventDefault();
          const data = { username, password }
          // console.log(e.target.username.value)
          axios.post(`/api/restaurant/sign-in/`, data)
               .then(res => {

                    console.log(res)
                    const { _id, username, token, restaurantName, promptpay, email } = res.data
                    const userInfo = { _id, username, restaurantName, promptpay, email }
                    const result = { token, expiresAt: new Date().getTime() + 7200, userInfo }
                    auth.setAuthState(result)
                    navigate("/menus");

               })
               .catch(err => {
                    swal({
                         title: "ชื่อบัญชีผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
                         icon: "error",
                         buttons: [false, "ตกลง"],
                         dangerMode: true,
                    }).then((onConfirm) => {
                         if (onConfirm) {
                         }
                    });
               })
          setUserName('')
          setPassword('')

          // navigate("/h")

     }
     const white = {
          backgroundColor: '#F1ECE9'
     }


     const onUserNameChange = e => {
          setUserName(e.target.value)
     }
     const onPassword = e => {
          setPassword(e.target.value)
     }
     return (
          <div className='flex-container'>
               <div className='section' style={white}>
                    <form onSubmit={handleSubmit}>
                         <img src={logo} alt='Logo' />
                         <h1>เข้าสู่ระบบ หิวข้าว</h1>

                         <section style={{ textAlign: 'start' }}>
                              <label>ชื่อผู้ใช้</label><br />
                              <InputUserName id="username" value={username} onChange={onUserNameChange} required /> <br />
                              <label>รหัสผ่าน</label><br />
                              <InputPassword id="password" value={password} onChange={onPassword} required /><br />
                         </section>

                         <SignInButton type='submit'>เข้าสู่ระบบ  </SignInButton><br />
                         <label>ลืมชื่อผู้ใช้ ลืมรหัสผ่าน</label>
                         <TextWithLine>หรือ</TextWithLine>
                         <Link to="/sign-up"><SignUpButton >สมัครผู้ใช้ใหม่  </SignUpButton></Link>
                    </form>



               </div>
               <div className='section'>
                    {/* <img src={bg} /> */}
                    <RightImage src={bg} ></RightImage>
                    {/* 723px */}
               </div>
          </div>
     )
}
