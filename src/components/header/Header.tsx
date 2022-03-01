import { Container, Form, FormControl, Image, InputGroup, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Button } from '../button/Button';
import './Header.css';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import UserDropDown from './UserDropDown';
import useAuth from 'hooks/useAuth';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { useProfile } from 'state/hooks';
import { ethers } from 'ethers';
import { truncateWalletString } from 'utils';

const Header = () => {
  const { login } = useAuth();
  const [loginStatus, setLoginStatus] = useState(false);

  const context = useWeb3React<Web3Provider>();
  const { connector, library, chainId, account, active } = context;

  const { profile } = useProfile();

  let [etherBalance, setEtherBalance] = useState('0.00');

  useEffect(() => {
    const isLoggedin = account && active && chainId === parseInt(process.env.REACT_APP_NETWORK_ID, 10);
    if (isLoggedin) {
      library.getBalance(account).then(balance => {
        const etherVal = parseFloat(ethers.utils.formatEther(balance));
        setEtherBalance(etherVal.toFixed(4));
      });
    }
    setLoginStatus(isLoggedin);
  }, [connector, library, account, active, chainId, profile]);

  let userName = '';
  let userAvatar = '/img/user-icon.svg';

  if (profile) {
    userName = profile.username ? profile.username : truncateWalletString(profile.walletAddress);
    userAvatar = profile.userAvatarUrl ? profile.userAvatarUrl : '/img/user-icon.svg';
  }

  const history = useHistory();
  function goToUpload() {
    history.push('/upload');
  }
  const onSearchFormSubmit = async event => {
    event.preventDefault();
  };

  return (
    <Navbar collapseOnSelect expand="sm" variant="light">
      <Container>
        <Navbar.Brand>
          <Link to="/">
            <Image src="/img/logo65.png" fluid />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end mb-3 mb-md-0">
          <Nav>
            <Form className="mt-3 mt-md-0" onSubmit={onSearchFormSubmit}>
              <InputGroup className="header-search">
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <Image src="/img/search.svg" />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl className="pl-0" />
              </InputGroup>
            </Form>
            <Link to="/" className="nav-link">
              Marketplace
            </Link>
            <Link to="/creator" className="nav-link">
              Creators
            </Link>
            {loginStatus && profile && (
              <Link to="/upload" className="nav-link">
                Create
              </Link>
            )}
            <Nav.Item>
              <div className="connect-action">
                {!(loginStatus && profile) && <Button label="Connect Wallet" variant="primary" onClick={login} />}
                {loginStatus && profile && (
                  <>
                    {/* {etherBalance} BNB */}
                    <UserDropDown
                      userName={userName}
                      userAvatar={userAvatar}
                      balance={etherBalance}
                      walletAddress={account}
                    />
                  </>
                )}
              </div>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
