import { arrayOf, string, any, func } from 'prop-types';
import './index.scss';
import { Col, Row } from 'react-bootstrap';
import CreatorCard3 from '../../../components/cards/creator/CreatorCard3';
import CreatorCard2 from 'components/cards/creator/CreatorCard2';
import CreatorCard from 'components/cards/creator/CreatorCard';

export function renderCategoryHeader(title, viewAllText) {
  return (
    <div className="category__title">
      <h4 className="title-font">{title}</h4>
      <span>{viewAllText || `View All ${title}`}</span>
    </div>
  );
}
export default function Categories({ title, viewAllText, items, click }) {
  return (
    <div className="category">
      {title && renderCategoryHeader(title, viewAllText)}
      <div className="category__content">
        <Row>
          {items.map((item, index) => (
            <Col key={index} xl="4" lg="4" sm="12" className="category__item" onClick={() => click(item)}>
              <CreatorCard
                title={item.name}
                titleInfo={item.description}
                price={item.price}
                image={item.image}
                ownerAddress={item.ownerAddress}
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

Categories.propTypes = {
  title: string,
  viewAllText: string,
  items: arrayOf(any),
  click: func,
};
