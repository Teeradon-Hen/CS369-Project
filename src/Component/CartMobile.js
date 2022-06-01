import { useEffect, useState } from "react";
import { Link, useNavigate,useSearchParams  } from "react-router-dom";
import styledComponents from "styled-components";
import { Button, ReverseButton } from "../styled-component/ButtonStyled";
import { Mobile, Topic } from "../styled-component/MainEachMobile";
import CartMenusMobile from "./CartMenusMobile";
import HeaderTablewithCart from "./HeaderTable";
import { HrYellow, Space } from "./MenusMobile";

export const ConfirmMobileButton = styledComponents(Button)`
    padding: 10px;
    width: 300px;
    height: 40px;
    margin: 10px;
    font-size: 20px;
`;

export const BackMobileButton = styledComponents(ReverseButton)`
    padding: 10px;
    width: 300px;
    height: 40px;
    margin: 10px;
    font-size: 20px;
`;

export const FixedContainer = styledComponents.div`
    position: fixed;
    bottom: 0;
    padding-bottom: 20px;
    padding-top: 10px;
    background-color: #F2EBE9;
`;

export default function CartMobile({ countCartItems, cartItems, onReset }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const [cartMenus, setcartMenus] = useState(cartItems);
    const [payAmount, setPayAmount] = useState();
    useEffect(() => {
        setPayAmount(cartItems.reduce((another, current) => another + current.foodPrice * current.quantity, 0))
    })

    const onOrder = (e) => {
        onReset();
        navigate('/customer/order');

    }

    return (
        <Mobile>
            <HeaderTablewithCart text="รายการอาหารที่อยู่ในตะกร้า" countCartItems={countCartItems} showCart={true}/>
            <div>
                <CartMenusMobile menus={cartMenus} button="แก้ไข" showCart={true} />
            </div>
            <HrYellow />
            <Topic>ทั้งหมด {payAmount}฿</Topic>
            <Space />
            <FixedContainer>
                {countCartItems ? <ConfirmMobileButton onClick={onOrder}>ยืนยันคำสั่งรายการอาหาร</ConfirmMobileButton> : <ConfirmMobileButton disabled={true}>ยืนยันคำสั่งรายการอาหาร</ConfirmMobileButton>}

                <BackMobileButton onClick={() => navigate("/customer/menus")}>เลือกรายการอาหารต่อ</BackMobileButton>
            </FixedContainer>
        </Mobile >
    );
}