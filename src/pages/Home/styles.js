import styled from 'styled-components';
import {Search} from "@styled-icons/material/Search";
import {FilterAlt} from "@styled-icons/material/FilterAlt";
import {PlayCircleOutline} from "@styled-icons/material";
import {Image} from "@styled-icons/material/Image";
import {Heart} from "@styled-icons/feather/Heart";
import {Circle} from "@styled-icons/fa-regular/Circle";
import {DotCircle} from "@styled-icons/fa-regular/DotCircle"
import {Close} from "@styled-icons/material/Close";
import {MusicNote} from "@styled-icons/material/MusicNote";
import {Heart as HeartFill} from "@styled-icons/fa-solid/Heart";

// export const Heading = styled.div `
//     background
// `;

export const HomePageWrapper = styled.div`
    position: relative;

    .section-header {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        border: 1px solid var(--colorMaroon);
        padding: 15px 15px;
        gap: 20px;
        border-radius: 3px;
        box-shadow: none;
        background-color: var(--bgcolorMaroon);
        margin-top: 100px;
        margin-bottom: 30px;

        .header-title {
            gap: 10px;
        }

        h3 {
            color: #000;
            margin: 0;
            text-transform: uppercase;
            font-weight: 700;
            line-height: 1.2;
            font-size: calc(1.125rem + 0.75vw);
            
            @media (min-width: 1200px) {
                font-size: 1.375rem;
            }
        }

        @media (min-width: 992px) {
            padding: 15px 25px;
        }
    }

    .nft-item {
        position: relative;
        margin-bottom: 35px;
        transition: all .3s ease;

        .nft-inner {
            background-color: var(--bgcolorMaroon);
            padding-inline: 20px;
            padding: 40px 20px 35px;
            box-shadow: 0 2px 5px rgb(3 0 16 / 20%);
            border-radius: 5px;
            border: 1px solid transparent;
            text-align: center!important;
        }

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

        .nft-thumb {
            margin-bottom: 30px;
        }

        .nft-content {
            text-align: center;
            
            h4 {
                font-size: calc(1.275rem + 0.3vw);
                font-weight: 700;
                margin: 0 0 15px;
                
                @media (min-width: 1200px) {
                    font-size: 1.2rem;
                }
            }

            p {
                color: #555;
            }
        }
    }
`;

export const HomeBanner = styled.div`
    padding: 100px 0;
    background-color: rgb(255, 255, 255);
    background-image: url(/images/main-bg.png);
    background-size: cover;
    background-repeat: no-repeat;

    .banner-buttons {
        padding: 50px 0;

        .header-button {
            background: var(--colorMaroon);
            padding: 12px 30px;
            border: 1px solid var(--colorMaroon);
            display: inline-block;
            border-radius: 100px;
            color: #fff;
            cursor: pointer;
            -webkit-transition: all 0.3s;
            transition: all .3s ease;
            font-weight: bold;
            position: relative;
            &:hover {
                color: #040b29;
                transform: translateY(-3px);
            }
        }
        .button-create {
            margin-left: 20px;
            background: #fff;
            border: 1px solid var(--colorMaroon);
            color: var(--colorMaroon);
        }
    }

    .theme-color {
        color: var(--colorMaroon);
    }
`;

export const AuctionSection = styled.div`
    .header-title {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 10px;

        .live-icon {
            position: relative;
            background: var(--colorMaroon);
            width: 30px;
            height: 15px;
            border-radius: 2px;

            svg {
                path {
                    @keyframes wave {
                        25% {
                            fill: transparent;
                        }
                    }
                    animation: wave 2s infinite;
                    &:nth-child(1) {
                        animation-delay: -0.35s;
                    }
                    &:nth-child(2) {
                        animation-delay: -0.25s;
                    }
                    &:nth-child(3) {
                        animation-delay: -0.15s;
                    }
                }
                position: absolute;
                content: "";
                width: 18px;
                height: 18px;
                fill: var(--colorMaroon);
                top: -100%;
                left: 50%;
                transform: translateX(-50%);
            }
        }
    }

    .header-content {
        .auction-nav {
            width: 85px;
            display: flex;
            justify-content: space-between;
        }

        .live-auction-prev, .live-auction-next,
        .fav-auction-prev, .fav-auction-next {
            width: 40px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            line-height: 40px;
            border-radius: 50%;
            background: rgb(255,255,255);
            font-size: 20px;
            transition: all .3s ease;
            cursor: pointer;
        }
    }
`;

export const ProcessSection = styled.div`
    .header-title {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 10px;
    }
`;

export const SponsorSection = styled.div`
    .header-title {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 10px;
    }
    .sponsor-wrapper {
        border: 1px solid rgba(255,255,255,.1);
        box-shadow: 0 2px 5px rgb(3 0 16 / 20%);
        padding: 1.5rem 20px;
        margin-bottom: 90px;

        .sponsor-img {
            display: block;
            margin: 1.5rem 0;
        }
    }
`;

export const BannerImage = styled.div `
    animation: floating 5s linear infinite;

    @keyframes floating {
        0% { transform: translate(0,  0px); }
        50%  { transform: translate(0, 15px); }
        100%   { transform: translate(0, 0px); }
    }
`;

// clean end
export const Header = styled.div`
   height: 200px;
    position: relative;
    @media (min-width: 768px){
        height: 500px;
    }
    
    img{
        width: 200px;
        height: 200px;
        border-radius: 8px;
        box-shadow: rgb(0 0 0 / 15%) 2px 2px 0px;
    }
    @media (min-width: 768px){
     img{
            width: 500px;
            height: 500px;
        }
    }
    .slider_index_0{
        left: 10%;
        position: absolute;
       @media (min-width: 768px){
            left: 0;
        }
    }
    .slider_index_1{
        left: 18%;
        position: absolute;
        @media (min-width: 768px){
            left: 15%;
        }
    }
    .slider_index_2{
        left: 26%;
        position: absolute;
        @media (min-width: 768px){
            left: 30%;
        }
    }
    .slider_index_3{
        left: 34%;
        position: absolute;
        @media (min-width: 768px){
            left: 45%;
        }
    }
    .slider_index_4{
        left: 40%;
        position: absolute;
        @media (min-width: 768px){
            left: 60%;
        }
    }
    .slider_0{
        transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1);
        z-index: 5;
        position: absolute;
    }
    .slider_1{
        transform: translate3d(20px, 0px, 0px) scale3d(0.9, 0.9, 1);
        z-index: 4;
        .backCover{
            background: linear-gradient(rgba(255, 255, 255, 0.16) 50%, rgba(255, 255, 255, 0.5) 100%);
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
        }
    }
    .slider_1-1{
        transform: translate3d(-20px, 0px, 0px) scale3d(0.9, 0.9, 1);
        z-index: 4;
        .backCover{
            background: linear-gradient(rgba(255, 255, 255, 0.16) 50%, rgba(255, 255, 255, 0.5) 100%);
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
        }
    }
     .slider_2{
        transform: translate3d(40px, 0px, 0px) scale3d(0.8, 0.8, 1);
        z-index: 3;
        .backCover{
           background: linear-gradient(rgba(255, 255, 255, 0.16) 50%, rgba(255, 255, 255, 0.5) 100%);
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
        }
    }
     .slider_2-1{
        transform: translate3d(-40px, 0px, 0px) scale3d(0.8, 0.8, 1);
        z-index: 3;
        .backCover{
           background: linear-gradient(rgba(255, 255, 255, 0.16) 50%, rgba(255, 255, 255, 0.5) 100%);
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
        }
    }
     .slider_3{
        transform: translate3d(60px, 0px, 0px) scale3d(0.7, 0.7, 1);
        z-index: 2;
        .backCover{
           background: linear-gradient(rgba(255, 255, 255, 0.16) 50%, rgba(255, 255, 255, 0.5) 100%);
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
        }
    }
     .slider_3-1{
        transform: translate3d(-60px, 0px, 0px) scale3d(0.7, 0.7, 1);
        z-index: 2;
        .backCover{
           background: linear-gradient(rgba(255, 255, 255, 0.16) 50%, rgba(255, 255, 255, 0.5) 100%);
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
        }
    }
     .slider_4{
        transform: translate3d(80px, 0px, 0px) scale3d(0.6, 0.6, 1);
        z-index: 1;
        .backCover{
            background: linear-gradient(rgba(255, 255, 255, 0.16) 50%, rgba(255, 255, 255, 0.5) 100%);
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
        }
    }
     .slider_4-1{
        transform: translate3d(-80px, 0px, 0px) scale3d(0.6, 0.6, 1);
        z-index: 1;
        .backCover{
            background: linear-gradient(rgba(255, 255, 255, 0.16) 50%, rgba(255, 255, 255, 0.5) 100%);
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
        }
    }
   
`;

export const SlideContainer = styled.div`
    cursor: pointer;
    position: relative;
    transform-origin: 50% 50% 0px;
    transition: transform 500ms cubic-bezier(0.19, 1, 0.22, 1) 0s;
`;

export const SlideInfo = styled.div`
    position: absolute;
    bottom: 4px;
    left: 0;
    width: 100%;
    .title{
        color: white;
        font-size: 28px;
        font-weight: bold;
        padding: 0 8px;
    }
    .bottomInfo{
        padding: 4px 8px;
        .createName{
            color: white;
        }
        .bidTimeContainer{
            display: flex;
            align-items: center;
            justify-content: flex-end;
            color: white;
            .bidTime{
                background: black;
                padding: 4px;
                border-radius: 4px;
            }
        }
    }
        
  @media (min-width: 768px){
    bottom: 20px;
    .title{
       font-size: 20px;
        padding: 0 8px;
    }
    .bottomInfo{
        padding: 8px 12px;
       display: flex;
       justify-content: space-between;
       .bideTime{
            text-align: right;
       }
   }
  }
`;

export const Filter = styled.div`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    position: relative;
    padding: 0 20px;
  @media (min-width: 768px){
    display flex;
  }
`;

export const FilterLeft = styled.div`
    display: block;
    align-items: center;
    margin-top: 8px;
  @media (min-width: 480px){
    display flex;
  }
`;

export const FilterRight = styled.div`
    display: block;
    align-items: center;
     margin-top: 8px;
   @media (min-width: 480px){
    display flex;
  }
`;

export const FilterBtn = styled.div`
    display: flex;
    align-items: center;
    border: solid 1px grey;
    padding: 4px 12px;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 4px;
`;

export const FilterAltIcon = styled(FilterAlt)`

`;

export const DropDownMenus = styled.div`
    background: white;
    color: var(--colorMaroon);
    width: 100%;
    position: absolute;
    bottom: -140px;
    box-shadow: rgb(0 0 0 / 10%) 0px 0px 15px;
    z-index: 99;    
`;

export const DropDownMenu = styled.div`
    padding 12px 24px;
    cursor: pointer;
    display: flex;
    font-size: 14px;
    align-items: center;
    &:hover {
        background-color: #e3e3e3;
    }
`;



export const Categories = styled.div`
    display: flex;
    align-items: center;
    margin-top: 4px;
   @media (min-width: 480px){
    margin-left: 2rem;
  }
`;

export const Category = styled.div`
    margin: 0 8px;
    cursor: pointer;
    &.active{
        color: #c99400;
    }
`;

export const SearchContainer = styled.div`
    border: solid 1px grey;
    padding: 4px 12px;
    border-radius: 4px;
    margin-top: 4px;
    display: flex;
`;

export const SearchIcon = styled(Search)`
    
`;

export const SearchInput = styled.input`
    border: unset;
    flex-grow: 1;
    &:focus-visible{
        outline: unset;
    }
`;

export const FilterContent = styled.div`
    position: absolute;
    background-color: white;
    top: 60px;
    width: 100%;
    z-index: 999;
    padding: 20px 0px;
`;

export const FilterCategoryContainer = styled.div`
    display: flex;
    margin-top: 8px;
`;

export const FilterLabel = styled.div`
    padding: 4px;
`;

export const FilterCategories = styled.div`
     display: flex;
     flex-wrap: wrap;
`;

export const FilterClearAll = styled.div`
    margin-left: 20px;
    padding-top: 4px;
    text-decoration: underline;
    color: #c99400;
    cursor: pointer;
`;

export const FilterCategory = styled.div`
    color: grey;
    padding: 4px 12px;
    margin-left: 12px;
    cursor: pointer;
    &.active {
        color: #c99400;
        background: #f5f5f5;
        font-weight: 500;
    }
    
`;

export const FilterFooter = styled.div`
     display: block;
     justify-content: space-between;
     align-items: center;
    @media (min-width: 768px){
        display: flex;
    }
`;

export const FilterCurrencyContainer = styled.div`
     display: flex;
`;

export const FilterActionBtn = styled.div`
    background-image: linear-gradient(180deg,#F8D12F 0%,var(--colorMaroon); 100%);
    padding: 8px 36px;
    font-size: 20px;
    margin-right: 80px;
    border-radius: 4px;
    cursor: pointer;
    width: 48px;
    text-align: center;
`;

export const FilterCurrencies = styled.div`
     display: flex;
`;

export const CurrencyPrices = styled.div`
     display: flex;
     align-items: center;
     margin-left: 20px;
`;

export const CurrencyInputContainer = styled.div`
    border: 1px solid transparent;
    border-color: #EAECEF;
    border-radius: 4px;
`;

export const CurrencyInput = styled.input`
    color: #1E2329;
    padding: 4px;
    font-size: 14px;
    width: 136px;
    outline: none;
    border: none;
    border-color: #EAECEF;
    &::-webkit-inner-spin-button, &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

export const CurrencyInputDivider = styled.div`
    margin-right: 11px;
    margin-left: 11px;
`;

export const FilterCurrency = styled.div`
    color: grey;
    padding: 4px 12px;
    margin-left: 12px;
    display: flex;
    align-items: center;
    cursor: pointer;
     &.active {
        color: var(--colorMaroon);;
        font-weight: 500;
    }
`;

export const CircleIcon = styled(Circle)`
    margin-right: 4px;
`;

export const DotCircleIcon = styled(DotCircle)`
    margin-right: 4px
`;

export const FilterString = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 40px;
    padding: 10px;
`;

export const FilterStringItem = styled.div`
    display: flex;
    align-items: center;
    margin-right: 16px;
    margin-top: 8px;
          
    label{
        margin-right: 8px;
    }
`;

export const FilterValues = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  margin-top: 4px;
`;

export const FilterValue = styled.div`
    display: flex;
    align-items: center;
    margin-right: 8px;
    color: grey;
    font-size: 14px;
`;

export const RemoveIcon = styled(Close)`
    background: grey;
    border-radius: 8px;
    color: white;
    padding: 2px;
    margin-left: 4px;
`;


export const Nfts = styled.div`
    display: flex;
    margin-top: 40px;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
`;

export const NftContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px 16px 36px 16px;
    margin: 16px 10px;
    border-radius: 8px;
    cursor: pointer;
    &:hover {
        box-shadow: rgb(0 0 0 / 10%) 0px 0px 15px;
    }
`;

export const NftImageContainer = styled.div`
    position: relative;
`;

export const NftImage = styled.img`
    border-radius: 8px;
    width: 248px;
    height: 248px;
`;

export const NftType = styled.div`
    background: black;
    padding: 4px;
    border-radius: 4px;
    position: absolute;
    left: 16px;
    top: 16px;
`;

export const VideoIcon = styled(PlayCircleOutline)`

`;

export const ImageIcon = styled(Image)`

`;

export const AudioIcon = styled(MusicNote)`

`;

export const BidTime = styled.div`
    background: black;
    padding: 4px;
    border-radius: 4px;
    position: absolute;
    right: 16px;
    top: 18px;
    color: white;
    font-size: 12px;
`;

export const Favourites = styled.div`
    background: black;
    padding: 4px;
    border-radius: 4px;
    position: absolute;
    right: 16px;
    bottom: 16px;
    color: white;
    font-size: 12px;
    display: flex;
    align-items: center;
`;

export const LoveFillIcon = styled(HeartFill)`
    color: var(--colorMaroon);;
`;

export const LoveIcon = styled(Heart)`

`;


export const FavouritesCount = styled.div`
    margin-left: 4px;
`;

export const NftTitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 8px;
`;

export const NftTitle = styled.div`
    font-size: 20px;
    font-weight: bold;
`;

export const NftNetwork = styled.div`
    padding: 4px 8px;
    background: #d1d1d1;
    color: black;
    font-size: 12px;
    border-radius: 4px;
`;


export const CurrentPrice = styled.div`
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
`;

export const OptionText = styled.div`
    font-size: 14px;
    color: grey;
`;

export const OptionContent = styled.div`
    text-align: right;
`;

export const PriceContainer = styled.div`
    display: flex;
`;

export const CoinImage = styled.img`
    width: 16px;
    height: 16px;
`;

export const Price = styled.div`
    
`;


export const Unit = styled.div`
    
`;


export const UsdPrice = styled.span`
    
`;


export const Creator = styled.div`
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
`;

export const CreatorImage = styled.img`
    width: 12px;
    height: 12px;
    border-radius: 6px;
`;

export const CreatorName = styled.div`
    
`;

export const CreatorContent = styled.div`
    display: flex;
    align-items: center;
`;


export const ProgressContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
`;
