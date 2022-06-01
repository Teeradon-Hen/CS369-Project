import { Link } from "react-scroll";
import StickyBox from "react-sticky-box";
import styledComponents from "styled-components";

export const HeaderCategory = styledComponents.ul`
    justify-content: space-between;
    font-weight: bold;
    background-color: #F2EBE9;
    margin-top: 0px;
    display: flex;
    flex-direction: row;
    overflow-y: hidden;
    white-space:nowrap;
    list-style-type: none;
    padding-left: 20px;
    flex-wrap: nowrap;
    justify-items: center;
    width: 100%;
`;

export const Category = styledComponents.li`
    padding-bottom: 10px;
`;

export const NavLink = styledComponents(Link)`
    background-color: #F2EBE9;
    padding: 10px 20px;
    padding-bottom: 7px;
    color: #DE5499;
    font-size: 20px;
    &.active {
        background-color: #EDDCD9;
        border-bottom: 3px solid #DE5499;
    }
    &:hover {
        background-color: #EDDCD9;
    }
`;

export default function HeaderMenus() {

    return(<StickyBox offsetTop={123} style={{zIndex: "9999"}}>
    <HeaderCategory>
          <Category><NavLink activeClass="active" to="recommend" offset={-180} duration={500} spy={true} smooth={true}>แนะนำ</NavLink></Category>
          <Category><NavLink activeClass="active" to="special" offset={-180} duration={500} spy={true} smooth={true}>พิเศษ</NavLink></Category>
          <Category><NavLink activeClass="active" to="steak" offset={-180} duration={500} spy={true} smooth={true}>สเต๊ก</NavLink></Category>
          <Category><NavLink activeClass="active" to="fried" offset={-180} duration={500} spy={true} smooth={true}>ของทอด</NavLink></Category>
          <Category><NavLink activeClass="active" to="snack" offset={-180} duration={500} spy={true} smooth={true}>ของทานเล่น</NavLink></Category>
          <Category><NavLink activeClass="active" to="drink" offset={-180} duration={500} spy={true} smooth={true}>เครื่องดื่ม</NavLink></Category>
            </HeaderCategory>
    </StickyBox>);
}