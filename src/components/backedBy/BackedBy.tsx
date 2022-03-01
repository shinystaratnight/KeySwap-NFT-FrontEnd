import { Col, Container, Image, Row } from 'react-bootstrap';
import './BackedBy.css';

const BackedBy = () => {
  return (
    <Row className="backed-by">
      <Col>
        <h6>Backed By</h6>
        <Image src="/img/backedBy/bb3.svg" />
      </Col>
    </Row>
  );
};
export default BackedBy;
