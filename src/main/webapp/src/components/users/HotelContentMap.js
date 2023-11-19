import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Modal, Row } from 'react-bootstrap';

const { kakao } = window;

const HotelContentMap = ({ seqHotel }) => {
    const [isMapDraggable, setIsMapDraggable] = useState(false);
    const [location, setLocation] = useState('');
    const [tel, setTel] = useState('');
    const [ownerEmail, setOwnerEmail] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [map, setMap] = useState(null);

    const modalContent = (
        <div>
            "스페이스 샵을 통해<br /> 연락드렸어요~" <br /> 라고 말하면 더 친절하게 안내<br /> 받으실 수 있습니다.<br />
        </div>
    ); // 모달내용

    useEffect(() => {
        axios.get(`/user/getAddr?seqHotel=${seqHotel}`)
            .then(response => {
                const data = response.data;
                if (data) {
                    setLocation(data);
                } else {
                    console.error('해당 공간의 주소를 찾을 수 없습니다.');
                }
            })
            .catch(error => {
                console.error('데이터를 불러오는 중 에러 발생:', error);
            });

        axios.get(`/user/getHotelInfo?seqHotel=${seqHotel}`)
            .then(response => {
                const data = response.data;
                if (data) {
                    setLocation(data.addr);
                    setOwnerEmail(data.ownerEmail);
                } else {
                    console.error('해당 공간 정보를 찾을 수 없습니다.');
                }
            })
            .catch(error => {
                console.error('데이터를 불러오는 중 에러 발생:', error);
            });

        if (ownerEmail) {
            axios.get(`/user/getUserByEmail?email=${ownerEmail}`)
                .then(response => {
                    const userData = response.data;
                    if (userData) {
                        setTel(userData.tel);
                    } else {
                        console.error('해당 사용자 정보를 찾을 수 없습니다.');
                    }
                })
                .catch(error => {
                    console.error('데이터를 불러오는 중 에러 발생:', error);
                });
        }
    }, [seqHotel, ownerEmail]);

    useEffect(() => {
        if (!location || !map) return;

        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch(location, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
                const center = new kakao.maps.LatLng(result[0].y, result[0].x);

            
                map.setCenter(center);

                
                const marker = new kakao.maps.Marker({
                    position: center,
                });
                marker.setMap(map);
            } else {
                console.error('주소를 좌표로 변환하는데 실패했습니다.');
            }
        });
    }, [location, map]);

    useEffect(() => {
        const Container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(37.499541, 127.029007),
            draggable: isMapDraggable,
            level: 3,
        };
        const newMap = new kakao.maps.Map(Container, options);
        setMap(newMap);

        const markerPosition = new kakao.maps.LatLng(37.499541, 127.029007);
        const marker = new kakao.maps.Marker({
            position: markerPosition,
        });

        marker.setMap(newMap);

        
        return () => {
            newMap && setMap(null); 
        };
    }, [isMapDraggable]);

    const toggleMapDraggable = () => {
        setIsMapDraggable(!isMapDraggable);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
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

            {location}
            <br />
            <Row className="p-3" style={{ justifyContent: "left" }}>
                <Col sm={6} style={{ width: '30%' }}>
                    <Button variant="primary" className="w-100 phone-button" onClick={handleOpenModal}>
                        <span style={{ fontWeight: 'bold' }}>
                            <i className="bi bi-telephone-fill" />&nbsp;&nbsp;전화
                        </span>
                    </Button>
                </Col>
                <Col sm={6} style={{ width: '30%' }}>
                    <Button variant="primary" className="w-100 phone-button" onClick={handleFindPath}>
                        <span style={{ fontWeight: 'bold' }}>
                            <i className="bi bi-geo-alt-fill" />&nbsp;&nbsp;길 찾기
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
            <Modal show={isModalOpen} onHide={handleCloseModal}>
                <Modal.Body style={{ padding: '50px', textAlign: 'center' }}>
                    <p style={{ fontSize: '25px', fontWeight: 'lighter' }}>{modalContent}</p>
                    <hr />
                    <p style={{ fontSize: '25px', fontWeight: 'bold' }}>{location}</p>
                    <p style={{ fontSize: '25px', fontWeight: 'lighter', color: 'purple' }}>{tel}</p>
                    <hr />
                    <br />
                    <br />
                    <Button style={{ width: '70%' }} onClick={handleCloseModal}>확인</Button>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default HotelContentMap;