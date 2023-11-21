import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: 'cover',
  height: '600px',
};

const ModalPicture = ({ data, isModalView, modalClose }) => {
  const [slideImages, setSlideImages] = useState([]);

  // 데이터 렌더링, Slide에 들어갈 데이터 양식에 맞춰서 넣을 것
  useEffect(() => {
    if (data && data.img) {
      setSlideImages(data.img.split(', '));
    }
  }, [data]);

  return (
    <Modal show={isModalView} onHide={modalClose} centered fullscreen={true}>
      <Modal.Body style={{ width: '100%', height: '100%', backgroundColor: '#333' }}>
        <div style={{ textAlign: 'right' }}>
          <Button className={'btn-close bg-white'} style={{ fontSize: '30px' }} onClick={modalClose} />
        </div>

        <div style={{ paddingTop: '6%' }}>
          <Slide autoplay={false}>
            {slideImages.map((slideImage, index) => (
              <div key={index} style={{ width: '80%', paddingLeft: '20%', height: '100%' }}>
                <div style={{ ...divStyle, backgroundImage: `url(${slideImage})` }} />
              </div>
            ))}
          </Slide>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalPicture;