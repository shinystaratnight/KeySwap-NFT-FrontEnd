import { string } from 'prop-types';
import './index.scss';
export default function ArtCard({ title, image }) {
  return (
    <div className="art-card">
      <img src={image} />
      <div className="art-card__title title-font">{title}</div>
    </div>
  );
}

ArtCard.propTypes = {
  title: string.isRequired,
  image: string.isRequired,
};
