import React from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import './index.css';

const SocialButtons = () => {
  return (
    <Row className="social-buttons">
      <Col xs="auto">
      <a href={"/"} rel="noopener noreferrer" target="_blank">
          <Image src="/images/social/discord.svg" />
        </a>
      </Col>
      <Col xs="auto">
      <a href={"https://twitter.com/keyswap_dex"} rel="noopener noreferrer" target="_blank">
          <Image src="/images/social/twitter.svg" />
        </a>
      </Col>
      <Col xs="auto">
      <a href={"https://t.me/keyswap_chat"} rel="noopener noreferrer" target="_blank">
          <Image src="/images/social/telegram.svg" />
        </a>
      </Col>
      <Col xs="auto">
        <a href={"https://key-swap.medium.com/"} rel="noopener noreferrer" target="_blank">
          <Image src="/images/social/medium.svg" />
        </a>
      </Col>
    </Row>
  );
};
export default SocialButtons;
