import { useEffect, useState } from 'react';
import { Col, Container, Image, Nav, Row, Tab, Tabs } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router';
import { Button } from '../../../components/button/Button';
import CreatorCard from '../../../components/cards/creator/CreatorCard';
import CreatorCard2 from '../../../components/cards/creator/CreatorCard2';
import HomeCard from '../../../components/cards/home/HomeCard';
import ProfileImage from '../../../components/profile/ProfileImage';
import SocialButtons from '../../../components/socialButtons';
import { CreatorObj, CreatorObj2 } from '../../../Type';
import './Edit.scss';
import createdJson from '../created.json';
import likedJson from '../liked.json';
import onSaleJson from '../on-sale.json';
import InfoText from '../../../components/InfoText/index';
import Input from '../../../components/Input';
import { useForm } from 'react-hook-form';
import API from '../../../utils/api';
import FileUpload from 'components/FileUpload';
import FileInput from 'components/Input/file';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { useProfile } from 'state/hooks';
import { truncateWalletString } from 'utils';
import toast from 'react-hot-toast';
import { getIpfsHashFromFile } from 'utils/ipfs';

export default function Edit() {
  const history = useHistory();
  let data = useLocation().state;

  const [loginStatus, setLoginStatus] = useState(false);
  const { connector, library, chainId, account, active } = useWeb3React<Web3Provider>();

  const { profile } = useProfile();

  const Socials = [
    { label: 'Website', icon: '/img/earth.svg', value: profile && profile.websiteUrl },
    { label: 'Twitter', icon: '/img/twitter.svg', value: profile && profile.twitterUrl },
    { label: 'Instagram', icon: '/img/instagram.svg', value: profile && profile.instagramUrl },
    { label: 'Telegram', icon: '/img/telegram.svg', value: profile && profile.telegramUrl },
    { label: 'Discord', icon: '/img/discord.svg', value: profile && profile.discordUrl },
    { label: 'Youtube', icon: '/img/youtube.svg', value: profile && profile.youtubeUrl },
    { label: 'Facebook', icon: '/img/facebook.svg', value: profile && profile.facebookUrl },
    { label: 'TikTok', icon: '/img/tiktok.svg', value: profile && profile.tiktokUrl },
    { label: 'Dribbble', icon: '/img/dribbble.svg', value: profile && profile.dribbleUrl },
    { label: 'Behance', icon: '/img/behance.svg', value: profile && profile.behanceUrl },
  ];

  useEffect(() => {
    const isLoggedin = account && active && chainId === parseInt(process.env.REACT_APP_NETWORK_ID, 10);
    setLoginStatus(isLoggedin);
  }, [connector, library, account, active, chainId]);

  const [loading, setLoading] = useState<boolean>(false);

  const { register, handleSubmit } = useForm();

  const [avatarImage, setAvatarImage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);

  const onBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files.length) {
      setBackgroundImage(e.target.files[0]);
    }
  };

  const onUserAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files.length) {
      setAvatarImage(e.target.files[0]);
    }
  };

  const onSubmit = async data => {
    console.log(data);
    if (!profile) {
      toast.error('Profile Update Failed!');
      return;
    }

    if (!loginStatus) {
      toast.error('Please connect Metamask Correctly!');
      return;
    }

    try {
      setLoading(true);

      var user_avatar_url = profile.userAvatarUrl;
      var user_background_url = profile.userBackgroupUrl;

      if (avatarImage) {
        const hash = await getIpfsHashFromFile(avatarImage);
        user_avatar_url = `https://keyswap.mypinata.cloud/ipfs/${hash}`;
      }

      if (backgroundImage) {
        const hash = await getIpfsHashFromFile(backgroundImage);
        user_background_url = `https://keyswap.mypinata.cloud/ipfs/${hash}`;
      }

      data.wallet_address = profile.walletAddress;
      data.social_url = '';
      data.user_avatar_url = user_avatar_url;
      data.user_background_url = user_background_url;

      console.log(data);
      API.post('/update_nft_user_profile', data)
        .then(res => {
          console.log(res);
          toast.success('Your Profile Updated!');
        })
        .catch(error => {
          toast.error('Profile Update Failed!');
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      toast.error('Profile Update Failed!');
    }
  };

  return (
    <div className="creator-edit">
      <Row className="banner justify-content-center">
        <FileInput
          label="Edit"
          defaultImage={profile && profile.userBackgroupUrl}
          dispalyImage={true}
          info="We recommend to upload images in 1920 x 300 resolution"
          onChange={onBannerChange}
        />
      </Row>
      <Container>
        <div className="user-block">
          <ProfileImage img={profile && profile.userAvatarUrl} edit onChange={onUserAvatarChange} verified />
          <InfoText variant="secondary" size="sm">
            We recommend an image at least 120 X 120 resolution
          </InfoText>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col sm="5">
                <Row>
                  <Col xs="auto">
                    <h4 className="truncate">
                      {profile && (profile.username || truncateWalletString(profile.walletAddress))}
                    </h4>
                  </Col>
                  <Col xs="auto">
                    <a href="#" className="nav-share-link">
                      <Image className="lang" src="/img/share-icon.svg" />
                    </a>
                  </Col>
                </Row>
                <InfoText variant="primary" size="sm">
                  {profile && profile.userBio}
                </InfoText>
                <SocialButtons />
              </Col>
              <Col sm="7" className="mt-5 mt-sm-0">
                <Input name="username" label="Display Name" register={register} required={true} />
                <InfoText size="md" className="mb-1 mt-3 text-left" variant="primary">
                  Add Bio
                </InfoText>
                <textarea {...register('user_bio', { required: false })} />

                <div className="socials">
                  <InfoText variant="primary" className="details mt-5">
                    Add links to your social media profile
                  </InfoText>
                  {Socials.map((social, index) => (
                    <Row key={index} className="align-items-center mb-3">
                      <Col xs="auto" className="mb-1">
                        <img className="svg-img" src={social.icon} />
                      </Col>
                      <Col xs="auto" className="pl-0 mb-1">
                        <InfoText size="md" variant="primary" className="m-0">
                          {social.label}
                        </InfoText>
                      </Col>
                      <Col xs="12">
                        <Input name={social.label} placeholder={social.value} register={register} />
                      </Col>
                    </Row>
                  ))}
                </div>
                <Col className="text-center submit">
                  <Button isLoading={loading} type="submit" variant="primary" label="Save Changes" />
                </Col>
              </Col>
            </Row>
            <Row></Row>
          </form>
        </div>
      </Container>
    </div>
  );
}
function success(res: any): Function {
  throw new Error('Function not implemented.');
}
