import React, { useEffect, useState} from 'react'
import { useParams, Link, useNavigate } from "react-router-dom";
import styledComponents from 'styled-components';
import { Topic, Page } from '../styled-component/MainEachPage';
import { ReverseButton } from '../styled-component/ButtonStyled';
import axios from 'axios'
import { useAuth } from '../Authentication';

export const TableNumber = styledComponents(Topic)``;
export const OrderNumber = styledComponents(Topic)`
    color: #E99F4C;
`;

export const SmallReverseButton = styledComponents(ReverseButton)`
    width: 100px;
    margin: 10px;
`;

export const Container = styledComponents.div`
    display: flex;
    flex-direction: row;
    margin-left: 0%;
    margin-right: 0%;
    height: 100%;
    margin-top: 50px;
`;

export const Flex90 = styledComponents.div`
    flex: 90%;
    justifyContent: "letf"
`;
export const Flex10 = styledComponents.div`
    flex: 10%;
`;

export const Table = styledComponents.table`
    margin-top: 30px;
    border-radius: 1em;
    overflow: hidden;
    border-collapse: collapse;
    width: 100%;
    font-size: 25px;
`;

export const Th = styledComponents.th`
    text-align: center;
    padding: 10px;
    font-size: 25px;
    padding: 1em;
    background-color: #DE5499;
    color: #ffffff;
`;

export const Td = styledComponents.td`
    text-align: center;
    padding: 10px;
    font-size: 25px;
    padding: 1em;
    background-color: rgb(221, 223, 224);
    color: #264143;
`;

var tableOrder = [
    {tableId: "1", orderId: "223"},
];

const TableData=[
    {dateOrder: "28/04/2565 12:00",foodID:"10",foodName : "นักเก็ต" , orderNote : "" , quantity : "1" },//orderStatus:"เสิร์ฟแล้ว"
    {dateOrder: "28/04/2565 12:00",foodID:"19",foodName : "สเต๊กไก่พริกไทยดำ" , orderNote : "เผ็ดน้อย" , quantity : "2" },//orderStatus:"กำลังปรุง"
];

export default function OrderTable() {
    const auth = useAuth()
    const { token, userInfo } = auth.authState
    const params = useParams();
    const navigate = useNavigate();
    const [orderDetail, setOrderDetail] = useState();
    const [paytAmount, setPayAmount] = useState();
    const [data, setData] = useState({})

    var tableNumber = params.id;
    useEffect(()=>{
        axios.get(`/api/payment/getBillAndSlip?ResId=${userInfo._id}&tableNo=${tableNumber}`).then(res => {
            setData(res.data)
   
        })
        // axios.get(`http://localhost:4000/api/order/getOrderdetail/?name=hiwkaow1&tableNo=${1}`).then(res => {
        //     res.data.order.map(e => {
        // //         setOrderDetail(oldArray => [...oldArray, { foodId: e.foodId, foodName: e.foodName, foodPrice: e.foodPrice, quantity: e.quantity }]);
        // //     })
        // //     setPayAmount(res.data.totalPrice)

        // })
    },[])

    // get table column
    const column = Object.keys(TableData[0]);
    // get table row data
    const tdData =() =>{
    return TableData.map((data)=>{
      return(
          <tr>
               {
                  column.map((v)=>{
                      if(data[v]==""){
                          return <Td>-</Td>
                      } else {
                          return <Td>{data[v]}</Td>
                      }
                  })
               }
          </tr>
      )
    })
    }

    const Information = tableOrder.map(e => {
       
        return(
            <>
            <Container>
                    <Flex90>
                    <section style={{ flexDirection: "row", display: "flex", justifyContent: "left" }}>
                    <TableNumber>โต๊ะ {tableNumber} </TableNumber> 
                    <OrderNumber>&nbsp;#{data.orderId}</OrderNumber>
                    </section>
                    </Flex90>
                    <Flex10>
                    <Link to="/order">
                    <SmallReverseButton onClick={()=> {navigate(-1)}}>ย้อนกลับ</SmallReverseButton>
                    </Link> 
                    </Flex10>
          </Container>

            <section style={{ flexDirection: "row", display: "flex", justifyContent: "center" }}>
            <Table>
                        <thead>
                            <tr>
                                <Th>วันที่สั่ง</Th>
                                <Th>ID</Th>
                                <Th>รายการอาหารที่สั่ง</Th>
                                <Th>รายละเอียดเพิ่มเติม</Th>
                                <Th>จำนวน</Th>
                            </tr>
                        </thead>
                         <tbody>
                            {tdData()}
                        </tbody>  
            </Table>
            </section>
                
            </>
         )
    });

    return (
        <Page>
            {Information}
        </Page>
        
    );
}