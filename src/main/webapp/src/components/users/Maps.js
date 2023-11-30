import axios from "axios";
import React, { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import Swal from "sweetalert2";
import HotelItemCard from "./HotelItemCard";
import { Link } from "react-router-dom";

const { kakao } = window;

const Maps = () => {
  const [data, setData] = useState([]);
  const [showId, setShowId] = useState(0);
  const geocoder = new kakao.maps.services.Geocoder();
  const [map, setMap] = useState();

  useEffect(() => {
    axios
      .get("/user/getHotelList")
      .then((res) => {
        setData(res.data.hotelList);
      })
      .catch((err) => {
        console.log(err);
      });
    mapscript();
  }, []);

  const mapscript = () => {
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(37.498003, 127.027608),
    };
    setMap(new kakao.maps.Map(container, options));
  };

  useEffect(() => {
    data.map((item) => {
      geocoder.addressSearch(item.addr, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          let markerPosition = new kakao.maps.LatLng(result[0].y, result[0].x);

          let marker = new kakao.maps.Marker({
            position: markerPosition,
            clickable: true,
          });

          kakao.maps.event.addListener(marker, "click", function () {
            setShowId(item.seqHotel);
          });

          marker.setMap(map);
        } else {
          console.error(item.addr + "주소를 좌표로 변환하는데 실패했습니다. ");
        }
      });
    });
  }, [data]);

  return (
    <div className="container">
      <div id="map" style={{ width: "100%", height: "70vh" }}></div>
      <div
        className="position-absolute top-50 start-50 translate-middle"
        style={{ zIndex: "300", width: "40rem" }}
      >
        {showId !== 0 && (
          <div>
            <div
              className="position-absolute top-0 end-0"
              style={{ zIndex: "400" }}
            >
              <button
                className="btn-close"
                onClick={() => setShowId(0)}
              ></button>
            </div>
            <HotelItemCard
              item={data.filter((item) => item.seqHotel === showId)[0]}
            />
            <Link to={`/detail/${showId}`}>
              <p type="button" className="btn btn-dark">
                상세보기
              </p>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Maps;
