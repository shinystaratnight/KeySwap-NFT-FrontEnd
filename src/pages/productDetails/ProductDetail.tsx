import { Col, Container, Row } from 'react-bootstrap';
import './ProductDetail.scss';
import { ProductDetailHeader } from './ProductDetailHeader/index';
import NFTDetails from './NFTDetails';
import Arts from './Arts.json';
import ArtCard from './ArtCard';
import { Button } from '../../components/button/Button';
import ProfileImage from '../../components/profile/ProfileImage';
import InfoText from '../../components/InfoText';
import { renderCategoryHeader } from '../home/Categories/index';
import { Link, RouteComponentProps, useHistory } from 'react-router-dom';
import { NFTDetail, useGetNFTDetail } from 'hooks/useApi';
import { getContractInfo, truncateWalletString } from '../../utils/index';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { PageBG } from 'components/page-bg';

export const ProductDetails = ({
  match: {
    params: { tokenId },
  },
}: RouteComponentProps<{ tokenId: string }>) => {
  const history = useHistory();
  const nftDetail: NFTDetail = useGetNFTDetail(tokenId);

  if (!nftDetail) {
    return <></>;
  }

  function goToCreatorProfile() {
    history.push(`/creatorDetail/${nftDetail.creator.walletAddress}`);
  }

  return (
    <div className="pd">
      <PageBG />
      <Container className="product-details">
        <ProductDetailHeader
          name={nftDetail?.nft.name}
          description={nftDetail?.nft.description}
          image={nftDetail?.nft.image}
          price={nftDetail?.nft.price}
          ownerAddress={nftDetail?.nft.ownerAddress}
          tokenID={nftDetail?.nft.tokenID}
          listed={nftDetail?.nft.listed}
        />
        <NFTDetails history={nftDetail.historyEvents} tokenID={nftDetail?.nft.tokenID} />
        <Row className="creator-header-block">
          <Col className="text-center text-md-left mb-4 mb-md-0">
            <h2>
              <img src="/img/creator-pen.svg" /> Creator
            </h2>
          </Col>
          <Col sm="auto" className="text-center text-md-right">
            <InfoText>Proof of Authenticity:</InfoText>
          </Col>
          <Col sm="auto" className="text-center text-md-right py-2 py-sm-0">
            <a
              className="mr-3"
              href={`https://bscscan.com/token/0x11110314DC52400654551F7d21c18aF79aD259A2?a=${nftDetail?.nft.tokenID}`}
              target="_blank"
            >
              <img src="/img/BSCscan.svg" /> BSCscan
            </a>
            <a href={nftDetail?.nft.image} target="_blank">
              <img src="/img/ipfs.svg" /> IPFS
            </a>
          </Col>
          <Col sm="auto" className="text-right py-2 py-sm-0"></Col>
        </Row>
        <Row className="creator-body-block">
          <Col xs="auto">
            <ProfileImage img={nftDetail.creator ? nftDetail.creator.userAvatarUrl : '/img/default-profile.png'} />
          </Col>
          <Col xs="12" sm="10">
            <h2 className="title-font">
              {nftDetail.creator &&
                (nftDetail.creator.username || truncateWalletString(nftDetail.creator.walletAddress))}
            </h2>
            <InfoText variant="secondary">{nftDetail.creator.userBio}</InfoText>
          </Col>
        </Row>
        {/* <div className="product-details__arts">
        {Arts.map((art, index) => (
          <ArtCard key={index} title={art.title} image={art.image} />
        ))}
      </div> */}
        <div className="product-details__bottom">
          <div className="text-center">
            <Button variant="primary" label="View all Work By KeySwap" onClick={goToCreatorProfile} />
          </div>
        </div>
      </Container>
    </div>
  );
};
