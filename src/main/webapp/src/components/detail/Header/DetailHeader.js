import React from "react";
import { Col, Nav, Navbar, Row } from "react-bootstrap";


const openUrlInNewTab = () => {
    const url = "https://form.office.naver.com/form/responseView.cmd?formkey=MzFmNjE0ZDAtMTU5Ni00Y2E3LWIwN2UtNjcyMDZhMzkyYjUy&sourceId=urlshare";
    window.open(url, "_blank");
};

const DetailHeader = () => {
  return (
    <div className="box_form p-3 pt-1 pb-1">
      <Row className="box_form_header " style={{ fontWeight: "bold" }}>
        <Col sm={9}>
          <h4 className="pt-3">세부공간 선택</h4>
        </Col>
        <Col sm={3}>
          <Navbar>
            <Nav className="px-1">
              <i className="bi bi-upload" style={{ fontSize: "24px" }} />
            </Nav>
            <Nav className="px-1">
              <i className="bi bi-suit-heart" style={{ fontSize: "24px" }} />
            </Nav>
            <Nav className="px-1">
              <i
                className="bi bi-lightning-fill"
                style={{ fontSize: "24px" }}
                onClick={openUrlInNewTab}
              />
            </Nav>
          </Navbar>
        </Col>
      </Row>
    </div>
  );
};

export default DetailHeader;