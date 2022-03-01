import { Col, Image, Row } from 'react-bootstrap';
import './index.css';

const SocialButtons = () => {
  return (
    <Row className="social-buttons">
      <Col xs="auto">
        <a href="#">
          <Image src="/img/social/logo.svg" />
        </a>
      </Col>
      <Col xs="auto">
        <a href="#">
          <Image src="/img/social/Path 238.svg" />
        </a>
      </Col>
      <Col xs="auto">
        <a href="#">
          <Image src="/img/social/telegram.svg" />
        </a>
      </Col>
      <Col xs="auto">
        <a href="#">
          <Image src="/img/social/Group 20750.svg" />
        </a>
      </Col>
    </Row>
  );
};
export default SocialButtons;
