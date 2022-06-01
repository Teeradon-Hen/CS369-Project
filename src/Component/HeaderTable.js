import { useState } from "react";
import { Link } from "react-router-dom";
import StickyBox from "react-sticky-box";
import { Mobile, NextTopic, Table, Topic } from "../styled-component/MainEachMobile";
import cartIcon from "../image/cart-icon.png"
import styledComponents from "styled-components";
import { useAuth } from '../Authentication';


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

export default function HeaderTable({ text, countCartItems, showCart}) {

    const auth = useAuth()
    const { token, userInfo } = auth.authState
    const resName = userInfo.restaurantName;

    const [tableNumber, setTableNumber] = useState('1');

    return (
        <>
            <FlexContainer>
                <Flex90>
                    <Topic>{resName}</Topic>
                </Flex90>
                <Flex10>
                    <Table>โต๊ะ {tableNumber}</Table>
                </Flex10>
            </FlexContainer>
            <StickyBox offsetTop={70} style={{ backgroundColor: '#F2EBE9' }}>
                <FlexContainer>
                    <Flex80>
                        <NextTopic>{text}</NextTopic>
                    </Flex80>
                    {showCart ?
                        <Link to="/customer/menus/cart" style={{ textDecoration: 'none', color: '#264143', display: 'flex' }}>
                            <Flex10>
                                {countCartItems ?
                                    (<AmountCart>{countCartItems}</AmountCart>) :
                                    (<></>)}
                            </Flex10>
                            <Flex10>
                                <Cart src={cartIcon} />
                            </Flex10>
                        </Link>
                        : <></>
                    }

                </FlexContainer>
            </StickyBox>
        </>
    );
}