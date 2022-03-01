import { Card, Col, Row } from 'react-bootstrap';
import { Button } from '../../button/Button';
import './TrendingCard.scss';

const TrendingCard = () => {
  return (
    <Card className="trending-card">
      <Card.Header>
        <Card.Img variant="top" src="/img/fama-promocard.png" />
      </Card.Header>
      <Card.ImgOverlay>
        <Card.Title className="title">FAMA:Fly Away</Card.Title>
        <Card.Subtitle className="sub-title">Everything you can imagine is real.</Card.Subtitle>
        <Row>
          <Col>
            <Button label="Explore" variant="primary" />
            <Button label="Buy Now" variant="outline-primary" />
          </Col>
        </Row>
      </Card.ImgOverlay>
    </Card>
  );
};
export default TrendingCard;
