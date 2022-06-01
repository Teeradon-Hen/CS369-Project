import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import styledComponents from 'styled-components';
import { Topic, NextTopic, Page } from '../styled-component/MainEachPage';
import { List } from './Payment';
import { Button, ReverseButton } from '../styled-component/ButtonStyled';
import swal from 'sweetalert';
import '../css/Swal.css';
import axios from 'axios'
import { Buffer } from 'buffer';

import { useAuth } from '../Authentication';
export const TableNumber = styledComponents(Topic)``;

export const OrderNumber = styledComponents(NextTopic)`
    color: #E99F4C;
`;

export const Container = styledComponents(List)`
    display: flex;
    flex-direction: row;
    margin-left: 0%;
    margin-right: 0%;
`;

export const Flex45 = styledComponents.div`
    flex: 45%;
`;

export const FlexInner10 = styledComponents.div`
    flex: 10%;
`;

export const Middle = styledComponents.div`
display: flex;
    justify-content: center;
  align-items: center;
`;

export const SmallButton = styledComponents(Button)`
    width: 100px;
    
`;

export const SmallReverseButton = styledComponents(ReverseButton)`
    width: 100px;
    
`;

export const BackButton = styledComponents(Button)`
    margin-left: 0px;
    background-color: #D78629;
    box-shadow: 0px 8px 15px rgba(215, 134, 41, 0.2);
    &:hover{
        background-color: #E99F4C;
    } 
`;

var tablepaid = [{
    tableId: "1",
    paymentId: "0005",
    orderId: "220",
    billImg: "https://nb.scene7.com/is/image/NB/wroavlk2_nb_02_i?$pdpflexf2MD$&fmt=webp&wid=513&hei=513",
    slipImg: "https://nb.scene7.com/is/image/NB/wroavlk2_nb_02_i?$pdpflexf2MD$&fmt=webp&wid=513&hei=513",
}];

export default function PaymentTable() {
    const params = useParams();

    var tableNumber = params.id; //from state

    const navigate = useNavigate();
    const [data, setData] = useState({})
    const [bill, setBill] = useState(null)
    const [slip, setSlip] = useState(null)
    const auth = useAuth()
    const { token, userInfo } = auth.authState
    useEffect(() => {
        axios.get(`/api/payment/getBillAndSlip?ResId=${userInfo._id}&tableNo=${tableNumber}`).then(res => {
            console.log(res)
            setData(res.data)
            var billImg = new Buffer.from(res.data.billImg.data, 'base64')
            setBill(`data:${data.billImg.contentType};base64,${billImg.toString('base64')}`)
            var slipImg = new Buffer.from(res.data.slipImg.data, 'base64')
            setSlip(`data:${data.billImg.contentType};base64,${slipImg.toString('base64')}`)
            console.log()
            // setSlip(`data:${data.billImg.contentType};base64,${slipImg.toString('base64')}`)
   
        })

    })
    const onSureDelete = () => {
        swal({
            title: "คุณแน่ใจใช่ไหมที่จะปฎิเสธการชำระเงินนี้?",
            text: "ถ้าหากเลือกยืนยันจะถือว่าปฏิเสธการชำระเงินนี้ ระบบจะทำการลบข้อมูลการชำระเงินนี้ออก และไม่สามารถกู้คืนได้",
            icon: "warning",
            buttons: ["ยกเลิก", "ยืนยัน"],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal({
                        icon: "error",
                        title: "คุณยืนยันว่าการชำระเงินนี้ไม่ถูกต้อง",
                        text: "โปรดติดต่อลูกค้า เพื่อตรวจสอบและดำเนินการชำระเงินใหม่",
                        buttons: [false, "ตกลง"],
                    })
                        .then((onConfirm) => {
                            if (onConfirm) {
                                navigate(-1);
                            }
                        });

                } else {
                    swal({
                        title: "การชำระเงินนี้ยังคงอยู่ในระบบ",
                        buttons: [false, "ตกลง"],
                    });
                }
            });
    }

    const Information = tablepaid.map(e => {
        return (
            <>
                {data && <>
                    <TableNumber>โต๊ะ {tableNumber}</TableNumber>
                    <OrderNumber>#{data.orderId}</OrderNumber>
                    <Container>
                        <Flex45>
                            <img alt="bill" src={bill} width="100%"  />
                            <Link to="/payment">
                                <BackButton>กลับไปยังหน้าก่อนหน้า</BackButton>
                            </Link>
                        </Flex45>
                        <FlexInner10 />
                        <Flex45>
                            <img alt="slip" src={slip} width="100%" />
                            <Middle>
                                {/* link to navigation -1*/}
                                <SmallReverseButton onClick={onSureDelete}>ยกเลิก</SmallReverseButton>
                                {/* link to complete page */}
                                <Link to="confirm">
                                    <SmallButton>ยืนยัน</SmallButton>
                                </Link>

                            </Middle>
                        </Flex45>
                    </Container>
                </>
                }
            </>
        )
    });
    return (
        <Page>{Information}</Page>

    );
}
