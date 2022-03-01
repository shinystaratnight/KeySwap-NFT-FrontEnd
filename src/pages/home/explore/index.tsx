import InfoText from 'components/InfoText';
import { Card, Col, Form, Image, Row } from 'react-bootstrap';
import { Button } from '../../../components/button/Button';
import { Explore } from './Explore';
import './index.scss';

interface ExploreCardPropsType {
  className?: string;
  exploreList: Array<Explore>;
  onClick?: (explore: Explore) => void;
}
const ExploreCard = ({ className, exploreList, onClick }: ExploreCardPropsType) => {
  return (
    <Card className={`explore-card p-0 ${className}`}>
      <Card.Body className="px-0">
        {/* <div className="category__title mb-2">
          <h4 className="title-font ml-2">Explore</h4>
        </div> */}

        <div className="explore-card-scroll pt-3 px-3 pb-1 cstm-scroll">
          {exploreList.map((explore, i) => (
            <Button
              key={i}
              variant="primary"
              img={explore.icon}
              label=""
              className="filter-icon"
              onClick={() => onClick && onClick(explore)}
            />
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};
export default ExploreCard;
