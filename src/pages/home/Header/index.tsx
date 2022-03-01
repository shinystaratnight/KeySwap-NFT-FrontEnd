import { Col, Row } from 'react-bootstrap';
import HomeCard from '../../../components/cards/home/HomeCard';
import './Header.scss';
import InfoText from '../../../components/InfoText/index';
import { Button } from '../../../components/button/Button';
const Header = () => {
  return (
    <div className="home-header">
      <div className="header-left">
        <div className="sub-script">Feature Artwork</div>
        <h1 className="title-font">Life in Waves</h1>
        <InfoText variant="primary" size="lg">
          Each wave has a story. Nothing should stop you from moving forward to create Life in Waves.
        </InfoText>
        <div className="header-cta">
          <Button label="Explore & Collect now" variant="primary" />
          <Button label="Collections" variant="outline-primary" />
        </div>
      </div>
      {/* <HomeCard /> */}
    </div>
  );
};

export default Header;
