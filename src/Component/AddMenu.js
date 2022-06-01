import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import img from '../image/NotFoundImage.jpg'
import { base64 } from '../NotFoundBase64'
import { MenuFormContainer, LeftSection, RightSection, UploadImageSection, FlexRow, AddAndEditMenu } from '../styled-component/AddMenuStyled'
import { Button, ReverseButton, DeleteButton, UploadButton } from '../styled-component/ButtonStyled'
import { InputName, InputPrice, InputDetail, Select, Option } from '../styled-component/InputStyled'
import { useAuth } from '../Authentication';
import swal from 'sweetalert';


import RadioComponents from './RadioComponents';
import { NextTopic, Page, Topic } from '../styled-component/MainEachPage';


export default function AddMenu(props) {
     const auth = useAuth()
     const { token, userInfo } = auth.authState
     const [foodName, setFoodName] = useState('')
     const [foodPrice, setFoodPrice] = useState('')
     const [foodDetail, setFoodDetail] = useState('')
     const [foodImage, setFoodImage] = useState(null);

     useEffect(() => {

     }, [])

     const foodStatus = [{ text: 'พร้อมจำหน่าย', value: 'available' }, { text: 'หมด', value: 'unavailable' }]
     const foodNote = [{ text: 'ไม่มี', value: 'none' }, { text: 'รายการอาหารแนะนำ', value: 'recommend' },
     { text: 'รายการอาหารพิเศษ', value: 'special' }]
     const navigate = useNavigate()

     const handleSubmit = e => {
          e.preventDefault();
          let food_id = props.newId,
               foodCategory = e.target.foodCategory.value,
               foodNote = e.target.foodNote.value,
               foodStatus = e.target.foodStatus.value,
               data = { foodName, foodPrice, foodDetail, foodCategory, foodImage, foodNote, foodStatus }
          // setFoodName('')
          // setFoodPrice('')
          // setFoodDetail('')
          function dataURLtoFile(dataurl, filename) {

               var arr = dataurl.split(','),
                    mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]),
                    n = bstr.length,
                    u8arr = new Uint8Array(n);

               while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
               }

               return new File([u8arr], filename, { type: mime });
          }


          var notFound = dataURLtoFile(base64, 'hello.jpeg');
          console.log(notFound)
          const formData = new FormData()
          formData.append('Image', foodImage ? foodImage : notFound)
          formData.append('foodName', foodName)
          formData.append('foodPrice', foodPrice)
          formData.append('foodDetail', foodDetail)
          formData.append('foodCategory', foodCategory)
          formData.append('foodNote', foodNote)
          formData.append('foodStatus', foodStatus)

          console.log(formData)
          axios.post(`/api/menu/add/?ResId=${userInfo._id}`, formData, {
               headers: {
                    Authorization: token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
               }
          }).then(res => {
               swal({
                    title: "เพิ่มรายการอาหารสำเร็จ",
                    icon: "success",
                    buttons: [false, "ตกลง"],
               }).then((onConfirm) => {
                    if (onConfirm) {
                    }
               });
               console.log(res)

          })


     }

     const onFoodNameChange = e => {
          setFoodName(e.target.value)
     }
     const onFoodPriceChange = e => {
          setFoodPrice(e.target.value)

     }
     const onFoodDetailChange = e => {
          setFoodDetail(e.target.value)
     }

     const resName = userInfo.restaurantName;
     return (
          <Page>
               <FlexRow>
                    <div>
                         <Topic>{resName}</Topic>
                         <NextTopic>สร้างรายการอาหาร</NextTopic>
                    </div>

               </FlexRow>

               <form onSubmit={handleSubmit}>
                    <MenuFormContainer>

                         <LeftSection>

                              <UploadImageSection>
                                   {foodImage ?
                                        <img alt="foodImg" width="100%" src={URL.createObjectURL(foodImage)} />
                                        :
                                        //  <MenuImage text="hello"src={img}  ></MenuImage> 
                                        < img alt="notfound" src={img} width="100%" />
                                   }
                                   <UploadButton>
                                        เพิ่มรูป
                                        <input type="file" style={{ display: 'none' }} accept="image/*"
                                             name="foodImage"
                                             onChange={(event) => {
                                                  console.log(event.target.files[0]);
                                                  setFoodImage(event.target.files[0]);
                                             }}
                                        />
                                   </UploadButton>
                              </UploadImageSection>
                              {/* </div> */}
                              <div style={{ marginTop: '50px' }}>
                                   <label>ความพร้อมของอาหาร</label> <br />
                                   <RadioComponents content={foodStatus} id="foodStatus" />
                              </div>
                         </LeftSection>

                         <RightSection>

                              <label>ชื่อรายการอาหาร</label> <br />
                              <InputName id="foodName" value={foodName} onChange={onFoodNameChange} required ></InputName> <br />

                              <label>ราคาอาหาร (บาท)*</label> <br />
                              <InputPrice id="foodPrice" value={foodPrice} onChange={onFoodPriceChange} required ></InputPrice> <br />

                              <label>รายละเอียดอาหาร (ถ้ามี ไม่เกิน 30 ตัวอักษร)</label> <br />
                              <InputDetail id="foodDetail" value={foodDetail} onChange={onFoodDetailChange}></InputDetail><br />

                              <label>หมวดหมู่</label> <br />
                              <Select id="foodCategory" required>
                                   <Option value="" disabled selected hidden >เลือกหมวดหมู่</Option>
                                   <Option value="เครื่องดื่ม" name="foodCategory">เครื่องดื่ม</Option>
                                   <Option value="ของทอด" name="foodCategory">ของทอด</Option>
                                   <Option value="สเต๊ก" name="foodCategory">สเต๊ก</Option>
                                   <Option value="ของทานเล่น" name="foodCategory">ของทานเล่น</Option>
                              </Select>
                              <br />


                              <label>เพิ่มเติม</label> <br />
                              <RadioComponents content={foodNote} id="foodNote" />


                         </RightSection>

                    </MenuFormContainer>

                    <section style={{ flexDirection: "row", display: "flex", justifyContent: "center" }}>
                         <ReverseButton type='button' onClick={() => { navigate(-1); return false; }} >ย้อนกลับ</ReverseButton>
                         <Button>สร้างรายการอาหาร</Button>
                    </section>


               </form>

          </Page>
     )
}
