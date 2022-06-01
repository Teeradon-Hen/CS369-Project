import { CardMedia } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import styledComponents from "styled-components";
import closedIcon from "../image/close.png"
import { Button } from "../styled-component/ButtonStyled";
import { Middle, Mobile, NextTopic, Table, Topic } from "../styled-component/MainEachMobile";
import { BackMobileButton } from "./CartMobile";
import { Buffer } from 'buffer';

export const ClosedIcon = styledComponents.img`
    display: block;
    margin-left: auto;
    margin-right: auto;
    padding: 15px;
    width: auto;
    height: 20px;
    cursor: pointer;
`;

export const Flex90 = styledComponents.div`
    flex: 80%;
`;

export const FlexContainer = styledComponents.div`
    display: flex;
`;

export const Detail = styledComponents.p`
    font-size: 18px;
`;

export const InDecreaseButton = styledComponents.button`
border-radius: 50%;
width: 30px;
height:30px;
background-color: #DE5499;
color: #F2EBE9;
font-size: 22px;
font-weight: bold;
z-index: 10;
text-align: center;
cursor: pointer;
display:flex;
justify-content: center;
align-items: center;
margin: 7px;
box-shadow: 0px 3px 7px rgba(183, 30, 107, 0.5);
padding: 10px;
outline: none;
border: none;
font-family: FC Minimal Regular;
&:hover {
    background-color: rgb(234, 105, 172);
}
&:disabled {
    background: #ab6b8b;
    box-shadow: none;
    cursor: context-menu;
}
`;

export const AmountFood = styledComponents.button`
border-radius: 50%;
width: 30px;
height:30px;
background-color: #F2EBE9;
color: #DE5499;
font-size: 22px;
font-weight: bold;
z-index: 10;
text-align: center;
cursor: context-menu;
display:flex;
justify-content: center;
align-items: center;
margin: 7px;
box-shadow: none;
padding: 10px;
outline: none;
border: none;
font-family: FC Minimal Regular;
&:hover {
    background-color: #F2EBE9;
}
`;

export const Label = styledComponents(AmountFood)`
    margin-right: 5px;
    width: 70px;
    font-size: 18px;
`;

export const InputNote = styledComponents.input.attrs({
    type: "text",
    maxLength: 50,
    placeholder: 'ใส่ข้อความถึงร้านค้าที่นี่'
})`
   padding: 10px;
   width: 60%;
   margin: 10px 0px 20px 0px;
   border: 1px solid #DE5499;
   background-color: #F2EBE9;
   color: #DE5499;
   border-radius: 10px;
   font-family: FC Minimal Regular;
   font-size: 18px;
   &::placeholder {
        color: rgba(222, 84, 153, 0.5);
   }
   &:focus{
        border: 1px solid #E99F4C;
   outline: none;
   }  
`;

export const AddMobileButton = styledComponents(Button)`
    padding: 10px;
    width: 300px;
    height: 40px;
    margin: 10px;
    font-size: 20px;
`;

export const MenuDetailForm = styledComponents.form`
   margin:0;
`;

export default function MenuDetailMobile({ menus, cartItems, onAddCart, onDelCart }) {
    const params = useParams();
    const navigate = useNavigate();

    const [foodId, setFoodId] = useState(params.id);

    /*find from db by foodId */
    const [foodImg, setFoodImg] = useState();
    const [foodName, setFoodName] = useState();
    const [foodDetail, setFoodDetail] = useState();
    const [foodPrice, setFoodPrice] = useState();

    const [quantity, setQuantity] = useState(1);
    const [orderNote, setOrderNote] = useState('');

    const [click, setClick] = useState(true);

    const exist = cartItems.find(e => e._id === params.id);

    useEffect(() => {

        if (exist) {
            cartItems.filter((e) => {
                if (e._id == params.id) {
                    setFoodName(e.foodName);
                    setFoodPrice(e.foodPrice);
                    setQuantity(e.quantity);
                    setOrderNote(e.orderNote);
                    if (e.quantity > 1) {
                        setClick(false);
                    } else {
                        setClick(true);
                    }

                }
            })
            menus.filter((ele) => {
                if (ele._id == params.id) {
                    let img = new Buffer.from(ele.foodImage.data, 'base64')
                    setFoodName(ele.foodName);
                    setFoodDetail(ele.foodDetail);
                    setFoodPrice(ele.foodPrice);
                    setFoodImg(`data:${ele.foodImage.contentType};base64,${img.toString('base64')}`);
                }
            })
        }
        else {
            /* from db */
            menus.filter((ele) => {
                if (ele._id == params.id) {
                    let img = new Buffer.from(ele.foodImage.data, 'base64')
                    setFoodName(ele.foodName);
                    setFoodDetail(ele.foodDetail);
                    setFoodPrice(ele.foodPrice);
                    setFoodImg(`data:${ele.foodImage.contentType};base64,${img.toString('base64')}`);
                    
                }
            })
        }


    }, []);

    const onOrderNoteChange = (e) => {
        setOrderNote(e.target.value);
    }

    const onIncAmount = (e) => {
        e.preventDefault();
        setQuantity(quantity + 1);
        setClick(false);
    }

    const onDecAmount = (e) => {
        e.preventDefault();
        if (quantity > 2) {
            setQuantity(quantity - 1)
        }
        else if (quantity === 2) {
            setQuantity(1);
            setClick(true);
        }
    }

    const onDel = (event) => {
        onDelCart(params.id, event);
        navigate(-1);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let data = { _id: foodId, foodName, foodPrice, quantity, orderNote }
        onAddCart(data);
        navigate(-1);
    }

    return (
        <Mobile>
            <MenuDetailForm onSubmit={handleSubmit}>
                <FlexContainer>
                    <Flex90 />
                    <ClosedIcon onClick={() => { navigate(-1) }} src={closedIcon} />
                </FlexContainer>
                <Middle>
                    <CardMedia id="foodImg"
                        style={{
                            borderRadius: "3%",
                            margin: "5px",
                            width: "150px",
                            height: "150px",
                        }}
                        component="img"
                        image={foodImg}
                        alt="food"
                    />
                </Middle>

                <Topic id="foodName">{foodName}</Topic>
                <Detail id="foodDetail">{foodDetail}</Detail>
                <Middle>
                    <Label>จำนวน</Label>
                    <InDecreaseButton id="increase" disabled={click} onClick={onDecAmount} >-</InDecreaseButton>
                    <AmountFood id="quantity">{quantity}</AmountFood>
                    <InDecreaseButton disabled={false} onClick={onIncAmount}>+</InDecreaseButton>
                </Middle>

                <Middle>
                    <NextTopic>ราคาหน่วยละ {foodPrice} บาท</NextTopic>
                </Middle>
                <Middle>
                    <Label>เพิ่มเติม:</Label>
                    <InputNote id="orderNote" onChange={onOrderNoteChange} value={orderNote} />
                </Middle>
                {!exist ?
                    <AddMobileButton type="submit">เพิ่มลงในตะกร้า {foodPrice * quantity}฿</AddMobileButton> :
                    <>
                        <AddMobileButton type="submit">แก้ไขตะกร้า {foodPrice * quantity}฿</AddMobileButton>
                        <BackMobileButton onClick={onDel}>ลบรายการอาหารนี้ออก</BackMobileButton>
                    </>}

            </MenuDetailForm>

        </Mobile>
    );
}