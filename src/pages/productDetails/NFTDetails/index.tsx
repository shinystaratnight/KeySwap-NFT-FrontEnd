import InfoText from '../../../components/InfoText/index';
import './index.scss';
import { NFTEvent, useGetUserList } from '../../../hooks/useApi';
import moment from 'moment';
import { MONTH_DATE_FULLYEAR_TIME_FORMAT } from 'utils/date-helper';
import { useProfileList } from 'state/hooks';
import { truncateWalletString } from 'utils';
export default function NFTDetails({ history, tokenID }) {
  const { profileList } = useProfileList();

  var sorted_nft_events = history.sort((evt1, evt2) => {
    if (evt1.doneOn > evt2.doneOn) return -1;
    if (evt1.doneOn < evt2.doneOn) return 1;
    return 0;
  });

  var event_list = [];
  for (var i = 0; i < sorted_nft_events.length; i++) {
    let doneOn = sorted_nft_events[i].doneOn;
    let eventType = sorted_nft_events[i].eventType;

    let user_wallet = '';
    let user_image = '';
    let user_name = '';
    let user_verified = false;
    let event_content = '';
    let event_date = moment(doneOn * 1000).fromNow();

    if (eventType === 0) {
      let minter = sorted_nft_events[i].minter;

      let user = null;
      if (profileList) user = profileList.find(user => user.walletAddress === minter);

      user_wallet = minter;
      user_image = user && user.userAvatarUrl ? user.userAvatarUrl : '/img/default-profile.png';
      user_name = user && user.username ? user.username : truncateWalletString(minter);
      user_verified = user && user.verified ? user.verified : false;
      event_content = 'The NFT was minted';
    } else if (eventType === 1) {
      // let seller = sorted_nft_events[i].seller;
      let buyer = sorted_nft_events[i].buyer;
      let nftSoldAtPrice = sorted_nft_events[i].nftSoldAtPrice;

      let user = null;
      if (profileList) user = profileList.find(user => user.walletAddress === buyer);

      user_wallet = buyer;
      user_image = user && user.userAvatarUrl ? user.userAvatarUrl : '/img/default-profile.png';
      user_name = user && user.username ? user.username : truncateWalletString(buyer);
      user_verified = user && user.verified ? user.verified : false;
      event_content = `Bought at ${nftSoldAtPrice} BNB`;
    } else if (eventType === 2) {
      let priceUpdater = sorted_nft_events[i].priceUpdater;
      let newNftPrice = sorted_nft_events[i].newNftPrice;
      // let oldNftPrice = sorted_nft_events[i].oldNftPrice;

      let user = null;
      if (profileList) user = profileList.find(user => user.walletAddress === priceUpdater);

      user_wallet = priceUpdater;
      user_image = user && user.userAvatarUrl ? user.userAvatarUrl : '/img/default-profile.png';
      user_name = user && user.username ? user.username : truncateWalletString(priceUpdater);
      user_verified = user && user.verified ? user.verified : false;
      event_content = `Put on sale for ${newNftPrice} BNB`;
    } else {
      continue;
    }

    event_list.push({
      user_wallet: user_wallet,
      user_image: user_image,
      user_name: user_name,
      user_verified: user_verified,
      event_content: event_content,
      event_date: event_date,
    });
  }

  return (
    <div className="nft-details">
      <div className="nft-details__header">
        <img src="/img/widget-history.svg" />
        <span>NFT History</span>
        <span className="ntf-details__token">Token ID #{tokenID}</span>
      </div>
      <div className="nft-details__list">
        <div className="nft-detail-item header">
          <div className="cols">
            <InfoText>Owner</InfoText>
          </div>
          <div className="cols">
            <InfoText>Event</InfoText>
          </div>
          <div className="cols">
            <InfoText>Date</InfoText>
          </div>
        </div>
        {event_list?.map((event, index) => (
          <div key={index} className="nft-detail-item">
            <div className="cols">
              <img className="profile-image" src={event.user_image} />
              {event.user_name}
            </div>
            <div className="cols">
              <div>{event.event_content}</div>
            </div>
            <div className="cols">
              <div>
                {event.event_date} <img src="/img/table-date.svg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
