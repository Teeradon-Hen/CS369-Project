import styledComponents from 'styled-components';

export const RightImage = styledComponents.img.attrs({
     alt:'Background' 
})`
     object-fit: cover;
     width:100%;
     height:720px;
`

export const TextWithLine =  styledComponents.h1`
     display: flex;
     flex-direction: row;
     &:before{
          content: "";
          flex: 1 1;
          border-bottom: 1px solid;
          margin: auto;
          margin-right: 2%;
          margin-left: 5%;
     }
     &:after{
          content: "";
          flex: 1 1;
          border-bottom: 1px solid;
          margin: auto;
          margin-left: 2%;
          margin-right: 5%;
     }
`
// export const FlexContainer =  styledComponents.div`
//      display: flex;
//      background-color: #ECDDDA;
//      flex-direction: row;
//      margin: auto;
//           margin-left: 2%;
//           margin-right: 5%;
//     }
// `

// export const From =  styledComponents.from`
//      margin: 4% 10% 0;
// `

// export const Section =  styledComponents.div`
//      flex: 50%;  
//      align-items: center;
//      text-align: center;
// `
// export const Label =  styledComponents.label`
//      font-size: 20px;
//      font-weight: bold;
// `

