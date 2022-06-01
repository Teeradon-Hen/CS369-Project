import styledComponents from 'styled-components';

export const UploadButton = styledComponents.label`
     background-color: #DE5499;
     position: relative;
     padding: 2%;
     width: 96%;
     margin-top: 0;
     cursor: pointer;
     text-align: center;
     color: #F2EBE9;;
`;

export const Button = styledComponents.button`
     cursor: pointer;
     padding: 10px;
     width: 300px;
     margin: 50px;
     justify-items: center;
     background-color: #DE5499;
     color: #F2EBE9;
     box-shadow: 0px 8px 15px rgba(183, 30, 107, 0.5);
     outline: none;
     border: none;
     border-radius: 10px;
     font-family: FC Minimal Regular;
     font-size: 24px; 
     height: 50px;
     &:hover{
          background-color: rgb(234, 105, 172);
     }
     &:disabled {
          background: #ab6b8b;
          box-shadow: none;
          cursor: context-menu;
     }
`;

export const ReverseButton = styledComponents(Button)`
     color: #DE5499;
     background-color: #F2EBE9;
     border: #DE5499  1px solid;

     &:hover{
          background-color: #f7dcf1;
     }
`;

export const DelAndAddMenuButton = styledComponents(ReverseButton)`
     width:240px;
     display: flex;
     flex-direction: row;
     justify-content: space-evenly;
     align-items: center;
`;

export const SaveImageButton = styledComponents(Button)`
     width:240px;
     display: flex;
     flex-direction: row;
     justify-content: space-evenly;
     align-items: center;
`

export const SignUpButton = styledComponents(Button)`
margin:0;
margin-bottom: 30px;
width: 100%;

`
export const SignInButton = styledComponents(SignUpButton)`
background-color: #244244;
box-shadow: 0px 8px 15px #244244;
&:hover{
     background-color:#195f63;
}
`

export const MobileButton = styledComponents(Button)`
     font-size: 18px; 
     height: 30px;
     width: 50px;
     margin: 3px;
     padding: 5px;
     box-shadow: 0px 3px 7px rgba(183, 30, 107, 0.5);
`;

export const ReverseMobileButton = styledComponents(MobileButton)`
     color: #DE5499;
     background-color: #F2EBE9;
     border: #DE5499  1px solid;

     &:hover{
          background-color: #f7dcf1;
     }
`;

export const SaveImageMobileButton = styledComponents(MobileButton)`
     margin-left: 0px;
     margin: 10px;
     background-color: #D78629;
     box-shadow: 0px 8px 15px rgba(215, 134, 41, 0.2);
     &:hover{
     background-color: #E99F4C;
     } 
     
     width:150px;
     display: flex;
     flex-direction: row;
     justify-content: space-evenly;
     align-items: center;
`;

