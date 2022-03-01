import { string } from 'prop-types';
import { Image } from 'react-bootstrap';
import './index.scss';
export default function Loader({ message }) {
  return (
    <div className="loader">
      <Image className="loader-animation" src="/img/loader.svg" /> <span> {message || 'Load More'}</span>
    </div>
  );
}

Loader.propTypes = {
  message: string,
};
