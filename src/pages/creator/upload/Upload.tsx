import FileInput from 'components/Input/file';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { useState } from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useProfile } from 'state/hooks';
import { getIpfsHash, getIpfsHashFromFile } from 'utils/ipfs';
import { Button } from '../../../components/button/Button';
import FileUpload from '../../../components/FileUpload';
import InfoText from '../../../components/InfoText';
import Input from '../../../components/Input';
import './Upload.scss';
import API from '../../../utils/api';
import { ethers } from 'ethers';
import { mint } from 'utils/contracts';
import { useHistory } from 'react-router-dom';
import { PageBG } from 'components/page-bg';

function Upload() {
  const history = useHistory();

  const { library, chainId, account } = useWeb3React<Web3Provider>();
  const { profile } = useProfile();
  const [nftImage, setNFTImage] = useState(null);
  const [nftName, setNFTName] = useState('');
  const [nftDecription, setNFTDecription] = useState('');
  const [nftPrice, setNFTPrice] = useState('');
  const [isLoading, setLoadingStatus] = useState(false);

  const onChangeFile = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setNFTImage(e.target.files[0]);
    }
  };

  const onChangeNFTName = value => {
    console.log(value);
    setNFTName(value);
  };

  const onChangeNFTDescription = (e: any) => {
    setNFTDecription(e.target.value);
  };

  const onChangeNFTPrice = value => {
    setNFTPrice(value);
  };

  const submitAsset = async () => {
    if (!nftImage) {
      toast.error('Please select the Artwork!');
      return;
    }

    if (!account || !library) {
      toast.error('Please connect your wallet correctly!');
      return;
    }

    if (!profile) {
      toast.error('Please login correctly!');
      return;
    }

    setLoadingStatus(true);
    const load_toast_id = toast.loading('Please wait...');

    try {
      let hash = await getIpfsHashFromFile(nftImage);
      const image_url = `https://keyswap.mypinata.cloud/ipfs/${hash}`;

      let metaData: any = {};

      metaData = {
        name: nftName,
        description: nftDecription,
        image: image_url,
        attributes: [],
      };

      const nft_unit_price = ethers.utils.parseEther(nftPrice);

      const metaDataHash = await getIpfsHash(metaData);
      const tokenURI = `https://keyswap.mypinata.cloud/ipfs/${metaDataHash}`;

      const txhash = await mint(chainId, library.getSigner(), account, tokenURI, nft_unit_price);

      if (txhash !== false) {
        toast.success('NFT Product is created successfully!');
        setTimeout(async () => {
          await API.get('/sync_block');
          history.push('/');
        }, 3000);
      } else {
        toast.error('NFT Create Failed!');
      }

    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoadingStatus(false);
      toast.dismiss(load_toast_id);
    }
  };

  return (
    <>
      <PageBG />
      <div className="upload">
        <Row className="m-0 container header">
          <Col className="text-center p-0">
            <h1 className="title-font">Create Collectible</h1>
            <InfoText variant="secondary">
              We do not own your private keys and cannot access your funds without your confirmation.
            </InfoText>
          </Col>
        </Row>
        <div className="upload__form">
          <div className="file-container">
            <FileInput
              label="Choose File"
              dispalyImage
              info="PNG, GIF, JPEG, JPG (MAX 8 mb)"
              onChange={onChangeFile}
              defaultImage={nftImage && URL.createObjectURL(nftImage)}
            />
          </div>
          <form>
            <Input placeholder="NFT Name" label="" name="nft_name" onChange={onChangeNFTName} />
            <textarea
              placeholder="NFT Description (max: 300 characters)"
              name="nft_description"
              onChange={onChangeNFTDescription}
            />
            <Input
              type="number"
              placeholder="NFT Price"
              label=""
              name="nft_price"
              postfix="BNB"
              onChange={onChangeNFTPrice}
            />
          </form>
          <div className="fee">
            {/* <Row>
        <Col xl="6" lg="12" sm="12" className="text-left">
          <InfoText>Service Fee</InfoText>
        </Col>
        <Col xl="6" lg="12" sm="12" className="text-right">
          <InfoText>2.5%</InfoText>
        </Col>
      </Row>
      <Row>
        <Col xl="6" lg="12" sm="12" className="text-left">
          <InfoText>You will receive</InfoText>
        </Col>
        <Col xl="6" lg="12" sm="12"></Col>
      </Row> */}
          </div>
          <Row className="submit">
            <Col className="text-center">
              {/* setting `isLoading` true here for demo only, In Real it will be populated based on API call/reponse */}
              <Button label=" Approve" variant="primary" isLoading={isLoading} onClick={submitAsset} />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default Upload;
