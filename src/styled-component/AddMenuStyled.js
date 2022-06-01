import styledComponents from 'styled-components';

export const MenuFormContainer = styledComponents.div`
     flex-direction: row;
     display: flex;
     justify-content: center; 
     font-size: 20px ; 
     font-weight: 700 ;
     margin-top: 30px; 
 `;

export const LeftSection = styledComponents.section`
     flex:40%;
 ` ;

export const RightSection = styledComponents.section`
     flex:60%;
 ` ;

export const UploadImageSection = styledComponents.div`
      display: flex;
     flex-direction: column;
     width: 70% 
 `;

export const MenuImage = styledComponents.img`
     width: 70%
 `;

export const FlexRow = styledComponents.section`
     display: flex;
     flex-direction: row;
     justify-content: space-between;
     align-items: center;
`;
export const AddAndEditMenu = styledComponents.div`
     margin: 30px 100px;
`