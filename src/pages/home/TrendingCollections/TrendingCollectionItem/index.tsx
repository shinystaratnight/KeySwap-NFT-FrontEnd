import { Button } from '../../../../components/button/Button';
import InfoText from '../../../../components/InfoText';
import './index.scss';
export default function TrendingCollectionItem({ title, info, image }) {
  return (
    <div className="trending-collection-item" style={{ backgroundImage: `url(${image})` }}>
      <h2 className="title-font">{title}</h2>
      <InfoText>{info}</InfoText>
      <div className="trending-collection__cta">
        <Button label="Explore" variant="primary" />
        <Button label="Buy Now" variant="outline-primary" />
      </div>
    </div>
  );
}
