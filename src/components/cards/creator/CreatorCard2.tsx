import { Card, Col, Row } from 'react-bootstrap';
import { CreatorCard2Props } from '../../../Type';
import ProfileImage from '../../profile/ProfileImage';
import SocialButtons from '../../socialButtons';
import './CreatorCard2.scss';

const CreatorCard2 = (props: CreatorCard2Props) => {
  return (
    <Card className="creator-card2">
      <Card.Header onClick={props.onClick}>
        {props.image && <Card.Img className="banner" variant="top" src={props.image} />}
        <Card.ImgOverlay>
          <ProfileImage img={props.userIcon} />
        </Card.ImgOverlay>
      </Card.Header>

      <Card.Footer>
        <Card.Title className="user-name title-font">{props.userName}</Card.Title>
        <SocialButtons />
        <Card.Subtitle className="user-designation">{props.subTitle || 'Created & owned by'}</Card.Subtitle>
        <Row className="preview">
          {props.previewList[1] && (
            <Col xs="4" className="p-0">
              <div className="img-block">
                <Card.Img className="img" src={props.previewList[1]} />
              </div>
            </Col>
          )}
          {props.previewList[0] && (
            <Col xs="4" className="p-0">
              <div className="img-block">
                <Card.Img className="img" src={props.previewList[0]} />
              </div>
            </Col>
          )}
          {props.previewList[2] && (
            <Col xs="4" className="p-0">
              <div className="img-block">
                <Card.Img className="img" src={props.previewList[2]} />
              </div>
            </Col>
          )}
        </Row>
      </Card.Footer>
    </Card>
  );
};
export default CreatorCard2;
