import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styledComponents from 'styled-components';
import axios from 'axios'

import { useAuth } from '../Authentication';

export const DefaultText = styledComponents.p`
    font-size: 30px;
    font-weight: bold;
    color: rgba(38, 65, 67, 0.5);
    text-align: center;
`;

export const List = styledComponents.div`
    height: 100%;
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 50px;
`;

export const ButtonTable = styledComponents.button`
    cursor: pointer;
    padding: 50px;
    margin: 26px;
    border-radius: 50%;
    justify-items: center;
    background: #264143;
    color: #F2EBE9;
    box-shadow: 0px 8px 15px rgba(38, 65, 67, 0.5);;
    outline: none;
    border: none;
    font-family: FC Minimal Regular;
    font-size: 30px; 
    &:hover{
        background-color: #689ca0;
    }
`;

// var tablepaid = [{ tableId: 1 }, { tableId: 4 }, { tableId: 5 }, { tableId: 8 }];

export default function Order() {

     const auth = useAuth()
     const { token, userInfo } = auth.authState
     const [tablepaid, setTablePaid] = useState([]);
 
     useEffect(() => {
         // axios.get(`/api/table/getTableNo/?ResId=${userInfo._id}`, {
         async function fetchData() {
             const response = await axios.get(`/api/table/getTableNo/?ResId=${userInfo._id}`, {
                 headers: {
                     Authorization: token,
                     Accept: 'application/json',
                     'Content-Type': 'application/json'
                 }
             })
             setTablePaid(response.data)
             console.log(response)
 
         }
         fetchData()
 
     }, [])
     console.log(tablepaid)
 
     const TableList = tablepaid.map(e => {
         return (
             <Link to ={`${e}`}>
                 <ButtonTable key={e}>โต๊ะ {e}</ButtonTable>
             </Link>
         )
     });
 
 
     return (
         <>
             {TableList.length !== 0 ?
                 <List>{TableList}</List> :
                 <List>
 
                     <DefaultText>ยังไม่มีการคำสั่งซื้อเข้ามาในขณะนี้</DefaultText>
                 </List>}
 
         </>
     );
 }
 
