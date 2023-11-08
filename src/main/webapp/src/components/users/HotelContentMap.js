import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';

const { kakao } = window;

const HotelContentMap = () => {
    const [isMapDraggable, setIsMapDraggable] = useState(false);
    const [location, setLocation] = useState(''); // 상세 위치 정보를 저장할 상태
    const [locationName, setLocationName] = useState('');

    // useEffect를 사용하여 컴포넌트가 마운트될 때 한 번 데이터를 불러올 수 있음
    useEffect(() => {
        // 이 부분에서 데이터베이스에서 위치 정보를 가져오는 API 요청 등을 수행
        // 예: fetch('API_URL')
        //       .then(response => response.json())
        //       .then(data => {
        //           setLocation(data.location);
        //       });

        // 가상의 데이터를 상태에 설정 (실제로는 데이터베이스에서 가져와야 함)
        setLocationName('달래해장 강남역점');
        setLocation('서울 강남구 강남대로94길 20 1층');
    }, []);

    useEffect(() => {
        const Container = document.getElementById('map'); // 지도를 담을 영역의 DOM 레퍼런스
        const options = {
            center: new kakao.maps.LatLng(37.499541, 127.029007), // 지도의 중심좌표.
            draggable: isMapDraggable, // draggable 속성을 상태에 따라 설정 //움직임 잠금
            level: 3,
        };
        const map = new kakao.maps.Map(Container, options); // 지도 생성 및 객체 리턴

        // 마커를 생성하고 위치를 설정
        const markerPosition = new kakao.maps.LatLng(37.499541, 127.029007);
        const marker = new kakao.maps.Marker({
            position: markerPosition,
        });

        // 마커를 지도에 표시
        marker.setMap(map);
    }, [isMapDraggable]);

    const toggleMapDraggable = () => {
        setIsMapDraggable(!isMapDraggable);
    };

    const handleFindPath = () => {
        const destinationName = '달래해장 강남역점';
        const destinationLat = '37.499541';
        const destinationLng = '127.029007';
        window.open(`https://map.kakao.com/link/to/${destinationName},${destinationLat},${destinationLng}`);
    };

    return (
        <div>
            <strong style={{ color: 'black' }}>상세 위치</strong>
            <br />
            <hr style={{ width: '20px', border: '4px solid #ff7402' }} />

            <strong>{locationName}</strong>
            <br />
            {location}
            <br />
            {/* '전화' 버튼과 '길 찾기' 버튼*/}
            <Row className="p-3" style={{ justifyContent: "left" }}>
                <Col sm={6} style={{ width: '30%' }}>
                    <Button variant="primary" className="w-100 phone-button">
                        <span style={{ fontWeight: 'bold' }}>
                            <i className="bi bi-telephone-fill" />&nbsp;전화
                        </span>
                    </Button>
                </Col>

                <Col sm={6} style={{ width: '30%' }}>
                    <Button variant="primary" className="w-100 phone-button" onClick={handleFindPath}>
                        <span style={{ fontWeight: 'bold' }}>
                            <i className="bi bi-geo-alt-fill" />&nbsp;길 찾기
                        </span>
                    </Button>
                </Col>
            </Row>

            <button onClick={toggleMapDraggable} style={{ border: 'none', background: 'none' }}>
                {isMapDraggable ? (
                    <>
                        <i className="bi bi-unlock" style={{ fontSize: '24px' }}></i>
                    </>
                ) : (
                    <>
                        <i className="bi bi-lock" style={{ fontSize: '24px' }}></i>
                    </>
                )}
            </button>
            <br />
            <div id="map" style={{ width: '70%', height: '500px' }}></div>
        </div>
    );
};


export default HotelContentMap;