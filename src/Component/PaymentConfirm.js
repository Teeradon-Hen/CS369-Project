import styledComponents from 'styled-components';
import { Button } from '../styled-component/ButtonStyled';
import { Container, Flex45, FlexInner10, Middle } from './PaymentTable';
import saveIcon from '../image/004-download.png'
import checkIcon from '../image/005-check-mark.png'
import { Link, useParams } from 'react-router-dom';
import { useEffect , useState} from 'react';
import { Buffer } from 'buffer';

import axios from 'axios'

import { useAuth } from '../Authentication';

export const Box = styledComponents.div`
    margin: 30px;
    background-color: #244244;
    border-radius: 30px;
    height: 100%;
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 1px;
    padding-bottom: 40px;
`;

export const Icon = styledComponents.img`
    width: 100px;
`;

export const Text = styledComponents.p`
    color: #FFFFFF;
    font-weight: bold;
    font-size:25px;
    margin:50px;
`;

export const SaveImageButton = styledComponents(Button)`
     width:200px;
     display: flex;
     flex-direction: row;
     justify-content: space-evenly;
     align-items: center;
     margin:10px;
`

export const BacktoPaymentButton = styledComponents(Button)`
    margin:40px;
    background-color: #D78629;
    box-shadow: 0px 8px 15px rgba(215, 134, 41, 0.2);
    &:hover{
        background-color: #E99F4C;
    } 
`;

export const ContainerCol = styledComponents(Container)`
    display: flex;    
    flex-direction: column;
    margin-left: 0%;
    margin-right: 0%;
`;

export const FlexMiddle80 = styledComponents.div`
    flex: 80%;
`;

export const FlexMiddleOuter10 = styledComponents.div`
    flex: 10%;
`;

var tablepaid = [{
    tableId: "1",
    paymentId: "0005",
    orderId: "220",
    billImg: "https://nb.scene7.com/is/image/NB/wroavlk2_nb_02_i?$pdpflexf2MD$&fmt=webp&wid=513&hei=513",
    slipImg: "https://nb.scene7.com/is/image/NB/wroavlk2_nb_02_i?$pdpflexf2MD$&fmt=webp&wid=513&hei=513",
}];

export default function PaymentConfirm() {
    const params = useParams();
    const auth = useAuth()
    const [slip, setSlip] = useState(null)

    const { token, userInfo } = auth.authState
    useEffect(() => {
        axios.get(`/api/payment/getBillAndSlip?ResId=${userInfo._id}&tableNo=${params.id}`).then(res => {
            console.log(res)
            var slipImg = new Buffer.from(res.data.slipImg.data, 'base64')
            setSlip(`data:${res.data.slipImg.contentType};base64,${slipImg.toString('base64')}`)
       })

    })
    const ShowImg = tablepaid.map(e => {
        return (
            <Box>
                <Container>
                    <Flex45>
                        <img alt="slip" src={slip} width="100%" />
                    </Flex45>
                    <FlexInner10 />
                    <Flex45>
                        <ContainerCol>
                            <FlexMiddleOuter10 />
                            <FlexMiddle80>
                                <Middle>
                                    <Icon alt="check-mark" src={checkIcon} />
                                </Middle>
                                <Middle>
                                    <Text>ยืนยันการชำระเงินโต๊ะ {params.id} สำเร็จ</Text>
                                </Middle>
                                <Middle>
                                    {/* download image to computer */}
                                    <SaveImageButton> <img src={saveIcon} width="32px" height="32px" /> บันทึกรูปภาพนี้</SaveImageButton>
                                </Middle>
                                <Middle>
                                    <Link to="/payment">
                                        <BacktoPaymentButton>ตรวจสอบโต๊ะอื่นต่อ</BacktoPaymentButton>
                                    </Link>
                                </Middle>
                            </FlexMiddle80>
                            <FlexInner10 />
                        </ContainerCol>
                    </Flex45>


                </Container>
            </Box>
        )
    });

    return (
        <>
            {ShowImg}
        </>

    );
};