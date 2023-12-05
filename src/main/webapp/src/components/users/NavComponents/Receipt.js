import { format } from "date-fns";
import { forwardRef, useState } from "react";
import { Link } from "react-router-dom";

const Receipt = forwardRef((props, ref) => {
  const [sessionUserDTO, setSessionUserDTO] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );
  const { item, hotel, room } = props;
  return (
    <div ref={ref} className="">
      <div className="">
        <div className="border border-1 text-truncate mb-3">
          <p className="fs-5 bg-secondary-subtle p-2">예약 내용</p>
          <div className="row my-2">
            <div className="col-3 col-xs-4 text-secondary ps-4">신청일</div>
            <div className="col-9 col-xs-8">
              {format(new Date(item.reservationDate), "yyyy.MM.dd HH시")}
            </div>
          </div>
          <hr style={{ width: "98%", margin: "0 auto" }} />
          <div className="row my-2">
            <div className="col-3 col-xs-4 text-secondary ps-4">예약 공간</div>
            <div className="col-9 col-xs-8">
              <p className="p-0 m-0">
                <span className="fw-bold">{hotel.name}</span>/
                <span>{room.name}</span>
              </p>
              <Link
                to={`/detail/${hotel.seqHotel}`}
                type="button"
                className="text-dark text-decoration-none bg-dark-subtle px-2 rounded fw-bold mt-2"
              >
                공간 보러가기 &gt;
              </Link>
            </div>
          </div>
          <hr style={{ width: "98%", margin: "0 auto" }} />
          <div className="row my-2">
            <div className="col-3 col-xs-4 text-secondary ps-4">예약 내용</div>
            <div className="col-9 col-xs-8">
              <p className="p-0 m-0">
                {format(new Date(item.travelStartDate), "yyyy.MM.dd HH시") +
                  " ~ " +
                  format(new Date(item.travelEndDate), "yyyy.MM.dd HH시") +
                  " " +
                  item.travelfulltime +
                  "시간"}
              </p>
            </div>
          </div>
        </div>

        <div className="border border-1 text-truncate">
          <p className="fs-5 bg-secondary-subtle p-2">예약자 정보</p>
          <div className="row my-2">
            <div className="col-3 col-xs-4 text-secondary ps-4">예약자명</div>
            <div className="col-9 col-xs-8">{sessionUserDTO.name}</div>
          </div>
          <hr style={{ width: "98%", margin: "0 auto" }} />
          <div className="row my-2">
            <div className="col-3 col-xs-4 text-secondary ps-4">연락처</div>
            <div className="col-9 col-xs-8">
              <p className="p-0 m-0">{sessionUserDTO.tel}</p>
            </div>
          </div>
          <hr style={{ width: "98%", margin: "0 auto" }} />
          <div className="row my-2">
            <div className="col-3 col-xs-4 text-secondary ps-4">이메일</div>
            <div className="col-9 col-xs-8">
              <p className="p-0 m-0">{sessionUserDTO.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Receipt;
