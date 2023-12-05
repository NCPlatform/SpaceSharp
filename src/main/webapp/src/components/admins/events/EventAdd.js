import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const EventAdd = () => {
  const [eventDTO, setCouponDTO] = useState({
    finishDate: '',
    mainImg: '',
    title: '',
    content: '',
    img: '',
  });

  const [mainImgList, setMainImgList] = useState([]);
  const [mainImageShow, setMainImageShow] = useState([]);

  const [imageList, setImageList] = useState([]);
  const [imageShowList, setImageShowList] = useState([]);

  const onMainInput = e => {
    const imageLists = e.target.files;
    let imageUrlLists = [...mainImageShow];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    if (imageUrlLists.length > 10) {
      imageUrlLists = imageUrlLists.slice(0, 10);
    }

    setMainImageShow([...imageUrlLists]);
    setMainImgList(e.target.files);
  };

  const onInput = e => {
    const imageLists = e.target.files;
    let imageUrlLists = [...imageShowList];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    if (imageUrlLists.length > 10) {
      imageUrlLists = imageUrlLists.slice(0, 10);
    }

    setImageShowList([...imageUrlLists]);
    setImageList(e.target.files);
  };

  const handleDeleteImage = id => {
    setImageShowList([...imageShowList.filter((_, index) => index !== id)]);

    const dataTransfer = new DataTransfer();

    Array.from(imageList)
      .filter((_, index) => index !== id)
      .forEach(file => {
        dataTransfer.items.add(file);
      });

    setImageList(dataTransfer.files);
  };

  const onSubmit = () => {
    if (eventDTO.finishDate === 0 || eventDTO.title.trim() === '' || eventDTO.content.trim() === '') {
      Swal.fire({
        icon: 'warning',
        title: '필수 입력값을 다 입력하지 않았습니다',
        text: '입력값을 확인해주세요',
      });
    } else {
      const formData = new FormData();

      formData.append('eventDTO', new Blob([JSON.stringify(eventDTO)], { type: 'application/json' }));
      Object.values(imageList).forEach(file => formData.append('list', file));
      Object.values(mainImgList).forEach(file => formData.append('mainlist', file));

      axios
        .post('/user/writeHotelComment', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          transformRequest: [
            function () {
              return formData;
            },
          ],
        })
        .then(res => {
          alert('이미지 등록을 완료했습니다.');
          window.location.reload();
        })
        .catch(error => console.log(error));
    }
  };

  return (
    <div className="rounded bg-dark bg-opacity-25 couponList" style={{ height: '80vh', overflowY: 'scroll' }}>
      <p className="fs-4 p-2 pb-0 pt-3">이벤트 추가</p>
      <hr />
    </div>
  );
};

export default EventAdd;