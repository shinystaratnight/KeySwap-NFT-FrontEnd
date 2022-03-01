import { useEffect, useState } from 'react';
import { Col, Container, Image, Nav, Row, Tab, Tabs } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router';
import { Button } from '../../../components/button/Button';
import CreatorCard from '../../../components/cards/creator/CreatorCard';
import CreatorCard2 from '../../../components/cards/creator/CreatorCard2';
import HomeCard from '../../../components/cards/home/HomeCard';
import InfoText from '../../../components/InfoText';
import ProfileImage from '../../../components/profile/ProfileImage';
import SocialButtons from '../../../components/socialButtons';
import { CreatorObj, CreatorObj2 } from '../../../Type';
import './index.scss';
import createdJson from '../created.json';
import likedJson from '../liked.json';
import onSaleJson from '../on-sale.json';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useGetNFTUserFullDetail } from 'hooks/useApi';
import { truncateWalletString } from 'utils';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { useProfile } from 'state/hooks';

const Detail = ({
  match: {
    params: { walletAddress },
  },
}: RouteComponentProps<{ walletAddress: string }>) => {
  const history = useHistory();
  let data = useLocation().state;

  const [loginStatus, setLoginStatus] = useState(false);
  const { connector, library, chainId, account, active } = useWeb3React<Web3Provider>();

  const { profile } = useProfile();

  useEffect(() => {
    const isLoggedin = account && active && chainId === parseInt(process.env.REACT_APP_NETWORK_ID, 10);
    setLoginStatus(isLoggedin);
  }, [connector, library, account, active, chainId]);

  const nftUserFullDetail = useGetNFTUserFullDetail(walletAddress);

  if (!nftUserFullDetail || !nftUserFullDetail.user_profile) {
    return <></>;
  }

  return (
    <div className="creator-detail">
      <Row className="banner justify-content-center">
        <Image src={nftUserFullDetail.user_profile.userBackgroupUrl || '/img/creators/1.png'} fluid />
      </Row>
      <Container>
        <div className="user-block">
          <ProfileImage
            img={nftUserFullDetail.user_profile.userAvatarUrl}
            verified={nftUserFullDetail.user_profile.verified}
          />
          <Row className="align-items-center mt-4">
            <Col xs="8" sm="6">
              <h4 className="title truncate title-font">
                {nftUserFullDetail.user_profile.username || truncateWalletString(walletAddress)}
              </h4>
            </Col>
            <Col xs="4" sm="6" className="profile-action text-right pl-0">
              {loginStatus && profile && walletAddress.toLowerCase() === account.toLowerCase() && (
                <Link to="/account/edit" className="share-btn">
                  <Image className="lang" src="/img/edit.svg" /> Edit Profile
                </Link>
              )}
            </Col>
          </Row>
          <InfoText variant="secondary">{truncateWalletString(walletAddress)}</InfoText>
          <InfoText size="lg" variant="primary">
            {nftUserFullDetail.user_profile.userBio}
          </InfoText>
          <SocialButtons />
        </div>

        {/* <div className="home-header">
          <HomeCard />
          <div className="header-left">
            <InfoText variant="secondary">Feature Artwork</InfoText>
            <h1 className="title-font">Another Words</h1>
            <InfoText size="lg" variant="primary">
              Each wave has a story. Nothing should stop you from moving forward to create Life in Waves.
            </InfoText>
            <div className="header-cta">
              <Button label="Learn More" variant="outline-primary" />
            </div>
          </div>
        </div> */}

        <Tab.Container defaultActiveKey="Collection">
          <Nav>
            <Nav.Item>
              <Nav.Link eventKey="Collection" className="title-font">
                Collection <sup>{nftUserFullDetail.userNfts.currentNfts.length}</sup>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="Sold" className="title-font">
                Sold <sup>{nftUserFullDetail.userNfts.soldNfts.length}</sup>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="Created" className="title-font">
                Created <sup>{nftUserFullDetail.userNfts.createdNfts.length}</sup>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="Bought" className="title-font">
                Bought <sup>{nftUserFullDetail.userNfts.boughtNfts.length}</sup>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="Collection">
              <Row>
                {nftUserFullDetail.userNfts.currentNfts?.map((item, index) => (
                  <Col xs="12" sm="4">
                    <CreatorCard
                      key="index"
                      title={item.name}
                      titleInfo={item.description}
                      price={item.price}
                      image={item.image}
                      ownerAddress={item.ownerAddress}
                    />
                  </Col>
                ))}
              </Row>
            </Tab.Pane>
            <Tab.Pane eventKey="Sold">
              <Row>
                {nftUserFullDetail.userNfts.soldNfts?.map((item, index) => (
                  <Col xs="12" sm="4">
                    <CreatorCard
                      key="index"
                      title={item.name}
                      titleInfo={item.description}
                      price={item.price}
                      image={item.image}
                      ownerAddress={item.ownerAddress}
                    />
                  </Col>
                ))}
              </Row>
            </Tab.Pane>
            <Tab.Pane eventKey="Created">
              <Row>
                {nftUserFullDetail.userNfts.createdNfts?.map((item, index) => (
                  <Col xs="12" sm="4">
                    <CreatorCard
                      key="index"
                      title={item.name}
                      titleInfo={item.description}
                      price={item.price}
                      image={item.image}
                      ownerAddress={item.ownerAddress}
                    />
                  </Col>
                ))}
              </Row>
            </Tab.Pane>
            <Tab.Pane eventKey="Bought">
              <Row>
                {nftUserFullDetail.userNfts.boughtNfts?.map((item, index) => (
                  <Col xs="12" sm="4">
                    <CreatorCard
                      key="index"
                      title={item.name}
                      titleInfo={item.description}
                      price={item.price}
                      image={item.image}
                      ownerAddress={item.ownerAddress}
                    />
                  </Col>
                ))}
              </Row>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Container>
    </div>
  );
};
export default Detail;
