import React, { useState, useEffect, useCallback } from "react";
import { Link } from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

import { formatNum, getCurrencyInfo } from "utils";

import * as Element from "./styles";

const ExploreItem = (props) => {

  const { item } = props

  const [auctionStatus, setAuctionStatus] = useState(false)
  const [auctionStatusMessage, setAuctionStatusMessage] = useState('')
  const [state, setState] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const setNewTime = useCallback(() => {
    const currentTimestamp = new Date().getTime()
    let countdownDate = 0;
    if (item.auction.startTime * 1000 > currentTimestamp) {
      setAuctionStatusMessage('Auction has not started')
      setAuctionStatus(false)
    } else if (item.auction.endTime * 1000 > currentTimestamp) {
      setAuctionStatus(true)
      countdownDate = item.auction.endTime * 1000;
      setAuctionStatusMessage('Auction is started')
    } else {
      setAuctionStatusMessage('Auction has ended')
      setAuctionStatus(false)
    }

    if (countdownDate) {
      const distanceToDate = countdownDate - currentTimestamp;

      let days = Math.floor(distanceToDate / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (distanceToDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor(
        (distanceToDate % (1000 * 60 * 60)) / (1000 * 60)
      );
      let seconds = Math.floor((distanceToDate % (1000 * 60)) / 1000);

      const numbersToAddZeroTo = [1, 2, 3, 4, 5, 6, 7, 8, 9];

      if (numbersToAddZeroTo.includes(days)) {
        days = `0${days}`;
      }
      if (numbersToAddZeroTo.includes(hours)) {
        hours = `0${hours}`;
      }
      if (numbersToAddZeroTo.includes(minutes)) {
        minutes = `0${minutes}`;
      }
      if (numbersToAddZeroTo.includes(seconds)) {
        seconds = `0${seconds}`;
      }

      setState({ days: days, hours: hours, minutes: minutes, seconds: seconds });
    }
  }, [item]);

  useEffect(() => {
    if (item?.auction) {
      const timerId = setInterval(() => setNewTime(), 1000);
      return () => clearInterval(timerId);
    }
  }, [item, setNewTime]);

  return (
    <Element.NftItem>
      <Element.NftInner>
        <Element.NftTop>
          <Element.AuthorPart>
            <AvatarGroup max={3}>
              <Avatar alt={item.ownerUser?.name} src={item.ownerUser?.profilePic} />
            </AvatarGroup>
            <Link to={`/profile/${item?.ownerUser.address}`}>{item.ownerUser?.name}</Link>
          </Element.AuthorPart>
        </Element.NftTop>
        <Element.NftBottom>
          <Element.NftThumb>
            <Element.NftThumbImg loading='lazy' alt='NFT Item' src={item.image} />
            {
              item.auction && (
                auctionStatus ? (
                  <Element.NftTime>
                    <Element.ClockIcon />
                    <Element.TimeLabel>{`${state.days || '00'}:${state.hours || '00'}:${state.minutes || '00'}:${state.seconds || '00'}`}</Element.TimeLabel>
                  </Element.NftTime>
                ) : (
                  auctionStatusMessage && (
                    <Element.NftTime>
                      <Element.TimeLabel>{auctionStatusMessage}</Element.TimeLabel>
                    </Element.NftTime>
                  )
                )
              )
            }
          </Element.NftThumb>
          <Element.NftContent>
            <Element.NftTitle to={`/detail/${item.itemCollection}/${item.tokenId}`}>
              {item.name}
            </Element.NftTitle>
            <Element.PriceLike>
              {
                item.auction && (
                  <Element.NftPrice>
                    Current Bid:&nbsp;
                    <span>{formatNum(item.auction.price)} {getCurrencyInfo(item.auction.tokenAdr)?.symbol}</span>
                  </Element.NftPrice>
                )
              }
              {
                item.pair && (
                  <Element.NftPrice>
                    Price:&nbsp;
                    <span>{formatNum(item.pair.price)} {getCurrencyInfo(item.pair.tokenAdr)?.symbol}</span>
                  </Element.NftPrice>
                )
              }
              <Element.NftLike>
                <Element.HeartIcon />
                &nbsp;{item.likeCount}
              </Element.NftLike>
            </Element.PriceLike>
          </Element.NftContent>
        </Element.NftBottom>
      </Element.NftInner>
    </Element.NftItem>
  )
}

export default ExploreItem
