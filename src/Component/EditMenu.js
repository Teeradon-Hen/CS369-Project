import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import swal from 'sweetalert';

import minus from '../image/001-minus.png'
import { Buffer } from 'buffer';

import { MenuFormContainer, LeftSection, RightSection, UploadImageSection, FlexRow, AddAndEditMenu } from '../styled-component/AddMenuStyled'
import { Button, ReverseButton, DelAndAddMenuButton, UploadButton } from '../styled-component/ButtonStyled'
import { InputName, InputPrice, InputDetail, Select, Option } from '../styled-component/InputStyled'

import { useAuth } from '../Authentication';

import RadioComponents from './RadioComponents';
import { NextTopic, Topic } from '../styled-component/MainEachPage';

export default function AddMenu(props) {
     const params = useParams();
     const auth = useAuth()
     const { token, userInfo } = auth.authState
     const [foodName, setFoodName] = useState('')
     const [foodPrice, setFoodPrice] = useState('')
     const [foodDetail, setFoodDetail] = useState('')
     const [foodImage, setFoodImage] = useState(null);
     const [foodNote, setFoodnote] = useState(null);
     const [foodStatus, setFoodstatus] = useState(null);
     const [foodCategory, setFoodCategory] = useState(null);

     const foodstatus = [{ text: 'พร้อมจำหน่าย', value: 'available' }, { text: 'หมด', value: 'unavailable' }]
     const foodnote = [{ text: 'ไม่มี', value: 'none' }, { text: 'รายการอาหารแนะนำ', value: 'recommend' },
     { text: 'รายการอาหารพิเศษ', value: 'special' }]
     const navigate = useNavigate()


     useEffect(() => {

          axios.get(`/api/menu/get/?ResId=${userInfo._id}&foodId=${params.id}`, {
               headers: {
                    Authorization: token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
               }
          })
               .then(res => {
                    const data = res.data
                    setFoodName(data.foodName)
                    setFoodPrice(data.foodPrice)
                    setFoodDetail(data.foodDetail)
                    setFoodnote(data.foodNote)
                    setFoodstatus(data.foodStatus)
                    setFoodCategory(data.foodCategory)
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
                    const img = new Buffer.from(data.foodImage.data, 'base64')
                    setFoodImage(dataURLtoFile(`data:${data.foodImage.contentType};base64,${img.toString('base64')}`, 'hello.png'))
               })

     }, [])

     var option = document.getElementsByName('foodCategory')
     option.forEach(element => {
          if (foodCategory == element.textContent)
               element.setAttribute('selected', 'selected');
     })

     const handleSubmit = e => {
          e.preventDefault();
          let food_id = props.newId,
               foodCategory = e.target.foodCategory.value,
               foodNote = e.target.foodNote.value,
               foodStatus = e.target.foodStatus.value,
               data = { foodName, foodPrice, foodDetail, foodCategory, foodImage, foodNote, foodStatus }

          const formData = new FormData()
          formData.append('Image', foodImage)
          formData.append('foodName', foodName)
          formData.append('foodPrice', foodPrice)
          formData.append('foodDetail', foodDetail)
          formData.append('foodCategory', foodCategory)
          formData.append('foodNote', foodNote)
          formData.append('foodStatus', foodStatus)
          axios.put(`/api/menu/edit/?ResId=${userInfo._id}&foodId=${params.id}`, formData, {
               headers: {
                    Authorization: token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
               }
          }).then(res => {
               console.log(res)
               if (res) {
                    swal({
                         title: "แก้ไขรายการอาหารสำเร็จ",
                         icon: "success",
                         buttons: [false, "ตกลง"],
                    }).then((onConfirm) => {
                         if (onConfirm) {
                         }
                    });
               }
          })
          console.log(formData)
          // axios.put(`http://localhost:4000/edit-menu/?name=toghsmsss`,formData).then(res =>{

     }

     const deleteMenu = () => {
          swal({
               title: "คุณแน่ใจใช่ไหมที่จะลบรายการอาหารนี้?",
               icon: "warning",
               buttons: ["ยกเลิก", "ยืนยัน"],
               dangerMode: true,
          })
               .then((willDelete) => {
                    if (willDelete) {
                         swal("รายการอาหารถูกลบออกสำเร็จ", {
                              icon: "success",
                              buttons: [false, "ตกลง"],
                         })
                              .then((onConfirm) => {
                                   if (onConfirm) {
                                        axios.delete(`/api/menu/delete/?ResId=${userInfo._id}&foodId=${params.id}`, {
                                             headers: {
                                                  Authorization: token,
                                                  Accept: 'application/json',
                                                  'Content-Type': 'application/json'
                                             }
                                        }).then(res => {
                                             console.log(res)
                                             navigate(-1);
                                        })
                                   }
                              });

                    }
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
          <AddAndEditMenu>
               <FlexRow>
                    <div>
                         <Topic>{resName}</Topic>
                         <NextTopic>แก้ไขรายการอาหาร</NextTopic>
                    </div>
                    <DelAndAddMenuButton onClick={deleteMenu}>
                         <img src={minus} width="32px" height="32px" />
                         ลบรายการอาหารนี้
                    </DelAndAddMenuButton>
               </FlexRow>

               <form onSubmit={handleSubmit}>
                    <MenuFormContainer>

                         <LeftSection>

                              <UploadImageSection>

                                   {foodImage && <img alt="foodImg" width="100%" src={URL.createObjectURL(foodImage)} />}


                                   <UploadButton>
                                        แก้ไขรูป
                                        <input type="file" style={{ display: 'none' }} accept="image/*"
                                             name="foodImage"
                                             onChange={(event) => {
                                                  console.log(event.target.files[0]);
                                                  setFoodImage(event.target.files[0]);
                                             }}
                                        />
                                   </UploadButton>
                              </UploadImageSection>

                              <div style={{ marginTop: '50px' }}>
                                   <label>ความพร้อมของอาหาร</label> <br />
                                   {foodStatus && <RadioComponents content={foodstatus} id="foodStatus" data={foodStatus} />}
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
                                   <Option name="foodCategory">เครื่องดื่ม</Option>
                                   <Option name="foodCategory">ของทอด</Option>
                                   <Option name="foodCategory">สเต๊ก</Option>
                                   <Option name="foodCategory">ของทานเล่น</Option>
                              </Select>
                              <br />


                              <label>เพิ่มเติม</label> <br />
                              {foodNote && <RadioComponents content={foodnote} id="foodNote" data={foodNote} />}


                         </RightSection>

                    </MenuFormContainer>

                    <section style={{ flexDirection: "row", display: "flex", justifyContent: "center" }}>
                         <ReverseButton type='button' onClick={() => {navigate(-1); return false;}} >ย้อนกลับ</ReverseButton>
                         <Button type='sumbit'>บันทึกการแก้ไขข้อมูล</Button>
                    </section>


               </form>

          </AddAndEditMenu>
     )
}
