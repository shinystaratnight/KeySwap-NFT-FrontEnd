import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import * as Scroll from 'react-scroll'

import { makeStyles } from '@material-ui/core/styles';

import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import SocialButtons from '../socialButtons';
import './footer.css';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const Footer = (props) => {

  const classes = useStyles();

  const { window } = props

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 90,
  });

  const handleTop = () => {
    Scroll.animateScroll.scrollToTop({duration: 800})
  }

  return (
    <div className="main-footer">
      <Container>
        <Row className="m-0">
          <Col xs="12" className="p-0">
            <Image className="logo" src="/images/logo_footer.png" fluid />
            <SocialButtons />
            <p>&copy; 2022 Keyswap - Marketplace for NFTs and digital goods.</p>
            <Row className="inner-row">
              <Col xs="12" sm="3" className="p-0">
                <a href="/" className="nav-link">
                  Terms Of Service
                </a>
              </Col>
              <Col xs="12" sm="3" className="p-0">
                <a href="/" className="nav-link">
                  Privacy Policy
                </a>
              </Col>
              <Col xs="12" sm="2" className="p-0">
                <a href="/" className="nav-link">
                  Help Center
                </a>
              </Col>
              <Col xs="12" sm="2" className="p-0">
                <a href="/" className="nav-link">
                  Blog
                </a>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Zoom in={trigger}>
        <div onClick={handleTop} role="presentation" className={classes.root}>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </div>
      </Zoom>
    </div>
  );
};

export default Footer
