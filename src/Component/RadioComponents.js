import * as React from 'react';
import { pink } from '@mui/material/colors';
import Radio from '@mui/material/Radio';
import { RadioLabel, RadioFlex } from '../styled-component/RadioStyled';



export default function RadioComponents(props) {
     const [selectedValue, setSelectedValue] = React.useState(props.data ? props.data : props.content[0].value);

     const handleChange = (event) => {
          setSelectedValue(event.target.value);
     };
     // console.log(props.id,props.data)
     // console.log(props.id,selectedValue)

     const controlProps = (item) => ({
          checked: selectedValue === item,
          onChange: handleChange,
          value: item,
          name: props.id,
          id: props.id,
          inputProps: { 'aria-label': item },
     });

     return (
          <div>
               {props.content.map(e =>
               <RadioFlex>
                    <Radio {...controlProps(e.value)} sx={{ color: '#DE5499', '&.Mui-checked': { color: '#DE5499' } }} />
                    <RadioLabel key={props.id}>{e.text}</RadioLabel>
               </RadioFlex> 
               )}
               
{/* 
               <RadioFlex>
                    <Radio {...controlProps('recommend')} sx={{ color: '#DE5499', '&.Mui-checked': { color: '#DE5499' } }} />
                    <RadioLabel>รายการอาหารแนะนำ</RadioLabel>
               </RadioFlex>

               <RadioFlex>
                    <Radio {...controlProps('special')} sx={{ color: '#DE5499', '&.Mui-checked': { color: '#DE5499' } }} />asd
                    <RadioLabel>รายการอาหารพิเศษ</RadioLabel>
               </RadioFlex> */}

               <br />


          </div>
     );
}
