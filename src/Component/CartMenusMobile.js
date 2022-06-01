import styledComponents from "styled-components";
import { Flex20 } from "./HeaderMobile";
import { MobileButton, ReverseMobileButton } from "../styled-component/ButtonStyled";
import { InputTextMobile } from "../styled-component/InputStyled";
import { Link } from 'react-router-dom';

export const HrPink = styledComponents.hr`
    border: 1px dotted #DE5499;
`;

export const Flex70 = styledComponents.div`
    flex: 70%;
`;

export const Flex10Down = styledComponents.div`
    display:flex;
    flex: 10%;    
    align-items: flex-end;
`;

export const MenuCardMobile = styledComponents.div`
    display: flex;    
`;

export const FlexContainerCol = styledComponents.div`
    display:flex;
    flex-direction: column;
    line-height: 100%;
`;

export const FoodName = styledComponents.h3`
    margin: 7px;  
    margin-top: 2px; 
`;

export const FoodDetail = styledComponents.p`
    margin: 0px; 
    margin-left: 7px;   
`;

export const FoodPrice = styledComponents.h3`
    margin: 0px;
    margin-left: 7px; 
    margin-top: 7px;  
`;

export const NoData = styledComponents.p`
    font-size:18px;
    color: #DE5499;
    text-align:center;
`;

export const InputNote = styledComponents(InputTextMobile)
    .attrs({
        maxLength: 50,
        placeholder: 'ใส่ข้อมูลเพิ่มเติมถึงร้านค้าที่นี่'
    })`
    width: 10px;
    `;

export const BoxAmount = styledComponents.div`
    border-radius: 3%;
    margin: 5px;
    padding: 13px;
    max-width: 60px;
    max-height: 60px;
    border: 1px solid #DE5499;
    font-size: 25px;
    text-align: center;
    justify-items: center;
`;

export const MobileButton2 = styledComponents(ReverseMobileButton)`
    width: 60px;
`;

export default function CartMenus({ menus, button}) {

    const MenuList = menus.map(e => {
        return (
            <Link to={`/customer/menus/${e._id}`} key={e._id} style={{ textDecoration: 'none', color: '#DE5499' }}>
                <MenuCardMobile>
                    <Flex20>
                        <BoxAmount>x{e.quantity}</BoxAmount>
                    </Flex20>
                    <Flex70>
                        <FlexContainerCol>
                            <FoodName>{e.foodName}</FoodName>
                            <FoodDetail>{e.orderNote}</FoodDetail>
                            <FoodPrice>{e.foodPrice}฿</FoodPrice>
                        </FlexContainerCol>
                    </Flex70>

                    <Flex10Down>
                    <Link to={`/customer/menus/${e._id}`}>
                        <MobileButton>{button}</MobileButton>
                    </Link>
                </Flex10Down>
            </MenuCardMobile>

        <HrPink />
            </Link >
        );
});

return (
    <>
        {MenuList.length !== 0 ? MenuList :
            <NoData>ไม่มีรายการอาหารที่เลือกไว้ในตะกร้า</NoData>}
    </>
);
}