import check from '../image/check-mark.png'
import bacon from '../image/bacon.png'
import pan from '../image/pan.png'
import styledComponents from 'styled-components'
import { Middle, Mobile } from '../styled-component/MainEachMobile';

export const Logo = styledComponents.img`
    height: 70px;
    width: auto;
    margin: 10px;
`;

export const Infor = styledComponents.h2`
    font-size: 20px;
    margin: 5px;
`;

export const BaconIcon = styledComponents.img`
    height: 60px;
    width: auto;
    margin-top: 10px;
    margin-botton: 10px;
`;

export const EggIcon = styledComponents.img`
    height: 50px;
    width: auto;
    margin-top: 10px;
    margin-botton: 10px;
`;

export const Container= styledComponents.div`
    margin: 30vh;
    margin-left: 0%;
    margin-right: 0%;
    height:100%;
`;

export default function PassVerify() {
    return (
        <Mobile>
            <Container>
                    <Middle>
                        <Logo src={check} />
                    </Middle>
                    <Middle>
                        <Infor>ยืนยันการชำระเงินเสร็จสิ้น</Infor>
                    </Middle>
                    <Middle>
                        <Infor>ขอบคุณที่ใช้บริการ</Infor>
                    </Middle>
                    <Middle>
                        <BaconIcon src={bacon} />
                        <EggIcon src={pan} />
                    </Middle>
            </Container>
        </Mobile>

    )
}