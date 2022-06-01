import styledComponents from 'styled-components';

export const HeaderSection = styledComponents.header`
background-color: hsl(9, 36%, 89%);
`
export const OnTopImage = styledComponents.img`
display: block;
margin-left: auto;
margin-right: auto;
padding-bottom: 15px;
width: auto;
height: 90px;
`
export const NavigationBar = styledComponents.ul`
list-style-type: none;
display: flex;
flex-direction: row;
margin: 0;
padding: 0;
padding-left: 50px;
overflow: hidden;
position: -webkit-sticky;
position: sticky;
z-index: 100;
top: 0;
background-color: hsl(9, 36%, 89%);
justify-content: center;
`

export const Tab = styledComponents.li`
  width: 18%;
      > a {
        text-decoration: none;
        display: block;
        color: #264143;
        text-align: center;
        padding: 20px 40px;
        font-weight: bold;
        font-size: 25px;
        flex: 22%;
        &:hover {
          background-color: #F2EBE9;
        }
}`;

export const ResFn = styledComponents.div`
  font-size: 22px;
  color: #264143;
  display: flex;
  padding: 0px 15px;
  padding-top: 25px;
  background-color: #EDDCD9;
`;

export const Flex80 = styledComponents.div`
  text-align: center;
  flex: 80%;
  
`;

export const Flex10 = styledComponents.div`
  flex: 10%;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: #e0ccc9;
  }
`;