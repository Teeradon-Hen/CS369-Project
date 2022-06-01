import styledComponents from "styled-components";
import { NextTopic, Page, Topic } from "../styled-component/MainEachPage";
import { InputText, Option, Select } from "../styled-component/InputStyled";
import { useState, Fragment } from "react";
import { Button, UploadButton } from "../styled-component/ButtonStyled";
import { Container, Flex45, FlexInner10, Middle } from "./PaymentTable";
import { SaveImageButton } from "./PaymentConfirm";
import saveIcon from '../image/004-download.png'
import QRCode from "qrcode.react";
import axios from 'axios'

import { useAuth } from '../Authentication';
export const Note = styledComponents.p`
    font-size: 22px;
`;

export const FormQR = styledComponents.form`
    margin-left: 0px;
    width: 100%
`;

export const InputAmount = styledComponents(InputText).attrs({
    type: "number",
    placeholder: 'ใส่จำนวนโต๊ะที่นี่',
    min: 1,
})``;

export const LabelwDisable = styledComponents.label`
    color: rgba(222, 84, 153,0.5);
`;

export const CreateQrButton = styledComponents(Button)`
    margin-top: 20px;
`;

export const SaveAllImageButton = styledComponents(SaveImageButton)`
    width: 350px;
    background-color: #D78629;
    box-shadow: 0px 8px 15px rgba(215, 134, 41, 0.2);
    &:hover{
        background-color: #E99F4C;
    }
    margin-top: 0px;
`;

export const ListQr = styledComponents.div`
    height: 100%;
    margin-left: 3%;
    margin-right: 3%;
`;

export const EachQR = styledComponents.div`
    margin: 50px;
    display: inline-block;
`;

export const QRImageSection = styledComponents.div`
    display: flex;
    flex-direction: column;
    width: 200px;
 `;

export const SaveQrButton = styledComponents(UploadButton)`
    background-color: #264143;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    &:focus {
        background-color: #264143;
    }
`;


var tableQrImg = [
    { tableId: 1, tableQr: "https://th.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/basic_market/generator/dist/generator/assets/images/websiteQRCode_noFrame.png" },
    { tableId: 2, tableQr: "https://th.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/basic_market/generator/dist/generator/assets/images/websiteQRCode_noFrame.png" },
    { tableId: 3, tableQr: "https://th.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/basic_market/generator/dist/generator/assets/images/websiteQRCode_noFrame.png" },
    { tableId: 4, tableQr: "https://th.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/basic_market/generator/dist/generator/assets/images/websiteQRCode_noFrame.png" },
    { tableId: 5, tableQr: "https://th.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/basic_market/generator/dist/generator/assets/images/websiteQRCode_noFrame.png" },
    { tableId: 6, tableQr: "https://th.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/basic_market/generator/dist/generator/assets/images/websiteQRCode_noFrame.png" },
    // { tableId: 7, tableQr: "https://th.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/basic_market/generator/dist/generator/assets/images/websiteQRCode_noFrame.png" },
    // { tableId: 8, tableQr: "https://th.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/basic_market/generator/dist/generator/assets/images/websiteQRCode_noFrame.png" }]
];

export default function QRcode() {
    const [tableAmount, setTableAmount] = useState('');
    const [qrcodeShow, setQrcodeShow] = useState(false);
    const auth = useAuth()

    const { token, userInfo } = auth.authState
    const [tableQR, setTableQR] = useState([]);

    const onTableAmountChange = event => {
        setTableAmount(event.target.value)
        onEnable(event.target.value)
    }

    const onSubmitCreate = event => {
        event.preventDefault();
        // console.log("amount:", event.target.tableAmount.value)
        // console.log("want:", event.target.tableCreate.value)
        axios.post(`/api/table/createAll/?ResId=${userInfo._id}&tableAmount=${tableAmount}`, {
            headers: {
                Authorization: token,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => console.log(res))
        //passing value of want table number to generateQr function
        //pls check value if want: all => passing amount instead
        if (event.target.tableCreate.value == 'all') {
            setTableQR([])
            for (let i = 1; i <= event.target.tableAmount.value; i++) {
                setTableQR(oldArray => [...oldArray, i]);
            }
        }
        else {
            setTableQR(oldArray => [...oldArray, event.target.tableCreate.value]);

        }

        setQrcodeShow(true);

    }

    const onEnable = (text) => {
        var allTable = parseInt(text);
        var label = document.getElementById("labelCreate");
        var select = document.getElementById("tableCreate");
        var button = document.getElementById("qrCreate");
        var options = select.getElementsByTagName('Option');

        if (allTable !== '' && (allTable > 0)) {
            label.style.color = '#DE5499';
            select.disabled = false;
            button.disabled = false;


            for (var k = 0; k < options.length; k++) {
                if (options[k].innerHTML !== 'ทั้งหมด' && options[k].innerHTML !== 'เลือกโต๊ะ') {
                    select.removeChild(options[k]);
                    k--;
                }
            }

            for (var i = 0; i < allTable; i++) {
                var option = document.createElement("Option");
                option.value = i + 1;
                option.innerHTML = i + 1;
                select.appendChild(option);
            }

        }
        else {
            label.style.color = 'rgba(222, 84, 153,0.5)';
            select.disabled = true;
            button.disabled = true;
        }
    }
    const onDownload = (id,event) => {
        const link = document.createElement("a");
        link.download = `tableQr${id}.png`;
        link.href = document.getElementById(`canvas${id}`).toDataURL();
        link.click();
    };

    const QrImg = tableQR.map(e => {
        return (
            <EachQR key={e}>
                <QRImageSection>
                    <h3>โต๊ะ {e}</h3>
                    {/* add save image button fn (onClick) */}
                    <Fragment>
                        <QRCode value={`https://localhost:3000/customer/menus/?ResId=${userInfo._id}&tableNo=${e}`} id={`canvas${e}`} size="200"/>
                    </Fragment>
                    <SaveQrButton onClick={(event) => onDownload(e,event)}> <img src={saveIcon} width="20px" height="20px" /> บันทึกรูปภาพนี้</SaveQrButton>
                </QRImageSection>
            </EachQR>
        );
    });

    const resName = userInfo.restaurantName;
    return (
        <Page>
            <Topic>{resName}</Topic>
            <NextTopic>QR code โต๊ะ</NextTopic>
            <Note><u>หมายเหตุ</u> 1 QR code สำหรับ 1 โต๊ะอาหารภายในร้าน ใช้เพื่อให้ลูกค้าแต่ละโต๊ะสั่งอาหารได้ โดยสแกนผ่านทางโทรศัพท์มือถือ
                <br />ไม่จำเป็นต้องสร้าง QR code ใหม่ทุกครั้ง ยกเว้น QR code ของโต๊ะนั้น ๆ เกิดปัญหาขึ้น สามารถเลือกสร้างเฉพาะโต๊ะที่ต้องการได้</Note>

            <FormQR onSubmit={onSubmitCreate}>
                <Container>
                    <Flex45>
                        <label>จำนวนโต๊ะอาหาร</label> <br />
                        <InputAmount id="tableAmount" required onChange={onTableAmountChange} /> <br />
                    </Flex45>
                    <FlexInner10 />
                    <Flex45>
                        <LabelwDisable id="labelCreate">โต๊ะที่ต้องการสร้าง QR code</LabelwDisable> <br />
                        <Select id="tableCreate" disabled={true} required>
                            <Option value="" disabled selected hidden >เลือกโต๊ะ</Option>
                            <Option value="all" name="tableAll">ทั้งหมด</Option>
                        </Select> <br />
                    </Flex45>
                </Container>
                <Middle>
                    <CreateQrButton id="qrCreate" disabled={true} type="submit">สร้าง Qr code</CreateQrButton>
                </Middle>
            </FormQR>

            {qrcodeShow &&
                <>
                    {/* <Middle>
                        <SaveAllImageButton onClick={onDownloadAll}> <img src={saveIcon} width="32px" height="32px" />บันทึกรูปภาพทัั้งหมด</SaveAllImageButton>
                    </Middle> */}
                    <ListQr>
                        {QrImg}
                    </ListQr>
                </>}
        </Page>
    );
}