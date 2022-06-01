import { useEffect, useState } from "react";
import styledComponents from "styled-components";
import { Middle, Mobile, Topic } from "../styled-component/MainEachMobile";
import HeaderTable from "./HeaderTable";
import { HrPink, NoData } from "./MenuCardCreateMobile";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import saveIcon from '../image/004-download.png'
import { MobileButton, SaveImageMobileButton } from "../styled-component/ButtonStyled";
import axios from 'axios'
import * as htmlToImage from 'html-to-image';

export const HrPinkSolid = styledComponents.hr`
    border: 1px solid #DE5499;
`;

export const RowOrder = styledComponents.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding-top: 10px;
    padding-bottom: 20px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
`;

export const RowOrderContent = styledComponents(RowOrder)`  
    font-weight: 400;
`;

export const Col2 = styledComponents.div`
    flex: 2;
`;

export const PaymentMobileButton = styledComponents(MobileButton)`
    width: 150px;
    margin: 20px;
    background-color: #264143;
    box-shadow: 0px 3px 7px rgba(55, 82, 84, 0.5);
    &:hover{
        background-color: rgb(55, 82, 84);
   }
`;


export default function OrderMobile({ orderItems, menus }) {
    
    const navigate = useNavigate();

    const [orderId, setOrderId] = useState('6291d6eef182295e72bd3b0a');
    const [payAmount, setPayAmount] = useState(150);
    const [orderDetail, setOrderDetail] = useState([]);

    useEffect(() => {

        axios.get('http://localhost:4000/api/order/getOrderdetail/?name=hiwkaow1&tableNo=1').then(res => {
            res.data.order.map(e => {
                setOrderDetail(oldArray => [...oldArray, { foodId: e.foodId, foodName: e.foodName, foodPrice: e.foodPrice, quantity: e.quantity }]);
            })
            setPayAmount(res.data.totalPrice)

        })

     
    }, orderItems)
    const onclick = () =>{
        var node = document.getElementById('section');

        htmlToImage.toPng(node)
            .then(function (dataUrl) {
   
                function dataURLtoFile(dataurl, filename) {

                    var arr = dataurl.split(','),
                        mime = arr[0].match(/:(.*?);/)[1],
                        bstr = atob(arr[1]),
                        n = bstr.length,
                        u8arr = new Uint8Array(n);

                    while (n--) {
                        u8arr[n] = bstr.charCodeAt(n);
                    }

                    return new File([u8arr], filename, { type: mime });
                }


                var bill = dataURLtoFile(dataUrl, 'hello.jpeg');
                const data = new FormData();
                data.append('Image', bill)

                axios.put(`/api/payment/addBill?ResId=${'62912d1d24463445b1a9e8de'}&tableNo=${'1'}`, data).then(res => {
                    console.log(res)
                    navigate('payment')
                })
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });
    }


    return (
        <Mobile id="section">
            <HeaderTable text={`รายการอาหารที่สั่ง #${orderId}`} show={false}></HeaderTable>
            <HrPinkSolid />
            <div>
                {orderDetail.length === 0 && <NoData>ไม่มีรายการอาหารที่สั่งสำเร็จ</NoData>}
            </div>
            <div>
                {orderDetail.length !== 0 && (
                    <>
                        <RowOrder>
                            <Col2>รายการอาหาร</Col2>
                            <Col2>ราคา</Col2>
                            <Col2>จำนวน</Col2>
                            <Col2>ราคารวม</Col2>
                        </RowOrder>
                        <HrPinkSolid />
                    </>

                )}
            </div>
            {orderDetail.map((item) => (
                <>
                    <RowOrderContent key={item.foodId}>
                        <Col2>{item.foodName}</Col2>
                        <Col2>{item.foodPrice} ฿</Col2>
                        <Col2>{item.quantity}</Col2>
                        <Col2>{item.foodPrice * item.quantity} ฿</Col2>
                    </RowOrderContent>
                    <HrPink />
                </>

            ))}

            <Topic>ทั้งหมด {payAmount}฿</Topic>

            <Middle>
                <SaveImageMobileButton ><img src={saveIcon} width="20px" height="20px" alt='download' />บันทึกเป็นรูปภาพ</SaveImageMobileButton>
            </Middle>
            <Middle>
                {/* <Link to="payment" style={{ textDecoration: 'none', color: '#dcd0d0' }}> */}
                    <PaymentMobileButton onClick={onclick}>ชำระเงิน</PaymentMobileButton>
                {/* </Link> */}
            </Middle>



        </Mobile >
    );
}