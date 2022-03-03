import { Button } from '../../../components/button/Button';
import InfoText from '../../../components/InfoText';
import './index.scss';
export default function HomeSubFooter() {
  return (
    <div className="home-sub-footer">
      <InfoText variant="primary" size="lg">
        WE’RE BRINGING DIGITAL CREATORS, CRYPTO NATIVES, AND COLLECTORS TOGETHER TO MOVE CULTURE FORWARD.
      </InfoText>
      <Button variant="dark" label="became a creator on KeySwap"></Button>
    </div>
  );
}
