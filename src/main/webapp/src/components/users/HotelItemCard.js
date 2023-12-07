import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Carousel } from "react-bootstrap";

const HotelItemCard = ({ item, index }) => {
  const [maxPeople, setMaxPeople] = useState();
  const [cntReview, setCntReview] = useState();
  const [cntLike, setLike] = useState();
  const [minPrice, setMinPrice] = useState();

  useEffect(() => {
    axios
      .get(`/user/getHotelDetailCard?seqHotel=${item.seqHotel}`)
      .then((res) => {
        setMaxPeople(res.data.maxPeople);
        setCntReview(res.data.cntReview);
        setLike(res.data.cntLike);
        setMinPrice(res.data.minPrice);
      })
      .catch();
  }, [item]);

  return (
    <Card className="mb-3">
      <Card.Body>
        {item.img.length !== 0 ? (
          item.img.split(",").length > 1 ? (
            <Carousel interval={null}>
              {item.img.split(",").map((image, index) => (
                <Carousel.Item key={index}>
                  <div style={{}}>
                    <img
                      className="d-block w-100 img-fluid"
                      src={image}
                      alt={`Slide ${index + 1}`}
                      style={{
                        objectFit: "cover",
                        height: "250px",
                        width: "100%",
                      }}
                    />
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <img
              src={item.img}
              alt="img"
              style={{
                objectFit: "cover",
                height: "250px",
                width: "100%",
              }}
            />
          )
        ) : (
          <img
            src="https://adventure.co.kr/wp-content/uploads/2020/09/no-image.jpg"
            alt="img"
            style={{
              objectFit: "cover",
              height: "250px",
              width: "100%",
            }}
          />
        )}

        <div className="card-title mt-2">
          <span className="fs-5 text-truncate">{item.name}</span>
        </div>
        <div className="mb-0 pb-0 text-truncate" style={{ fontSize: "0.8rem" }}>
          {item.addr} | {item.keyword}
        </div>
        <div
          className="d-flex justify-content-between mt-3"
          style={{ fontSize: "0.8rem" }}
        >
          {minPrice === -1 ? (
            <p
              style={{
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              공간을 <span className="firstFontColor">준비중</span> 에 있습니다
            </p>
          ) : (
            <p>
              <span
                className="firstFontColor"
                style={{
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
              >
                {minPrice === -1 ? (
                  <></>
                ) : (
                  minPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                )}
              </span>
              원/시간
            </p>
          )}
          <p className="d-flex pt-1">
            {maxPeople !== -1 && (
              <span>
                최대{" "}
                <span className="fw-bold fourthFontColor">{maxPeople}</span>인/
              </span>
            )}
            <span>
              리뷰 <span className="fw-bold fourthFontColor">{cntReview}</span>
              개/{" "}
            </span>
            <span>
              좋아요 <span className="fw-bold fourthFontColor">{cntLike}</span>
              개
            </span>
          </p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default HotelItemCard;
