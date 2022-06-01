import { Middle, Page, Topic } from "../styled-component/MainEachPage";
import styledComponents from "styled-components";
import { Flex45, FlexInner10 } from "./PaymentTable";
import { UploadImageSection } from "../styled-component/AddMenuStyled";
import { Button, UploadButton } from "../styled-component/ButtonStyled";
import { useState } from "react";
import img from '../image/NotFoundImage.jpg'

import { Example, GroupButton, InputEmail, InputPromptpay, InputResName } from "./EditRes";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { InputText } from "../styled-component/InputStyled";
import { base64 } from '../NotFoundBase64'
import axios from 'axios'

export const ResSignUpForm = styledComponents.form`
    margin: 0px;
    margin-top: 50px;
`;

export const UploadImageSectionSignUp = styledComponents(UploadImageSection)`
`;

export const UpFlex = styledComponents.div`
    display: flex;
    margin-bottom: 30px;
`;

export const DownFlex = styledComponents.div`
    display: flex;
`;

export const Flex10 = styledComponents.div`
    flex: 10%;
`;

export const Flex35 = styledComponents.div`
    flex: 35%;
`;

export const InputPasswordFull = styledComponents(InputText).attrs({
    type: 'password',
    placeholder: 'ใส่รหัสผ่านที่นี่',
    pattern: "[0-9A-Za-z]{8,128}",
})`
width: 480px;`;

export const InputResUserNameFull = styledComponents(InputText).attrs({
    pattern: "[0-9A-Za-z]{6,15}",
    placeholder: 'ใส่ชื่อผู้ใช้ที่นี่'
})`width: 510px;`;

export const InputEmailFull = styledComponents(InputEmail)`
    width: 510px;
`;

export const Note = styledComponents(Example)`
    color: #D78629;
`;

export default function SignUp() {

    const navigate = useNavigate();

    const [resImage, setResImage] = useState(null);
    const [resUserName, setResUserName] = useState('');
    const [resName, setResName] = useState('');
    const [resEmail, setResEmail] = useState('');
    const [resPromptpay, setResPromptpay] = useState('');
    const [resPwd, setResPwd] = useState('');
    const [resPwdConfirm, setResPwdConfirm] = useState('');

    const [notSamePwd, setNotSamePwd] = useState(false);

    const onResUserNameChange = e => {
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

    const onResPwdChange = e => {
        setResPwd(e.target.value)

    }
    const onResPwdConfirmChange = e => {
        setResPwdConfirm(e.target.value)
    }

    const onEnable = (enable) => {
        var saveButton = document.getElementById("saveInfo");
        saveButton.disabled = false;
        if (enable) {
            saveButton.disabled = false;
        } else {
            saveButton.disabled = true;
        }
    }

    const checkSamePwd = event => {
        event.preventDefault();
        onResPwdConfirmChange(event);
        if (event.target.value !== resPwd || event.target.value == '') {
            setNotSamePwd(true);
            onEnable(false);
        } else {
            setNotSamePwd(false);
            onEnable(true);
        }
    }

    const checkSamePwdConfirm = event => {
        event.preventDefault();
        onResPwdChange(event);
        if (event.target.value !== resPwdConfirm || event.target.value == '') {
            setNotSamePwd(true);
            onEnable(false);
        } else {
            setNotSamePwd(false);
            onEnable(true);
        }
    }

    const clearState = () => {
        setResPwd('');
        setResPwdConfirm('');
    }

    const saveComplete = (e) => {
        e.preventDefault();

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


        var notFound = dataURLtoFile(base64, 'hello.jpeg');
        console.log(notFound)
        const formData = new FormData()
        formData.append('Image', resImage ? resImage : notFound)
        formData.append('resUserName', resUserName)
        formData.append('resName', resName)
        formData.append('resEmail', resEmail)
        formData.append('resPromptpay', resPromptpay)
        formData.append('resPwd', resPwd)

        console.log(formData)
        axios.post(`/api/restaurant/sign-up/`, formData).then(res => {

            console.log(res)

            swal({
                icon: "success",
                title: "สร้างบัญชีผู้ใช้ใหม่สำเร็จ",
                text: "สามารถเข้าสู่ระบบได้",
                buttons: [false, "ตกลง"],
            })
                .then((onConfirm) => {
                    if (onConfirm) {
                        navigate('/');
                    }
                });
        }).catch(err => {
            console.log(err)
            swal({
                icon: "error",
                title: "ชื่อผู้ใช้นี้หรืออีเมลนี้ถูกใช้งานแล้ว",
                text: "กรุณาลองใหม่อีกครั้ง",
                buttons: [false, "ตกลง"],
                dangerMode: true,

            })
                .then((onConfirm) => {
                });
        })


        // swal({
        //     icon: "success",
        //     title: "สร้างบัญชีผู้ใช้ใหม่สำเร็จสำเร็จ",
        //     text: "สามารถเข้าสู่ระบบได้",
        //     buttons: [false, "ตกลง"],
        // })
        //     .then((onConfirm) => {
        //         if (onConfirm) {
        //             navigate('/');
        //         }
        //     });
    }





    return (
        <Page>
            <Topic>สมัครสมาชิก</Topic>

            <ResSignUpForm onSubmit={saveComplete}>

                <UpFlex>
                    <Flex10>
                        <UploadImageSectionSignUp>
                            {resImage ?
                                <img alt="not found" width="100%" src={URL.createObjectURL(resImage)} />
                                :
                                //  <MenuImage text="hello"src={img}  ></MenuImage> 
                                <img src={img} width="100%" />
                            }
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
                        </UploadImageSectionSignUp>
                    </Flex10>
                    <Flex35>
                        <label>ชื่อร้านอาหาร</label> <br />
                        <InputResName id="resName" value={resName} onChange={onResNameChange} required ></InputResName> <br />
                    </Flex35>
                    <FlexInner10 />
                    <Flex45>
                        <label>พร้อมเพย์</label> <br />
                        <InputPromptpay id="resPromptpay" value={resPromptpay} onChange={onResPromptpayChange} required ></InputPromptpay> <br />
                        <Example>ตัวอย่างพร้อมเพย์: 0123456789</Example><br />
                    </Flex45>
                </UpFlex>

                <DownFlex>
                    <Flex45>
                        <label>ชื่อผู้ใช้</label> <Note>(ชื่อผู้ใช้ต้องมีจำนวนอักขระ 6-15 ตัว ได้ทั้งตัวอักษรภาษาอังกฤษและตัวเลข)</Note><br />
                        <InputResUserNameFull id="resUserName" value={resUserName} onChange={onResUserNameChange} required ></InputResUserNameFull> <br />

                        <label>อีเมล</label> <br />
                        <InputEmailFull id="resEmail" value={resEmail} onChange={onResEmailChange} required ></InputEmailFull> <br />
                    </Flex45>
                    <FlexInner10 />
                    <Flex45>
                        <label>รหัสผ่าน</label> <Note>(รหัสผ่านต้องมีอักขระอย่างน้อย 8 ตัว ประกอบไปด้วยตัวเลขและตัวอักษรภาษาอังกฤษ)</Note><br />
                        <InputPasswordFull id="resPwd" value={resPwd} onChange={checkSamePwdConfirm} required /><br />

                        <label>ยืนยันรหัสผ่าน</label> <br />
                        <InputPasswordFull id="resPwdConfirm" value={resPwdConfirm} onChange={checkSamePwd} required /><br />
                        {notSamePwd ? <><Example>รหัสผ่านไม่ตรงกัน</Example><br /></> : <></>}

                    </Flex45>
                </DownFlex>


                <GroupButton>
                    <Middle>
                        <Button id="saveInfo" disabled={true} >สร้างบัญชีผู้ใช้ใหม่</Button>
                    </Middle>
                </GroupButton>


            </ResSignUpForm>
        </Page >
    );
}