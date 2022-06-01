import { LeftSection, MenuFormContainer, RightSection, UploadImageSection } from "../styled-component/AddMenuStyled";
import { Button, ReverseButton, UploadButton } from "../styled-component/ButtonStyled";
import { InputText } from "../styled-component/InputStyled";
import { Page, Topic, Middle, NextTopic } from "../styled-component/MainEachPage";
import { useEffect, useState } from "react";
import styledComponents from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios from 'axios'

import { useAuth } from '../Authentication';
import { Buffer } from 'buffer';

export const ResFormContainer = styledComponents(MenuFormContainer)``;

export const InputResName = styledComponents(InputText).attrs({
    maxLength: 20,
    placeholder: 'ใส่ชื่อร้านอาหารที่นี่'
})``;

export const InputEmail = styledComponents(InputText).attrs({
    type: "email",
    placeholder: 'ใส่อีเมลที่นี่',
    min: 0
})``;

export const InputPromptpay = styledComponents(InputText).attrs({
    type: "tel",
    placeholder: 'ใส่หมายเลขพร้อมเพย์ที่นี่',
    pattern: "[0-9]{10}",
})``;

export const Example = styledComponents.label`
    font-weight: 200;
`;

export const BackButton = styledComponents(Button)`
    margin:20px;
    background-color: #D78629;
    box-shadow: 0px 8px 15px rgba(215, 134, 41, 0.2);
    &:hover{
        background-color: #E99F4C;
    } 
`;

export const GroupButton = styledComponents.div`
    padding: 20px;
`;

export default function EditRes() {

    const navigate = useNavigate();
    const auth = useAuth()
    const { token, userInfo } = auth.authState
    const [resImage, setResImage] = useState(null);
    const [resUserName, setResUserName] = useState('');
    const [resName, setResName] = useState('');
    const [resEmail, setResEmail] = useState('');
    const [resPromptpay, setResPromptpay] = useState('');
    const [resNewPwd, setResNewPwd] = useState('');
    const [resNewPwdConfirm, setResNewPwdConfirm] = useState('');
    useEffect(() => {
        axios.get(`/api/restaurant/get-info/?ResId=${userInfo._id}`, {
            headers: {
                Authorization: token,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                const data = res.data
                console.log(data)
                setResUserName(data.username)
                setResEmail(data.email)
                setResPromptpay(data.promptpay)
                setResName(data.restaurantName)

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
                const img = new Buffer.from(data.restaurantImage.data, 'base64')
                setResImage(dataURLtoFile(`data:${data.restaurantImage.contentType};base64,${img.toString('base64')}`, 'hello.png'))
            })
    }, [])
    const onSetResUserName = e => {
        setResUserName(e.target.value)
    }

    const onResNameChange = e => {
        setResName(e.target.value)
    }
    const onResEmailChange = e => {
        setResEmail(e.target.value)

    }
    const onResPromptpayChange = e => {
        setResPromptpay(e.target.value)
    }

    const onResNewPwdChange = e => {
        setResNewPwd(e.target.value)

    }
    const onResNewPwdConfirmChange = e => {
        setResNewPwdConfirm(e.target.value)
    }

    const saveComplete = (e) => {
        e.preventDefault();


        const formData = new FormData()
        formData.append('Image', resImage)
        formData.append('resUserName', resUserName)
        formData.append('resName', resName)
        formData.append('resEmail', resEmail)
        formData.append('resPromptpay', resPromptpay)


        axios.put(`/api/restaurant/edit-info/?ResId=${userInfo._id}`, formData, {
            headers: {
                Authorization: token,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                console.log(res)
                const { _id, username, token, restaurantName, promptpay, email } = res.data
                const userInfo = { _id, username, restaurantName, promptpay, email }
                const result = { token, expiresAt: new Date().getTime() + 7200, userInfo }
                auth.setAuthState(result)
                swal({
                    icon: "success",
                    title: "บันทึกข้อมูลใหม่สำเร็จ",
                    buttons: [false, "ตกลง"],
                })
            })
       
    }

    return (
        <Page>
            <form onSubmit={saveComplete} >

                <Topic>ข้อมูลร้านค้า</Topic>
                <NextTopic>แก้ไขข้อมูลทั่วไป</NextTopic>

                <ResFormContainer>


                    <LeftSection>

                        <UploadImageSection>

                            {resImage && <img alt="not found" width="100%" src={URL.createObjectURL(resImage)} />}

                            <UploadButton>
                                แก้ไขรูป
                                <input type="file" style={{ display: 'none' }} accept="image/*"
                                    name="resImage"
                                    onChange={(event) => {
                                        console.log(event.target.files[0]);
                                        setResImage(event.target.files[0]);
                                    }}
                                />
                            </UploadButton>
                        </UploadImageSection>
                    </LeftSection>

                    <RightSection>

                        <label >ชื่อผู้ใช้: {resUserName}</label> <br /><br />

                        <label>ชื่อร้านอาหาร</label> <br />
                        <InputResName id="resName" value={resName} onChange={onResNameChange} required ></InputResName> <br />

                        <label>อีเมล</label> <br />
                        <InputEmail id="resEmail" value={resEmail} onChange={onResEmailChange} required ></InputEmail> <br />

                        <label>พร้อมเพย์</label> <br />
                        <InputPromptpay id="resPromptpay" value={resPromptpay} onChange={onResPromptpayChange} required ></InputPromptpay> <br />
                        <Example>ตัวอย่างพร้อมเพย์: 0123456789</Example><br />

                    </RightSection>

                </ResFormContainer>
                <GroupButton>
                    <Middle>
                        <Link to="pwd">
                            <ReverseButton>แก้ไขรหัสผ่าน</ReverseButton>
                        </Link>
                        <Button type="submit">บันทึกการแก้ไขข้อมูล</Button>
                    </Middle>
                </GroupButton>
            </form>

        </Page>

    );
}