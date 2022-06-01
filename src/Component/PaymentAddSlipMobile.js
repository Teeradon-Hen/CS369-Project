import { useState } from "react";
import styledComponents from "styled-components";
import { MobileButton, ReverseMobileButton, UploadButton } from "../styled-component/ButtonStyled";
import { Middle, Mobile } from "../styled-component/MainEachMobile";
import HeaderTable from "./HeaderTable";
import { Link, useNavigate } from "react-router-dom";
import NotFoundImg from "../image/NotFoundImage.jpg"
import axios from 'axios'
export const Promtpay = styledComponents.h3``;

export const SlipImageSection = styledComponents.div`
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

export const ConfirmMobileButton = styledComponents(MobileButton)`
    width: 150px;
    margin: 30px;
    background-color: #264143;
    box-shadow: 0px 3px 7px rgba(55, 82, 84, 0.5);
    &:hover{
        background-color: rgb(55, 82, 84);
   }
`;

export const UploadImageSection = styledComponents.div`
    display: flex;
    flex-direction: column;
    width: 100%; 
 `;

export const Form = styledComponents.form`
   margin:0;
`;

export default function PaymentAddSlipMobile() {
    const navigate = useNavigate()
    const [orderId, setOrderId] = useState('6291d6eef182295e72bd3b0a');
    const [slipImg, setSlipImg] = useState(null);

    const onSubmit = (e) => {
        e.preventDefault()
        const x = new FormData()
        x.append('Image', slipImg)

        // axios.post('http://localhost:4000/',{selectedImage,name,promptpay,username,email,password})
        axios.put(`/api/payment/addSlip?ResId=${'62912d1d24463445b1a9e8de'}&tableNo=${'1'}`, x).then(res => {
            console.log(res)
            navigate("/customer/waiting")
        })


    }

    return (
        <Mobile>
            <Form onSubmit={onSubmit}>

                <HeaderTable text={`แนบหลักฐานการชำระเงิน #${orderId}`} showCart={false}></HeaderTable>
                <Middle>
                    <Promtpay>หลักฐานการชำระเงิน</Promtpay>
                </Middle>
                <Middle>

                    <SlipImageSection>
                        <UploadImageSection>
                            {slipImg ?
                                <img alt="not found" width="100%" src={URL.createObjectURL(slipImg)} />
                                :
                                //  <MenuImage text="hello"src={img}  ></MenuImage> 
                                < img src={NotFoundImg} width="100%" />
                            }
                            <UploadButton>
                                เลือกรูปภาพ
                                <input type="file" style={{ display: 'none' }} accept="image/*"
                                    name="resImage"
                                    required
                                    onChange={(event) => {
                                        console.log(event.target.files[0]);
                                        setSlipImg(event.target.files[0]);
                                    }}
                                />
                            </UploadButton>
                        </UploadImageSection>
                    </SlipImageSection>
                </Middle>

                <Middle>
                    <ConfirmMobileButton>ยืนยันการชำระเงิน</ConfirmMobileButton>

                </Middle>
            </Form>

        </Mobile >);
}