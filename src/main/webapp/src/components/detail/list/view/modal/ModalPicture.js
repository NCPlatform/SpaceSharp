import React, { useEffect, useState } from 'react'
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'


const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    height: '600px'
}


const ModalPicture = ({data, isModalView, modalClose}) => {
  const [slideImages, setSlideImages] = useState();

  // 데이터 렌더링, Slide에 들어갈 데이터 양식에 맞춰서 넣을 것
  useEffect(() => {
    setSlideImages(data)
  },[])

  return (
    <Modal
    show={isModalView}
    onHide={modalClose}
    centered
    fullscreen={true}
    
  >
    <Modal.Body style={{width:"100%", height:"100%", backgroundColor:"#333"}}>
      <div style={{textAlign:"right"}}>
        <Button className={"btn-close bg-white"} style={{fontSize:"30px"}} onClick={modalClose}/>
      </div>

      <div style={{paddingTop:"6%"}}>
        <Slide autoplay={false}>
         {/* {slideImages.map((slideImage, index)=> ( */}
         {slideImages?.img.map((slideImage, index)=> (
            <div key={index} style={{width:"80%", paddingLeft:"20%", height:"100%"}}>
              {/* <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}> */}
              <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage})` }}>
                {/* <span style={spanStyle}>{slideImage.caption}</span> */}
                {/* <span style={spanStyle}>{slideImage.caption}</span> */}
              </div>
            </div>
          ))} 
        </Slide>
      </div>
    </Modal.Body>
  </Modal>
  )
}

export default ModalPicture

// const slideImages = [
//   {
//     url: 'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
//     caption: 'Slide 1'
//   },
//   {
//     url: 'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',
//     caption: 'Slide 2'
//   },
//   {
//     url: 'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
//     caption: 'Slide 3'
//   },
// ];


// const spanStyle = {
//   padding: '20px',
//   background: '#efefef',
//   color: '#000000'
// }
