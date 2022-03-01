import CreatorCard2 from '../../components/cards/creator/CreatorCard2';
import './Creator.scss';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { CreatorObj } from '../../Type';
import CreatorJson from './creators.json';
import { useHistory } from 'react-router';
import { useGetNFTTopArtists } from 'hooks/useApi';
import { truncateWalletString } from 'utils';
import { PageBG } from 'components/page-bg';

const Creator = () => {
  const location = useHistory();

  const topArtistList = useGetNFTTopArtists();

  return (
    <>
      <PageBG />
      <Container className="creator-page">
        <h1 className="header-text title-font">Creators</h1>
        <Row>
          {topArtistList?.map((obj, index) => (
            <Col key={index} xs="12" sm="4">
              <CreatorCard2
                image={obj.user.userBackgroupUrl}
                userIcon={obj.user.userAvatarUrl}
                userName={obj.user.username || truncateWalletString(obj.user.walletAddress)}
                subTitle={obj.user.userBio}
                previewList={[
                  obj.createdNFTs[1] && obj.createdNFTs[1].image,
                  (obj.createdNFTs[0] && obj.createdNFTs[0].image) || '',
                  (obj.createdNFTs[2] && obj.createdNFTs[2].image) || '',
                ]}
                onClick={() => location.push({ pathname: `/creatorDetail/${obj.user.walletAddress}`, state: obj })}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Creator;
