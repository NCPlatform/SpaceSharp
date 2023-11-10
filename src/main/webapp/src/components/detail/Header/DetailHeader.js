import React from "react";
import { Col, Nav, Navbar, Row } from "react-bootstrap";
import '../../../css/navheader.css';
import ShortURL from "./ShortURL";
import Sharekakao from "./Sharekakao";

const openUrlInNewTab = () => {
  const url = "https://form.office.naver.com/form/responseView.cmd?formkey=MzFmNjE0ZDAtMTU5Ni00Y2E3LWIwN2UtNjcyMDZhMzkyYjUy&sourceId=urlshare";
  window.open(url, "_blank");
};
const headerStyle = {
  margin: "-10px" // '세부공간 선택' 문구와 아이콘 사이의 간격을 조절
};

const DetailHeader = () => {
  return (
    <div className="box_form p-3 pt-1 pb-1">
      <div className="collapse" id="collapseExample">
        <div className="card card-body" style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
          <Sharekakao /> &nbsp;&nbsp;&nbsp;
          <ShortURL />
        </div>
      </div>
      <Row className="box_form_header " style={{ fontWeight: "bold" }}>
        <Col sm={9} style={headerStyle}>
          <h4 className="pt-3">세부공간 선택</h4>
        </Col>
        <Col sm={3}>
          <Navbar>
            <Nav className="px-1">
              <div className="d-inline-flex gap-1" style={{ background: "transparent" }}>
                <a className="btn btn-primary transparent-bg" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                  <i className="bi bi-upload" style={{ fontSize: "20px" }} />
                </a>
              </div>
            </Nav>
            <Nav className="px-1">
              <i className="bi bi-suit-heart" style={{ fontSize: "20px" }} />&nbsp;
            </Nav>
            <Nav className="px-1">
              <i
                className="bi bi-lightning-fill"
                style={{ fontSize: "20px" }}
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