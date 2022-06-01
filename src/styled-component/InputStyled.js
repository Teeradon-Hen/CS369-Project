import styledComponents from 'styled-components';

 export const InputText = styledComponents.input.attrs({
     type:"text"
})`
    padding: 10px;
    width: 80%;
    margin: 10px 0px 20px 0px;
    border: 1px solid #DE5499;
    background-color: #F2EBE9;
    color: #DE5499;
    border-radius: 10px;
    font-family: FC Minimal Regular;
    font-size: 20px;
    &::placeholder {
         color: rgba(222, 84, 153, 0.5);
    }
    &:focus{
         border: 1px solid #E99F4C;
    outline: none;
    }  
`;
export const InputName =styledComponents(InputText).attrs({
    maxLength:25,
    placeholder:'ใส่รายการอาหารที่นี่' 
})``
export const InputDetail =styledComponents(InputText).attrs({
    maxLength:35,
    placeholder:'ใส่รายละเอียดอาหารที่นี่' 
})``

export const InputPrice =styledComponents(InputText).attrs({
     type:"number",
     placeholder:'ใส่ราคาที่นี่',
     min:0
})``

export const Select = styledComponents.select`
     padding: 10px;
     width: 40%;
     margin: 10px 0px 20px 0px;
     border: 1px solid #DE5499;
     background-color: #F2EBE9;
     color: #DE5499;
     border-radius: 10px;
     font-family: FC Minimal Regular;
     font-size: 20px;
     &:focus {
          border: 1px solid #E99F4C;
          outline: none;
     }
`;

export const Option = styledComponents.option`
     padding: 10px;
     width: 200px;
     margin: 10px 0px 20px 0px;
     border: 1px solid #DE5499;
     background-color: #F2EBE9;
     color: #DE5499;
     border-radius: 10px;
     font-family: FC Minimal Regular;
     font-size: 20px;
`;

export const InputUserName = styledComponents(InputText).attrs({
     placeholder:'ชื่อผู้ใช้'
})`
background-color: #EBDDDA;
padding: 20px 5%;
margin-bottom: 30px;
width: 90%;`

export const InputPassword = styledComponents(InputText).attrs({
     type:'password',
     placeholder:'รหัสผ่าน'
})`
background-color: #EBDDDA;
padding: 20px 5%;

margin-bottom: 30px;
width: 90%;`

export const InputTextMobile = styledComponents(InputText)`
     width: 10px;
     padding: 3px;
     margin: 5px 0px 10px 0px;
     font-size: 16px;
     font-family: FC Minimal Regular;
     &::placeholder {
          color: rgba(222, 84, 153, 0.5);
          font-size: 16px;
     }
     &:focus{
          border: 1px solid #E99F4C;
          font-size: 16px;
     }

     &not(:focus){
          font-size: 16px;
     }
`;