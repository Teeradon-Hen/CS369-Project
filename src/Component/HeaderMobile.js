import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import ReactStickyBox from 'react-sticky-box';
import styledComponents from 'styled-components'
import logo from '../logoHiwKaow.png'

export const HeaderMobileNav = styledComponents.div`
    display: flex;
`;

export const HeaderMobileSection = styledComponents.header`
    background-color: hsl(9, 36%, 89%);
`;

export const Flex20 = styledComponents.div`
    flex: 20%;
`;

export const Flex80 = styledComponents.div`
    flex: 80%;
`;

export const Logo = styledComponents.img`
    display: block;
    margin-left: auto;
    margin-right: auto;
    padding: 10px;
    padding-left: 15px;
    width: auto;
    height: 50px;
`;

export const NavigationMobileBar = styledComponents.ul`
    list-style-type: none;
    display: flex;
    flex-direction: row;
    margin: 0;
    padding: 0;
    padding-left: 10px;
    padding-top: 30px;
    overflow: hidden;
    position: -webkit-sticky;
    position: sticky;
    z-index: 100;
    top: 0;
    background-color: hsl(9, 36%, 89%);
    justify-content: flex-end;
`;

export const TabMobile = styledComponents.li`
  width: 100%;
      > a {
        text-decoration: none;
        display: block;
        color: #264143;
        text-align: center;
        padding: 10px 0px;
        font-weight: bold;
        font-size: 20px;
        flex: 22%;
        &:hover {
          background-color: #F2EBE9;
        }
}`;

export default function HeaderMobile() {

    const location = useLocation();

    if (location.pathname == '/customer/waiting') {
        return <></>
    }
    if (location.pathname == '/customer/completely') {
        return <></>
    }
    if (location.pathname == '/' || location.pathname == '/sign-up') {
        return <></>
    }

    const ActiveNavLink = ({ isActive }) => {
        return {
            backgroundColor: isActive && '#F2EBE9'

        }
    }

    if (location.pathname.match('/customer')) {

        return (<ReactStickyBox>
            <HeaderMobileNav>
                <Flex20>
                    <HeaderMobileSection>
                        <Logo src={logo} ></Logo>
                    </HeaderMobileSection>
                </Flex20>
                <Flex80>
                    <NavigationMobileBar>
                        <TabMobile><NavLink style={ActiveNavLink} to="/customer/menus">รายการอาหาร</NavLink></TabMobile>
                        <TabMobile><NavLink style={ActiveNavLink} to="/customer/order">รายการอาหารที่สั่ง</NavLink></TabMobile>
                    </NavigationMobileBar>
                </Flex80>
            </HeaderMobileNav>
        </ReactStickyBox>

        )
    }
}
