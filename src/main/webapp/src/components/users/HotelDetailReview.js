import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import moment from 'moment';
import { ImStarFull } from 'react-icons/im';

import '../../css/HotelDetailReview.css';

import Swal from 'sweetalert2';

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const HotelDetailReview = ({ seqHotel }) => {
  const [review, setReview] = useState([]);
  const [reservation, setReservation] = useState([]);
  const [reserveUser, setReserveUser] = useState([]);

  const [imageList, setImageList] = useState([]);
  const [imageShowList, setImageShowList] = useState([]);

  const [reviewPage, setReviewPage] = useState(0);

  useEffect(() => {
    axios
      .get(`/user/setReviewTab?seqHotel=${seqHotel}`)
      .then(res => {
        console.log(res.data);
        setReview(res.data.review);
        setReservation(res.data.reservation);
        setReserveUser(res.data.reserveUser);
      })
      .catch(error => {
        console.error('데이터를 불러오는 중 에러 발생:', error);
      });
  }, [seqHotel]);

  const [sessionUserDTO, setSessionUserDTO] = useState(JSON.parse(sessionStorage.getItem('user')));

  const [commentDTO, setCommentDTO] = useState({
    email: sessionUserDTO ? sessionUserDTO.email : '',
    comment: '',
    rating: '',
    seqRefComment: '0',
    seqReservation: 0,
    picture: '',
  });

  const [starClicked, setStarClicked] = useState([false, false, false, false, false]);

  const onClickStar = item => {
    let starClickedState = [...starClicked];
    for (let i = 0; i < 5; i++) {
      starClickedState[i] = i <= item ? true : false;
    }
    setStarClicked(starClickedState);
    setCommentDTO({
      ...commentDTO,
      rating: item,
    });
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
    if (commentDTO.seqReservation === 0) {
      Swal.fire({
        icon: 'warning',
        title: '예약 미지정',
        text: '언제 예약에 대한 리뷰인지 알려주세요',
      });
    } else if (commentDTO.comment.trim() === '') {
      Swal.fire({
        icon: 'warning',
        title: '리뷰 미입력',
        text: '리뷰 내용을 입력해주세요',
      });
    } else {
      const formData = new FormData();

      formData.append('commentDTO', new Blob([JSON.stringify(commentDTO)], { type: 'application/json' }));
      Object.values(imageList).forEach(file => formData.append('list', file));

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

  // OwlCarousel Option
  const options = {
    loop: false,
    margin: 30,
    touchDrag: true,
    dots: false,
    nav: true,
    navText: ['Prev', 'Next'],
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 1,
      },
      768: {
        items: 1,
      },
      992: {
        items: 2,
      },
      1400: {
        items: 3,
      },
    },
  };

  const options2 = {
    loop: false,
    margin: 30,
    touchDrag: true,
    dots: false,
    navText: ['Prev', 'Next'],
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 1,
      },
      768: {
        items: 1,
      },
      992: {
        items: 2,
      },
      1400: {
        items: 3,
      },
    },
  };

  return (
    <div>
      <div className="p-3">
        {review.length > 0 ? (
          <div>
            {Array.from({ length: 3 }).map(
              (_, index) =>
                review[reviewPage * 3 + index] && (
                  <div className="py-4 border-bottom">
                    <div className="d-flex justify-content-between">
                      <p className="fs-5">
                        <span className="fw-bold">
                          {reserveUser.filter(user => user.email === review[reviewPage * 3 + index].email)[0].name +
                            ' '}
                        </span>
                        고객님
                      </p>
                      <p>
                        {Array.from({ length: '5' }).map((_, index2) => (
                          <ImStarFull
                            key={index2}
                            className={
                              index2 <= review[reviewPage * 3 + index].rating ? 'starLatingGray' : 'starLatingBlack'
                            }
                            size="25"
                          />
                        ))}
                      </p>
                    </div>
                    <div className="my-3 text-secondary">
                      <pre
                        style={{
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-all',
                          overflow: 'auto',
                        }}>
                        {review[reviewPage * 3 + index].comment}
                      </pre>
                    </div>
                    {review[reviewPage * 3 + index].picture && (
                      <OwlCarousel className="owl-theme" {...options}>
                        {review[reviewPage * 3 + index].picture.split(', ').map((item, index2) => (
                          <img
                            key={index2}
                            className="img col"
                            src={item}
                            alt={item}
                            style={{ height: '15vw', objectFit: 'cover' }}
                            onClick={e => {
                              Swal.fire({
                                imageUrl: e.target.src,
                                confirmButtonText: '닫기',
                              });
                            }}
                          />
                        ))}
                      </OwlCarousel>
                    )}
                  </div>
                )
            )}
            <div className="text-center mt-3">
              <div className="btn-group" role="group">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setReviewPage(0)}
                  disabled={reviewPage === 0 ? true : false}>
                  {'<'}
                </button>
                {Array.from({ length: (review.length - 1) / 3 + 1 }).map((_, pIndex) => {
                  return (
                    <button
                      type="button"
                      className={reviewPage === pIndex ? 'btn px-3 fw-bold text-dark' : 'btn px-3 text-secondary'}
                      key={pIndex}
                      onClick={() => setReviewPage(pIndex)}>
                      {pIndex + 1}
                    </button>
                  );
                })}
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setReviewPage((review.length - 1) / 3)}
                  disabled={reviewPage === (review.length - 1) / 3 ? true : false}>
                  {'>'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>리뷰가 없습니다</div>
        )}
      </div>
      <div className="bg-dark bg-opacity-10 p-3 rounded">
        {sessionUserDTO ? (
          reservation ? (
            reservation.filter(item => item.email === sessionUserDTO.email).length > 0 ? (
              <div>
                <h3>리뷰작성</h3>
                <p>언제 예약에 대한 리뷰인가요</p>
                <OwlCarousel className="owl-theme" {...options2}>
                  {reservation
                    .filter(item => item.email === sessionUserDTO.email)
                    .map((item, index) => {
                      return (
                        <div key={index} className="col">
                          <div
                            className={
                              'card ' + (commentDTO.seqReservation === item.seqReservation ? 'text-bg-dark' : '')
                            }
                            onClick={() => {
                              review.filter(review => review.seqReservation === item.seqReservation).length > 0
                                ? Swal.fire({
                                    icon: 'error',
                                    text: '이미 리뷰가 작성된 예약입니다',
                                  })
                                : commentDTO.seqReservation === item.seqReservation
                                ? setCommentDTO({
                                    ...commentDTO,
                                    seqReservation: 0,
                                  })
                                : setCommentDTO({
                                    ...commentDTO,
                                    seqReservation: item.seqReservation * 1,
                                  });
                            }}>
                            <p className="card-header">
                              <span className="fw-bold">예약 날짜</span>
                              {moment(item.reservationDate).format(' ( YYYY / MM / D ) ')}
                            </p>
                            <div className="card-body">
                              <div className="card-text">
                                <p>입실 시간 : {moment(item.travelStartDate).format('YYYY/MM/D hh:mm')}</p>
                                <p className="card-text">
                                  퇴실 시간 : {moment(item.travelEndDate).format('YYYY/MM/D hh:mm')}
                                </p>
                                
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </OwlCarousel>
                <div className="my-3 text-end">
                  {Array.from({ length: '5' }).map((item, index) => (
                    <ImStarFull
                      key={index}
                      onClick={() => onClickStar(index)}
                      className={starClicked[index] ? 'starLatingGray' : 'starLatingBlack'}
                      size="25"
                    />
                  ))}
                </div>
                <div className="form-floating my-3">
                  <textarea
                    type="text"
                    className="form-control"
                    style={{ height: '100px' }}
                    value={commentDTO.comment}
                    onChange={e => {
                      setCommentDTO({ ...commentDTO, comment: e.target.value });
                    }}>
                    {commentDTO.comment}
                  </textarea>
                  <label htmlFor="floatingInputValue">리뷰</label>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="mb-3">
                    <label htmlFor="imageFile">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="currentColor"
                        className="bi bi-camera"
                        viewBox="0 0 16 16">
                        <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
                        <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                      </svg>
                      <input
                        className="form-control"
                        type="file"
                        id="imageFile"
                        name="imageFile"
                        multiple={true}
                        file={commentDTO.picture}
                        onChange={e => onInput(e)}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
                  <div className="mb-3">
                    <button type="button" className="btn btn-outline-dark" onClick={() => onSubmit()}>
                      작성
                    </button>
                  </div>
                </div>
                <div className="mb-5 row row-cols-3">
                  {imageShowList.map((image, id) => (
                    <div className="col position-relative p-0" key={id}>
                      <img
                        className="rounded"
                        style={{
                          width: '100%',
                          height: '10vw',
                          objectFit: 'cover',
                        }}
                        src={image}
                        alt={`${image}-${id}`}
                      />
                      <button
                        type="button"
                        className="btn btn-danger position-absolute top-0 end-0 shadow-lg p-0 btn-close"
                        onClick={() => handleDeleteImage(id)}></button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <h3 className="p-0 m-0 text-center">
                예약한 이력이 있는 유저만
                <br />
                리뷰 작성이 가능합니다.
              </h3>
            )
          ) : (
            <h3 className="p-0 m-0 text-center">
              예약도 없고
              <br />
              예약한 이력이 있는 유저만
              <br />
              리뷰 작성이 가능합니다.
            </h3>
          )
        ) : (
          <h3 className="p-0 m-0 text-center">로그인 후 리뷰 작성이 가능합니다.</h3>
        )}
      </div>
    </div>
  );
};

export default HotelDetailReview;
