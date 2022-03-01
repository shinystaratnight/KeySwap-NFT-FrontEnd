import InfoText from 'components/InfoText';
import { Container } from 'react-bootstrap';
import './index.scss';
import { Button } from '../../components/button/Button';
import { useHistory } from 'react-router';
import BrandIcon from './Brand_icon.png';
export default function NotFound() {
  const history = useHistory();
  function goToHome() {
    history.push('/');
  }
  return (
    <Container>
      <div className="text-center not-found">
        <h1 className="title-font">
          <div>
            N
            <img src={BrandIcon} />T
          </div>
          <div>
            F<img src={BrandIcon} />
            UND
          </div>
        </h1>
        <InfoText>Oops! Something is wrong</InfoText>
        <Button label="Back to Home" variant="primary" onClick={goToHome} />
      </div>
    </Container>
  );
}
