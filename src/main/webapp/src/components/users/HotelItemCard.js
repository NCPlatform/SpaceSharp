import React from 'react';
import { Card, Carousel } from 'react-bootstrap';

const HotelItemCard = ({item, index}) => {
    return (
        <div className="item">
            <Card>
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

                <Card.Title>{item.name}</Card.Title>
                <div
                    className="mb-0 pb-0 text-truncate"
                    style={{ fontSize: "0.8rem" }}
                >
                    {item.addr} | {item.keyword}
                </div>
                <div
                    className="d-flex justify-content-between"
                    style={{ fontSize: "0.8rem" }}
                >
                    <p>
                    <span
                        style={{
                        color: "purple",
                        fontWeight: "bold",
                        fontSize: "1rem",
                        }}
                    >
                        16,000
                    </span>
                    원/시간
                    </p>
                    <p>
                    <span>최대 3인</span>
                    <span>평가 15개</span>
                    <span>좋아요 3개</span>
                    </p>
                </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default HotelItemCard;