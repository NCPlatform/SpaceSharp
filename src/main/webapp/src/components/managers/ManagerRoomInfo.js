import React from 'react';
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

const ManagerRoomInfo = () => {
    // ======================================== variables
    const {roomSeq} = useParams()
    // ======================================== functions 
    
    // ======================================== CSS
    
    // ======================================== API / Test / etc
    return (
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" />
                </Form.Group>

            </Form>
        </div>
    );
};

export default ManagerRoomInfo;