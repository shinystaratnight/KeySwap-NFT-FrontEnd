import './Button.css';
import { Button as BootstrapButton, Image } from 'react-bootstrap';
import { ButtonProps } from '../../Type';
import Loader from 'components/Loader';

export const Button = ({
  type,
  variant,
  isLoading,
  img,
  label,
  loadingMessage,
  onClick,
  className = '',
}: ButtonProps) => {
  return (
    <BootstrapButton
      disabled={isLoading}
      className={`button ${className}`}
      type={type}
      variant={variant}
      onClick={() => onClick && onClick()}
    >
      {isLoading && <Loader message={loadingMessage || 'Saving...'} />}
      {!isLoading && img && <Image src={img} />}
      {!isLoading && label}
    </BootstrapButton>
  );
};
