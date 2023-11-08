import React, { useEffect } from 'react';

const { kakao } = window;

const HotelContentMap = () => {
    useEffect(() => {
        const Container = document.getElementById('map'); // 지도를 담을 영역의 DOM 레퍼런스
        const options = {
            center: new kakao.maps.LatLng(37.499541, 127.029007), // 지도의 중심좌표.
            level: 3
        };
        const map = new kakao.maps.Map(Container, options); // 지도 생성 및 객체 리턴

        // 마커를 생성하고 위치를 설정
        const markerPosition = new kakao.maps.LatLng(37.499541, 127.029007);
        const marker = new kakao.maps.Marker({
            position: markerPosition
        });

        // 마커를 지도에 표시
        marker.setMap(map);
    }, []);

    return (
        <div id="map" style={{ width: '70%', height: '500px' }}></div>
    );
};

export default HotelContentMap;