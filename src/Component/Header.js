import React from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'

import logo from '../logoHiwKaow.png'
import { HeaderSection, OnTopImage, NavigationBar, Tab, Flex80, Flex10, ResFn } from '../styled-component/HeaderStyled'
import { useAuth } from '../Authentication';

export default function Header() {
     const location = useLocation()
     const auth = useAuth()

     const ActiveNavLink = ({ isActive }) => {
          return {
               backgroundColor: isActive && '#F2EBE9'

          }
     }
     if (location.pathname == '/') {
          return <></>
     }
     if (location.pathname == '/sign-up') {
          return (
               <>
                    <HeaderSection>
                         <OnTopImage src={logo} ></OnTopImage>
                    </HeaderSection>
                    <NavigationBar>
                         <Tab><NavLink style={ActiveNavLink} to="/">เข้าสู่ระบบ</NavLink></Tab>
                         <Tab><NavLink style={ActiveNavLink} to="/sign-up">สมัครผู้ใช้ใหม่</NavLink></Tab>
                    </NavigationBar>
               </>
          )
     }
     if (!location.pathname.match('/customer')) {

          return (
               <>
                    <ResFn>
                         <Flex80 />

                         <Flex10><Link to="/edit-res" style={{ textDecoration: 'none', color: '#264143' }}>แก้ไขข้อมูลร้านค้า</Link></Flex10>
                         <Flex10><label onClick={()=>auth.logout()}>ออกจากระบบ</label></Flex10>

                         {/* <Flex10><Link to="/" style={{ textDecoration: 'none', color: '#264143' }}>ออกจากระบบ</Link></Flex10> */}
                    </ResFn>
                    <HeaderSection>
                         <OnTopImage src={logo} ></OnTopImage>
                    </HeaderSection>
                    {/* <ul className='nav-bar'>
                    <li className='tab' ><NavLink style={ActiveNavLink} to="/">รายการอาหาร</NavLink></li>
                    <li className='tab' ><NavLink style={ActiveNavLink} to="/x">คำสั่งซื้อ</NavLink></li>
                    <li className='tab' ><NavLink style={ActiveNavLink} to="/a">ชำระเงิน</NavLink></li>
                    <li className='tab' ><NavLink style={ActiveNavLink} to="/s">QR โต๊ะอาหาร</NavLink></li>
               </ul> */}

                    <NavigationBar>
                         {/* <Tab><NavLink style={ActiveNavLink} to="/">เข้าสู่ระบบ</NavLink></Tab> */}

                         {/* <Tab><NavLink style={ActiveNavLink} to="/sign-up">สมัครสมาชิก</NavLink></Tab> */}

                         {/* <Tab><NavLink style={ActiveNavLink} to="/edit-res">แก้ไขข้อมูลร้านค้า</NavLink></Tab> */}
                         <Tab><NavLink style={ActiveNavLink} to="/menus">รายการอาหาร</NavLink></Tab>
                         <Tab><NavLink style={ActiveNavLink} to="/order">คำสั่งซื้อ</NavLink></Tab>
                         <Tab><NavLink style={ActiveNavLink} to="/payment">ชำระเงิน</NavLink></Tab>
                         <Tab><NavLink style={ActiveNavLink} to="/qr-code">QR Code โต๊ะ</NavLink></Tab>

                    </NavigationBar>
               </>
          )
     }
}