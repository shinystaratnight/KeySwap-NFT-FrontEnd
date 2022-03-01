import { Col, OverlayTrigger, Image, Popover, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserDropDownProps } from 'Type';
import { truncateWalletString } from 'utils';
import InfoText from '../../InfoText';
import './index.scss';

export default function UserDropDown(props: UserDropDownProps) {
  return (
    <OverlayTrigger
      trigger="click"
      key="bottom"
      placement="bottom-end"
      overlay={
        <Popover id="user-dropdown">
          <h4>{props.userName}</h4>
          <InfoText variant="secondary">
            {props.walletAddress ? truncateWalletString(props.walletAddress) : ''}
          </InfoText>
          <Row className="main-row">
            <Col xs="8">
              <Row className="balance-row">
                <Col xs="auto">
                  <div className="user-avatar">
                    <Image className="w-100" src={props.userAvatar || '/img/default-profile.png'} />
                  </div>
                </Col>
                <Col>
                  <InfoText variant="primary" size="md">
                    Balance
                  </InfoText>
                  <p>
                    <strong>{props.balance}</strong>
                    <InfoText inline={true}>BNB</InfoText>
                  </p>
                </Col>
              </Row>
            </Col>
            <Col xs="4" className="visa-col pl-0">
              <p>Buy BNB</p>
              <Image className="visa-icon" src="/img/visa.png" />
            </Col>
          </Row>
          <Row className="msg-block">
            <a className="icon-links">Learn how to top-up your BSC wallet with BNB</a>
          </Row>

          <Link to={`/creatorDetail/${props.walletAddress}`} className="icon-link">
            <Image src="/img/user-icon.svg" />
            MY PROFILE
          </Link>
          <a href="#" className="icon-link">
            <Image src="/img/Icon ionic-md-headset.svg" />
            SUPPORT
          </a>
          {/* <a href="#dc" className="icon-link">
            <Image src="/img/Icon ionic-ios-log-out.svg" />
            DISCONNECT
          </a>
          <a href="#e" className="icon-link earth">
            <Image src="/img/earth.svg" />
            EN
          </a> */}
        </Popover>
      }
      rootClose
    >
      <a className="icon-link2">
        <Image className="rounded-circle" src={props.userAvatar || '/img/default-profile.png'} />
        <span>{props.balance} BNB</span>
        <Image className="arrow" src="/img/arrowdown.svg" />
      </a>
    </OverlayTrigger>
  );
}
