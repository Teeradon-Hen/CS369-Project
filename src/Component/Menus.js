import { NextTopic, Page, Topic } from "../styled-component/MainEachPage";
import addIcon from "../image/003-plus.png";
import { ReverseButton } from "../styled-component/ButtonStyled";
import styledComponents from "styled-components";
import { Link } from "react-router-dom";
import { Container } from "./PaymentTable";
import { useEffect, useState } from "react";
import MenuCardCreate from "./MenuCardCreate";
import HeaderMenus from "./HeaderMenus";
import axios from 'axios';
import { useAuth } from '../Authentication';

export const AddMenuButton = styledComponents(ReverseButton)`
    width:240px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
`

export const Flex50 = styledComponents.div`
    flex: 50%;
`;

export const Right = styledComponents.div`
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
`;

export const Category = styledComponents.p`
    font-size: 22px;
    font-weight: bold;
`;

export const HrPink = styledComponents.hr`
    border: 1px solid #DE5499;
`;

export const Space = styledComponents.div`
    margin: 50px;
`;

export default function Menus() {
    const auth = useAuth()
    const { token, userInfo } = auth.authState
  
    const [recMenus, setRecMenus] = useState([]);
    const [specMenus, setSpeacMenus] = useState([]);
    const [steakMenus, setSteakMenus] = useState([]);
    const [friedMenus, setFriedMenus] = useState([]);
    const [snackMenus, setStackMenus] = useState([]);
    const [drinkMenus, setDrinkMenus] = useState([]);

    useEffect(() => {

        axios.get('/api/menu/get-foodcategory/?username=' + userInfo.username + '&foodCategory=สเต๊ก', {
            headers: {
                Authorization: token,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log(res)
            setSteakMenus(res.data)
        })
        axios.get('/api/menu/get-foodcategory/?username=' + userInfo.username + '&foodCategory=ของทอด', {
            headers: {
                Authorization: token,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log(res)
            setFriedMenus(res.data)
        })

        axios.get('/api/menu/get-foodcategory/?username=' + userInfo.username + '&foodCategory=ของทานเล่น', {
            headers: {
                Authorization: token,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log(res)
            setStackMenus(res.data)
        })

        axios.get('/api/menu/get-foodcategory/?username=' + userInfo.username + '&foodCategory=เครื่องดื่ม', {
            headers: {
                Authorization: token,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log(res)
            setDrinkMenus(res.data)
        })

        axios.get('/api/menu/get-foodnote/?username=' + userInfo.username + '&foodNote=recommend', {
            headers: {
                Authorization: token,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log(res)
            setRecMenus(res.data)
        })

        axios.get('/api/menu/get-foodnote/?username=' + userInfo.username + '&foodNote=special', {
            headers: {
                Authorization: token,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log(res)
            setSpeacMenus(res.data)
        })
  
        // axios.get('/api/menu/get-foodnote/?ResId=' + userInfo._id + '&foodNote=special').then(res => {
        //     console.log(res)
        //     setSpeacMenus(res.data)
        // })
        // axios.get('/api/menu/get-foodnote/?ResId=' + userInfo._id + '&foodNote=recommend').then(res => {
        //     console.log(res)
        //     setRecMenus(res.data)
        // })
    }, [])


    const resName = userInfo.restaurantName;
    return (
        <Page>
            <Container>
                <Flex50>
                    <Topic>{resName}</Topic>
                    <NextTopic>รายการอาหาร</NextTopic>
                </Flex50>
                <Flex50>
                    <Right>
                        <Link style={{ textDecoration: 'none' }} to="add">
                            <AddMenuButton><img src={addIcon} width="32px" height="32px" />เพิ่มรายการอาหาร</AddMenuButton>
                        </Link>
                    </Right>
                </Flex50>
            </Container>

            <HeaderMenus />
            <div id="recommend">
                <Category >แนะนำ</Category>
                <MenuCardCreate menus={recMenus} />
                <HrPink />
            </div>
                <div id="special" >
                    <Category>พิเศษ</Category>
                    <MenuCardCreate menus={specMenus} />
                    <HrPink />
                </div>
            <div id="steak">
                <Category>สเต๊ก</Category>
                <MenuCardCreate menus={steakMenus} />
                <HrPink />
            </div>
            <div id="fried">
                <Category>ของทอด</Category>
                <MenuCardCreate menus={friedMenus} />
                <HrPink />
            </div>
            <div id="snack">
                <Category>ของทานเล่น</Category>
                <MenuCardCreate menus={snackMenus} />
                <HrPink />
            </div>
            <div id="drink">
                <Category >เครื่องดื่ม</Category>
                <MenuCardCreate menus={drinkMenus} />
                <HrPink />
            </div>

            <Space />
        </Page>
    );
}