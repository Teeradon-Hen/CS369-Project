import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styledComponents from "styled-components";
import swal from "sweetalert";
import { Button } from "../styled-component/ButtonStyled";
import { InputText } from "../styled-component/InputStyled";
import { Middle, NextTopic, Page, Topic } from "../styled-component/MainEachPage";
import { BackButton, Example, GroupButton } from "./EditRes";
import { Note } from "./SignUp";
import axios from 'axios'
import { useAuth } from '../Authentication';

export const InputPassword = styledComponents(InputText).attrs({
    type: 'password',
    placeholder: 'ใส่รหัสผ่านที่นี่',
    pattern: "[0-9A-Za-z]{8,128}",
})`
width: 50%`;

export const ResPwdForm = styledComponents.form`
    margin: 0px;
    margin-top: 50px;

`;

export default function EditResPwd() {

    const navigate = useNavigate();
    const auth = useAuth()
    const { token, userInfo } = auth.authState
    const [resCurrentPwd, setResCurrentPwd] = useState('');
    const [resNewPwd, setResNewPwd] = useState('');
    const [resNewPwdConfirm, setResNewPwdConfirm] = useState('');
    const [notSamePwd, setNotSamePwd] = useState(false);

    const onResCurrentPwdChange = e => {
        setResCurrentPwd(e.target.value)
    }
    const onResNewPwdChange = e => {
        setResNewPwd(e.target.value)

    }
    const onResNewPwdConfirmChange = e => {
        setResNewPwdConfirm(e.target.value)
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

    const checkSamePwdConfirm = event => {
        event.preventDefault();
        onResNewPwdChange(event);
        if (event.target.value !== resNewPwdConfirm || event.target.value == '') {
            setNotSamePwd(true);
            onEnable(false);
        } else {
            setNotSamePwd(false);
            onEnable(true);
        }
    }

    const checkSamePwd = event => {
        event.preventDefault();
        onResNewPwdConfirmChange(event);
        if (event.target.value !== resNewPwd || event.target.value == '') {
            setNotSamePwd(true);
            onEnable(false);
        } else {
            setNotSamePwd(false);
            onEnable(true);
        }
    }

    const clearState = () => {
        setResCurrentPwd('');
        setResNewPwd('');
        setResNewPwdConfirm('');
    }

    const saveComplete = (e) => {
        e.preventDefault();

        axios.put(`/api/restaurant/edit-password/?ResId=${userInfo._id}`, {resCurrentPwd, resNewPwd}, {
            headers: {
                Authorization: token,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                console.log(res)
                swal({
                    icon: "success",
                    title: "บันทึกข้อมูลใหม่สำเร็จ",
                    buttons: [false, "ตกลง"],
                })
                    .then((onConfirm) => {
                        if (onConfirm) {
                            clearState();
                        }
                    });

            })
            .catch(err =>{
                swal({
                    icon: "error",
                    title: "รหัสผ่านไม่ถูกต้อง",
                    buttons: [false, "ตกลง"],
                    dangerMode: true,
    
                })
        
            })


    }


    return (
        <Page>
            <Topic>ข้อมูลร้านค้า</Topic>
            <NextTopic>แก้ไขรหัสผ่าน</NextTopic>
            <ResPwdForm onSubmit={saveComplete}>
                <label>รหัสผ่านปัจจุบัน</label> <br />
                <InputPassword id="resCurrentPwd" value={resCurrentPwd} onChange={onResCurrentPwdChange} required /><br />

                <label>รหัสผ่านใหม่</label> <Note>(รหัสผ่านต้องมีอักขระอย่างน้อย 8 ตัว ประกอบไปด้วยตัวเลขและตัวอักษรภาษาอังกฤษ)</Note> <br />
                <InputPassword id="resNewPwd" value={resNewPwd} onChange={checkSamePwdConfirm} required /><br />

                <label>ยืนยันรหัสผ่านใหม่</label> <br />
                <InputPassword id="resNewPwdConfirm" value={resNewPwdConfirm} onChange={checkSamePwd} required /><br />
                {notSamePwd ? <Example>รหัสผ่านไม่ตรงกัน</Example> : <></>}
                <GroupButton>
                    <Middle>
                        <BackButton onClick={() => navigate(-1)} >ย้อนกลับ</BackButton>
                        <Button id="saveInfo" disabled={true}>บันทึกรหัสผ่านใหม่</Button>
                    </Middle>
                </GroupButton>

            </ResPwdForm>



        </Page>
    );
}