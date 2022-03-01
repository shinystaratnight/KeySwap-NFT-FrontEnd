import { Col, Container, Image, Row } from 'react-bootstrap';
import SocialButtons from '../socialButtons';
import './Footer.css';

export const Footer = () => {
  return (
    <div className="main-footer">
      <Container>
        <Row className="m-0">
          <Col xs="12" className="p-0">
            <Image className="logo" src="/img/logo.png" fluid />
            <SocialButtons />
            <p>&copy; 2021 Keyswap - Marketplace for NFTs and digital goods.</p>
            <Row className="inner-row">
              <Col xs="12" sm="3" className="p-0">
                <a href="#" className="nav-link">
                  Terms Of Service
                </a>
              </Col>
              <Col xs="12" sm="3" className="p-0">
                <a href="#" className="nav-link">
                  Privacy Policy
                </a>
              </Col>
              <Col xs="12" sm="2" className="p-0">
                <a href="#" className="nav-link">
                  Help Center
                </a>
              </Col>
              <Col xs="12" sm="2" className="p-0">
                <a href="#" className="nav-link">
                  Blog
                </a>
              </Col>
              <Col xs="12" sm="2" className="p-0">
                <a href="#" className="nav-link">
                  <Image className="lang" src="/img/lang.png" fluid />
                  EN
                </a>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
