import { Card, Col, Row } from 'react-bootstrap';
import { useProfileForWallet } from 'state/hooks';
import { truncateWalletString } from 'utils';
import { ToggleButton } from '../../button/toggle/ToggleButton';
import ProfileImage from '../../profile/ProfileImage';
import './CreatorCard3.scss';

const CreatorCard3 = ({ title, titleInfo, price, image, ownerAddress }) => {
  const { profile } = useProfileForWallet(ownerAddress);

  return (
    <Card className="creator-card3">
      <Card.Body>
        <Row className="align-items-center">
          <Col xs="auto">
            <ProfileImage img={profile && (profile.userAvatarUrl || '/img/default-profile.png')} />
          </Col>
          <Col className="p-0">
            <Card.Title className="user-name truncate">
              {profile && (profile.username || truncateWalletString(ownerAddress))}
            </Card.Title>
            <Card.Title className="title title-font truncate">@{title}</Card.Title>
          </Col>
        </Row>
      </Card.Body>
      <Card.Header>{image && <Card.Img variant="top" src={image} />}</Card.Header>
      <Card.Footer>
        <Card.ImgOverlay>
          {/* <ProfileImage img={profile && (profile.userAvatarUrl || '/img/default-profile.png')} />
          <Card.Title className="user-name truncate">
            {profile && (profile.username || truncateWalletString(ownerAddress))}
          </Card.Title>
          <Card.Subtitle className="user-designation">{'Owned by'}</Card.Subtitle> */}

          <Card.Text className="price">({price} BNB per Item)</Card.Text>
          <Card.Subtitle className="sub-title truncate">{titleInfo}</Card.Subtitle>
        </Card.ImgOverlay>
        {/* <Row>
          <Col className="col1">
            <Card.Subtitle className="sub-title">Fixed price</Card.Subtitle>
            <Card.Text className="price">{price} BNB</Card.Text>
          </Col>
          <Col className="col2"></Col>
        </Row> */}
      </Card.Footer>
    </Card>
  );
};
export default CreatorCard3;
