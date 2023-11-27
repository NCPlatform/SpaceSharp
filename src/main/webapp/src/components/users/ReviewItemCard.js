import React from "react";
import { ImStarFull } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";

const ReviewItemCard = ({ reviewListItem }) => {
  const { reviewItem, reservedRoom, reservedHotel, hotelCategory } =
    reviewListItem;

  const navigate = useNavigate();

  return (
    <div
      className="card mb-3"
      onClick={() => navigate("/detail/" + reservedHotel.seqHotel)}
    >
      {reviewItem.picture && reviewItem.picture.length !== 0 ? (
        <img
          src={reviewItem.picture.split(", ")[0]}
          alt="img"
          style={{
            objectFit: "cover",
            height: "200px",
            width: "100%",
          }}
        />
      ) : (
        <img
          src="https://adventure.co.kr/wp-content/uploads/2020/09/no-image.jpg"
          alt="img"
          style={{
            objectFit: "cover",
            height: "200px",
            width: "100%",
          }}
        />
      )}
      <div className="card-body">
        <div className="card-title mt-1 mb-1 fw-bold">{reservedHotel.name}</div>
        <div className="d-flex">
          <p className="me-3 m-0">
            {Array.from({ length: "5" }).map((_, index2) => (
              <ImStarFull
                key={index2}
                className={
                  index2 < reviewItem.rating
                    ? "starLatingGray"
                    : "starLatingBlack"
                }
                size="15"
              />
            ))}
          </p>
          <p className="m-0 pt-1" style={{ justifyContent: "center" }}>
            <span className="firstFontColor fw-bold">{reservedRoom.price}</span>
            원/시간
          </p>
        </div>
        <div
          className="my-3"
          style={{
            fontSize: "0.9rem",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            height: "3rem",
          }}
        >
          {reviewItem.comment}
        </div>
        <div>
          {hotelCategory.split(",").map((item, index) => (
            <span key={index} className="tag">
              {"#" + item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewItemCard;
