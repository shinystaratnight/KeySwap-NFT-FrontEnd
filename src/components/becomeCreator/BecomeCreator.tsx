import { Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Button } from '../button/Button';
import './BecomeCreator.css';

const BecomeCreator = () => {
  const history = useHistory();
  function goToCreate() {
    history.push(`/upload`);
  }

  return (
    <Row className="become-creator" style={{ backgroundImage: `url(/img/creator-bg.png)` }}>
      <Col>
        <p>
          WE'RE BRINGING DIGITAL CREATORS, <br />
          CRYPTO NATIVES, AND COLLECTORS TOGETHER TO <br />
          MOVE CULTURE FORWARD.
        </p>
        <Button variant="outline-primary" label="Became A Creator" onClick={goToCreate} />
      </Col>
    </Row>
  );
};
export default BecomeCreator;
