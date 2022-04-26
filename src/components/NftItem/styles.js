import styled from 'styled-components';
import { Link } from 'react-router-dom'

import { HeartFill } from '@styled-icons/bootstrap/HeartFill'
import { Flickr } from '@styled-icons/boxicons-logos/Flickr'
import { ClockFill } from '@styled-icons/bootstrap/ClockFill'

export const NftItem = styled.div`
  margin-bottom: 35px;
  position: relative;
`
export const NftInner = styled.div`
  transition: all .3s ease;
  background-color: var(--bgcolorMaroon);
  padding-inline: 20px;
  padding: 40px 20px 35px;
  box-shadow: 0 2px 5px rgb(3 0 16 / 20%);
  border-radius: 5px;
  border: 1px solid transparent;
  text-align: center!important;

  &:before {
    position: absolute;
    content: "";
    width: 90%;
    height: 90%;
    background: var(--bgcolorMaroon);
    border: 1px solid rgba(255,255,255,.04);
    box-shadow: 0 2px 5px rgb(3 0 16 / 20%);
    bottom: -12px;
    left: 50%;
    z-index: -1;
    transform: translateX(-50%);
    transition: all .3s ease;
    border-radius: 3px;
  }

  &:after {
    position: absolute;
    content: "";
    width: 80%;
    height: 80%;
    background: var(--bgcolorMaroon);
    border: 1px solid rgba(255,255,255,.04);
    box-shadow: 0 2px 5px rgb(3 0 16 / 20%);
    bottom: -22px;
    left: 50%;
    z-index: -2;
    transform: translateX(-50%);
    transition: all .3s ease;
    border-radius: 3px;
  }

  &:hover {
    transform: translateY(10px);
    box-shadow: none;

    &:after, &:before {
      opacity: 0;
      bottom: 0;
      visibility: hidden;
    }
  }
`

export const NftBottom = styled.div`

`
export const NftThumb = styled.div`
  margin-bottom: 20px;
  position: relative;  
`
export const NftThumbImg = styled.img`
  border-radius: 5px;
  width: 100%;
  max-width: 100%;
  height: auto;
`
export const NftContent = styled.div`
  padding-inline: 10px;
`
export const NftTitle = styled(Link)`
  color: #000;
  font-size: calc(1.275rem + 0.3vw);
  font-weight: 700;
  transition: all .3s ease;
  overflow: hidden;
  display: -webkit-box;
  text-overflow: ellipsis;
  white-space: unset;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  @media (min-width: 1200px) {
    font-size: 1.5rem;
  }
  &:hover {
    color: var(--colorMaroon);
  }
`
export const PriceLike = styled.div`
  align-items: center;
  justify-content: space-between;
  display: flex;
`
export const NftPrice = styled.p`
  color: #555;
  font-size: 14px;
  margin-bottom: 0;
  margin-top: 0;
  font-family: Roboto;
  span {
    color: var(--colorMaroon);
  }
`
export const NftLike = styled.span`
  color: #555;
  font-family: Roboto;
  font-size: 1rem;
`
export const HeartIcon = styled(HeartFill)`
  width: 14px;
  height: 14px;
  color: #555;
`
export const NftTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
export const AuthorPart = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  & > a {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
    color: #000;
    font-size: 1.125rem;
    margin-left: 10px;
  }
  & .MuiAvatarGroup-root {
    position: relative;
    &::after {
      content: "✓";      
      font-weight: 400;
      color: #fff;
      font-size: 9px;
      right: 0;
      bottom: 0;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background: #3d8fff;
      text-align: center;
      border: 1px solid #030010;
      line-height: 1.1;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2;
    }
  }
`
export const DetailBtn = styled(Flickr)`
  width: 18px;
  height: 18px;
  color: #555;
  cursor: pointer;
  margin-bottom: 15px;
`
export const ClockIcon = styled(ClockFill)`
  width: 12px;
  height: 12px;
  margin-right: 4px;
`
export const NftTime = styled.div`
  position: absolute;
  bottom: 12px;
  left: 12px;
  text-align: left;
  border: 1px solid #eee;
  background-color: #fff;
  color: #222;
  border-radius: 6px 6px;
  height: 30px;
  padding: 0 8px;
  display: flex;
  align-items: center;
`
export const TimeLabel = styled.span`
  color: #222;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.5px;
  line-height: 1;
`
