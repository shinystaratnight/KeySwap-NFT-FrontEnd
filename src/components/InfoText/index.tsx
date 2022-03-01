import { any, bool, oneOf, string } from 'prop-types';
import './InfoText.scss';
export default function InfoText({ children, size, variant, inline, className }) {
  return <p className={`info-text ${size} ${variant} ${inline ? 'inline' : ''} ${className}`}>{children}</p>;
}

InfoText.propTypes = {
  className: string,
  children: any,
  size: oneOf(['lg', 'md', 'sm']),
  variant: oneOf(['secondary', 'primary']),
  inline: bool,
};

InfoText.defaultProps = {
  size: 'md',
  variant: 'secondary',
  inline: false,
  className: '',
};
