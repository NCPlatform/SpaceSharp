import React from 'react';
import { Card, Button } from 'react-bootstrap';
import img02 from '../../img/img02.jpg';

const HotelSameSpace = () => {
    return (
        <div>
            <strong style={{ color: 'black' }}>비슷한 공간</strong>
            <br />
            <hr style={{ width: '20px', border: '4px solid #ff7402' }} />
            <div className="row">
                <div className="col-md-4 mb-3">
                    <Card style={{ width: '100%' }}>
                        <Card.Img variant="top" src={img02} style={{ width: '100%', height: '200px' }} />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-md-4 mb-3">
                    <Card style={{ width: '100%' }}>
                        <Card.Img variant="top" src={img02} style={{ width: '100%', height: '200px' }} />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-md-4 mb-3">
                    <Card style={{ width: '100%' }}>
                        <Card.Img variant="top" src={img02} style={{ width: '100%', height: '200px' }} />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </div>

            </div>
        </div>
    );
};

export default HotelSameSpace;