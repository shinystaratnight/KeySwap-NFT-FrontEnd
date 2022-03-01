import { Card, Col, Row } from 'react-bootstrap';
import { ToggleButton } from '../../button/toggle/ToggleButton';
import ProfileImage from '../../profile/ProfileImage';
import './HomeCard.scss';
import { HomeCardProps } from 'Type';
const HomeCard = ({ image, ownerName, userAvatarUrl }: HomeCardProps) => {
  return (
    <Card className="home-card">
      <Card.Header>
        <Card.Img variant="top" src={image} />
      </Card.Header>
      <Card.Footer>
        <Row className="row1">
          <Col className="col1">
            <Row className="row11">
              <Col className="col11" lg="auto" sm="auto">
                <ProfileImage img={userAvatarUrl || '/img/default-profile.png'} />
              </Col>
              <Col className="col12">
                <Card.Subtitle className="user-designation">Owned by</Card.Subtitle>
                <Card.Title className="user-name">{ownerName}</Card.Title>
              </Col>
            </Row>
          </Col>
          <Col className="col2" lg="auto" sm="auto">
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};
export default HomeCard;
