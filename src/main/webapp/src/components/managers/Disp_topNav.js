import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


const Disp_topNav = () => {

    const styleA = {fontSize:'0.7em'}
    const styleB = {width: '20%'}
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">SpaceSharp <span style = {styleA}>manager</span></Navbar.Brand>
          <span style = {styleB}></span>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto"> 
              <Nav.Link href="#home">SpaceSharp 홈</Nav.Link> &emsp;&emsp;
              <NavDropdown title="플레이스 관리" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">플레이스 조회</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">플레이스 추가</NavDropdown.Item>
              </NavDropdown>&emsp;&emsp;

              <NavDropdown title="예약 관리" id="basic-nav-dropdown2">
                <NavDropdown.Item href="#action/3.1">오늘의 예약</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">전체 예약 조회</NavDropdown.Item>
                {
                    /*
                    <NavDropdown.Divider />
                    */

                }
                
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
};

export default Disp_topNav;