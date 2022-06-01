import { useState, useEffect } from "react";
import styledComponents from "styled-components";
import { MobileButton, ReverseMobileButton, UploadButton } from "../styled-component/ButtonStyled";
import { Middle, Mobile } from "../styled-component/MainEachMobile";
import HeaderTable from "./HeaderTable";
import saveIcon from '../image/004-download.png'
import { Link } from "react-router-dom";
import axios from 'axios'
export const Promtpay = styledComponents.h3``;

export const PPImageSection = styledComponents.div`
    display: flex;
    flex-direction: column;
    width: 200px;
 `;

export const SavePPButton = styledComponents(UploadButton)`
 background-color: #264143;
 display: flex;
 flex-direction: row;
 justify-content: space-evenly;
 align-items: center;
 &:focus {
     background-color: #264143;
 }
`;

export const AddSlipMobileButton = styledComponents(MobileButton)`
    width: 150px;
    margin: 30px;
`;

export const NextMobileButton = styledComponents(ReverseMobileButton)`
    width: 150px;
    margin: 30px;
`;

export default function PaymentMobile() {

    const [orderId, setOrderId] = useState('6291d6eef182295e72bd3b0a');
    const [resPromptpay, setResPromptpay] = useState('0123456789');
    const [resPromptpayImg, setResPromptpayImg] = useState('https://th.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/basic_market/generator/dist/generator/assets/images/websiteQRCode_noFrame.png');
    const [orderPrice, setOrderPrice] = useState(0);
    useEffect(()=>{
        axios.get('http://localhost:4000/api/order/getOrderdetail/?name=hiwkaow1&tableNo=1').then(res => {
            setOrderPrice(res.data.totalPrice)
        
        })
    },[])

    const onDownload = (name,event) => {
        const link = document.createElement("a");
        link.download = `${name}.png`;
        link.href = document.getElementById('promptpay01').toDataURL();
        link.click();
    };

    return (
        <Mobile>
            <HeaderTable text={`ชำระเงิน #${orderId}`} showCart={false}></HeaderTable>
            <Middle>
                <Promtpay>Promtpay: {resPromptpay}</Promtpay>
            </Middle>
            <Middle>
                <PPImageSection>
                    < img alt="PromptPay" id='promptpay01' src={resPromptpayImg} width="100%" />
                    {/* add save image button fn (onClick) */}
                    {/* <SavePPButton onClick={(event) => onDownload('promptpay01',event)}> <img src={saveIcon} width="20px" height="20px" /> บันทึกรูปภาพนี้</SavePPButton> */}
                </PPImageSection>
            </Middle>
            <Middle>
                <Promtpay>ยอดรวม {orderPrice} บาท</Promtpay>
            </Middle>
            <Middle>
                <Link to="add-slip">
                    <AddSlipMobileButton>แนบหลักฐาน</AddSlipMobileButton>
                </Link>
            </Middle>
        </Mobile>);
}