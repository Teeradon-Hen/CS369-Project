import { useEffect, useState } from "react";
import styledComponents from "styled-components";
import { Mobile } from "../styled-component/MainEachMobile";
import HeaderMenusMobile from "./HeaderMenusMobile";
import MenuCardCreateMobile from "./MenuCardCreateMobile";
import HeaderTablewithCart from "./HeaderTable";
import axios from 'axios'

export const FlexContainer = styledComponents.div`
    display: flex;
    flex-direction: row;
`;

export const Flex90 = styledComponents.div`
    flex: 90%;
`;

export const Flex10 = styledComponents.div`
    flex: 10%;
`;

export const Flex20 = styledComponents.div`
    flex: 20%;
`;

export const Flex80 = styledComponents.div`
    flex: 80%;
`;


export const Category = styledComponents.p`
    font-size: 20px;
    font-weight: bold;
`;

export const HrYellow = styledComponents.hr`
    border: 1px solid #E99F4C;
`;

export const Space = styledComponents.div`
    margin: 30px;
`;

export const Cart = styledComponents.img`
    width: auto;
    height: 25px;
    margin-left: 0px;
    margin-right: auto;
    padding: 10px;
    padding-top: 15px;
    padding-left: 0px;
    display:block;
`;

export const AmountCart = styledComponents.div`
    border-radius: 50%;
    width: 20px;
    height: 20px;
    background-color: #E90E65;
    color: #F2EBE9;
    font-size: 16px;
    z-index: 10;
    text-align: center;
    cursor: pointer;
    display:inline-flex;
    justify-content: center;
    align-items: center;
    margin-left: 15px;
    margin-top: 7px;
`;

export default function MenusMobile({ countCartItems }) {
    
    const [recMenus, setRecMenus] = useState([]);
    const [specMenus, setSpecMenus] = useState([]);
    const [steakMenus, setSteakMenus] = useState([]);
    const [friedMenus, setFriedMenus] = useState([]);
    const [snackMenus, setSnackMenus] = useState([]);
    const [drinkMenus, setDrinkMenus] = useState([]);

    useEffect(() => {
        axios.get('/api/menu/get-foodcategory/?username=hiwkaow1' + '&foodCategory=สเต๊ก').then(res => {
            console.log(res)
            setSteakMenus(res.data)
        })
        axios.get('/api/menu/get-foodcategory/?username=hiwkaow1'+ '&foodCategory=ของทอด').then(res => {
            console.log(res)
            setFriedMenus(res.data)
        })

        axios.get('/api/menu/get-foodcategory/?username=hiwkaow1' + '&foodCategory=ของทานเล่น').then(res => {
            console.log(res)
            setSnackMenus(res.data)
        })

        axios.get('/api/menu/get-foodcategory/?username=hiwkaow1' + '&foodCategory=เครื่องดื่ม').then(res => {
            console.log(res)
            setDrinkMenus(res.data)
        })

        axios.get('/api/menu/get-foodnote/?username=hiwkaow1' + '&foodNote=recommend').then(res => {
            console.log(res)
            setRecMenus(res.data)
        })

        axios.get('/api/menu/get-foodnote/?username=hiwkaow1' + '&foodNote=special').then(res => {
            console.log(res)
            setSpecMenus(res.data)
        })
    },[])

    return (<Mobile>
        <HeaderTablewithCart text="รายการอาหาร" countCartItems={countCartItems} showCart={true} />
        <HeaderMenusMobile /><HrYellow />

        <div id="recommend">
            <Category >แนะนำ</Category>
            <MenuCardCreateMobile menus={recMenus} button="เลือก" />
            <HrYellow />
        </div>
        <div id="special" >
            <Category>พิเศษ</Category>
            <MenuCardCreateMobile menus={specMenus} button="เลือก" />
            <HrYellow />
        </div>
        <div id="steak">
            <Category>สเต๊ก</Category>
            <MenuCardCreateMobile menus={steakMenus} button="เลือก" />
            <HrYellow />
        </div>
        <div id="fried">
            <Category>ของทอด</Category>
            <MenuCardCreateMobile menus={friedMenus} button="เลือก" />
            <HrYellow />
        </div>
        <div id="snack">
            <Category>ของทานเล่น</Category>
            <MenuCardCreateMobile menus={snackMenus} button="เลือก" />
            <HrYellow />
        </div>
        <div id="drink">
            <Category >เครื่องดื่ม</Category>
            <MenuCardCreateMobile menus={drinkMenus} button="เลือก" />
            <HrYellow />
        </div>

        <Space />
    </Mobile >);
}