import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Middle } from "./PaymentTable";
import styledComponents from "styled-components";
import { Link } from "react-router-dom";
import { Buffer } from 'buffer';
import { useState } from "react";

export const ContentTypography = styledComponents(Typography)`
    color: #F2EBE9;
`;

export const MenuCard = styledComponents.div`
    display: inline-block;
    margin-left: 0px;
    margin-right: 90px;
    margin-bottom: 70px;
`;

export const NoData = styledComponents.p`
    font-size:30px;
    color: #DE5499;
    text-align:center;
`;

const theme = createTheme({
     typography: {
          fontFamily: [
               "FC Minimal Regular"
          ].join(','),
          h5: {
               fontWeight: 700,
          },
          h6: {
               fontWeight: 700,
          },
          body1: {
               fontSize: 20,
          },
     },

     palette: {
          background: {
               paper: "#BA6262",
          },
     }
});

export default function MenuCardCreate({ menus }) {

     const MenuList = menus.map(e => {
          const img = new Buffer.from(e.foodImage.data, 'base64')
          var  foodImage = `data:${e.foodImage.contentType};base64,${img.toString('base64')}`

          return (
               <Link to={`edit/${e._id}`}>
                    <ThemeProvider theme={theme} key={e._id}>
                         <MenuCard>
                              <Card sx={{ width: 230, height: 380 }}>
                                   <CardActionArea>
                                        <Middle>
                                             <CardMedia
                                                  style={{
                                                       borderRadius: "3%",
                                                       marginTop: "15px",
                                                       width: "200px",
                                                       height: "200px"
                                                  }}
                                                  component="img"
                                                  image={foodImage}
                                                  alt="food"
                                             />
                                        </Middle>

                                        <CardContent>
                                             <ContentTypography gutterBottom variant="h5" component="div">
                                                  {e.foodName}
                                             </ContentTypography>
                                             <ContentTypography gutterBottom variant="body1" >
                                                  {e.foodDetail}
                                             </ContentTypography>
                                             <ContentTypography variant="h6" align="right">
                                                  {e.foodPrice}฿
                                             </ContentTypography>
                                        </CardContent>
                                   </CardActionArea>
                              </Card>
                         </MenuCard>
                    </ThemeProvider>
               </Link>


          );
     })

     return (
          <>
               {MenuList.length !== 0 ? MenuList :
                    <NoData>ไม่มีรายการอาหาร</NoData>}
          </>
     )
}
