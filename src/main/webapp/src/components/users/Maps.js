import React, { useEffect, useState } from "react";
import { Map, MapMarker, useMap, CustomOverlayMap } from "react-kakao-maps-sdk";

const Maps = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [thisPin, setThisPin] = useState({
    title: "카카오",
    open: false,
    latlng: { lat: 33.450705, lng: 126.570677 },
    addr: "카카오주소",
    jibun: "카카오지번",
    homeUrl: "주소값",
    img: "https://newsimg.sedaily.com/2020/11/23/1ZAIQ333LB_1.jpg",
    price: "3,000",
    keyword:
      "#키워드 #키워드2 #키워드3 #키워드4 #키워드5 #키워드6 #키워드7 #키워드8 #키워드9 #키워드10",
    people: 5,
    cntComment: 8,
    cntLiked: 9,
  });

  const data = [
    {
      title: "카카오",
      open: false,
      latlng: { lat: 33.450705, lng: 126.570677 },
      addr: "카카오주소",
      jibun: "카카오지번",
      homeUrl: "주소값",
      img: "https://newsimg.sedaily.com/2020/11/23/1ZAIQ333LB_1.jpg",
      price: "3,000",
      keyword:
        "#키워드 #키워드2 #키워드3 #키워드4 #키워드5 #키워드6 #키워드7 #키워드8 #키워드9 #키워드10",
      people: 5,
      cntComment: 8,
      cntLiked: 9,
    },
    {
      title: "생태연못",
      open: false,
      latlng: { lat: 33.450936, lng: 126.569477 },
      addr: "생태연못주소",
      jibun: "생태연못지번",
      homeUrl: "주소값",
      img: "이미지",
      price: "4,000",
      keyword: "#키워드 #키워드2 #키워드3 #키워드4 #키워드5 #키워드6 #키워드7",
      people: 5,
      cntComment: 8,
      cntLiked: 9,
    },
    {
      title: "텃밭",
      open: false,
      latlng: { lat: 33.450879, lng: 126.56994 },
      addr: "텃밭주소",
      jibun: "텃밭지번",
      homeUrl: "주소값",
      img: "https://newsimg.sedaily.com/2020/11/23/1ZAIQ333LB_1.jpg",
      price: "5,000",
      keyword: "#키워드 #키워드2 #키워드3 #키워드4 #키워드5",
      people: 5,
      cntComment: 8,
      cntLiked: 9,
    },
    {
      title: "근린공원",
      open: false,
      latlng: { lat: 33.451393, lng: 126.570738 },
      addr: "근린공원주소",
      jibun: "근린공원지번",
      homeUrl: "주소값",
      img: "https://blog.kakaocdn.net/dn/bnObbq/btqG4bfUSWI/AEW6UohPU4ewLxJlsR8kxK/img.jpg",
      price: "6,000",
      keyword:
        "#키워드 #키워드2 #키워드3 #키워드4 #키워드5 #키워드6 #키워드7 #키워드8 #키워드9",
      people: 5,
      cntComment: 8,
      cntLiked: 9,
    },
  ];

  const EventMarkerContainer = ({ position, content, name }) => {
    const map = useMap();
    const [isVisible, setIsVisible] = useState(false);

    return (
      <MapMarker
        position={position} // 마커를 표시할 위치
        // @ts-ignore
        onClick={(marker) => {
          map.panTo(
            marker.getPosition(),
            setThisPin(data.filter((item) => item.title === name)[0]),
            setIsOpen(true)
          );
        }}
        onMouseOver={() => setIsVisible(true)}
        onMouseOut={() => setIsVisible(false)}
      >
        {isVisible && content}
      </MapMarker>
    );
  };

  useEffect(() => {
    console.log(thisPin);
  }, [thisPin]);

  return (
    <Map // 지도를 표시할 Container
      center={{
        // 지도의 중심좌표
        lat: 33.450701,
        lng: 126.570667,
      }}
      style={{
        // 지도의 크기
        width: "100vw",
        height: "90vh",
      }}
      level={3} // 지도의 확대 레벨
    >
      {data.map((value) => (
        <EventMarkerContainer
          key={`EventMarkerContainer-${value.latlng.lat}-${value.latlng.lng}`}
          position={value.latlng}
          content={value.content}
          name={value.title}
        />
      ))}

      {isOpen && (
        <CustomOverlayMap position={thisPin.latlng}>
          <div className="card">
            <img
              className="card-img-top"
              src="https://newsimg.sedaily.com/2020/11/23/1ZAIQ333LB_1.jpg"
              style={{ width: "18rem", height: "10rem", objectFit: "cover" }}
              alt="building"
            />
            <div className="card-header bg-transparent border-0">
              <div className="catd-title d-flex justify-content-between">
                <span className="fs-4">{thisPin.title}</span>
                <span
                  className="btn-close"
                  onClick={() => setIsOpen(false)}
                  title="닫기"
                ></span>
              </div>
            </div>
            <div className="card-body">
              <p style={{ fontSize: "0.6rem" }}>
                <span style={{ fontWeight: "bold" }}>{thisPin.addr}</span> |{" "}
                <span>#태그 #태그 #태그</span>
              </p>
              <div className="d-flex justify-content-between mb-0 pb-0">
                <p className="mb-0 pb-0">
                  <span className="fw-bold" style={{ color: "purple" }}>
                    {thisPin.price}
                  </span>
                  <span>원/시간</span>
                </p>
                <p className="mb-0 pb-0" style={{ fontSize: "0.8rem" }}>
                  <span>최대{thisPin.people}인</span>
                  <span>{thisPin.cntComment}</span>
                  <span>{thisPin.cntLiked}</span>
                </p>
              </div>
            </div>
          </div>
        </CustomOverlayMap>
      )}
    </Map>
  );
};

export default Maps;
