import styled from 'styled-components';
import { Heart } from "@styled-icons/feather/Heart";
import { ShareSocial } from "@styled-icons/ionicons-outline";
import { Close } from "@styled-icons/material/Close";
import { Info } from "@styled-icons/material/Info";
import { AccessTimeFilled } from "@styled-icons/material";
import { Tag } from "@styled-icons/fa-solid/Tag";
import { Heart as HeartFill } from "@styled-icons/fa-solid/Heart";
import { Mail } from "@styled-icons/feather/Mail";
import { Twitter } from "@styled-icons/bootstrap/Twitter";
import { Telegram } from "@styled-icons/bootstrap/Telegram";


export const Container = styled.div`
    display: block;
    color: #1E2026;
    margin 48px auto;
    max-width: 1200px;
  @media (min-width: 1200px){
    display flex;
  }
`;

export const ImageContainer = styled.div`
    padding: 0 12px;
    @media (min-width: 1200px){
      padding: 0;
    }
`;

export const ImageContent = styled.div`
    position: relative;    
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const NftImage = styled.img`
    width: 320px;
    border-radius: 8px;
    @media (min-width: 768px){
        width: 586px;        
    }
`;

export const NftVideo = styled.video`
    width: 320px;
    border-radius: 8px;
    @media (min-width: 768px){
        width: 586px;        
    }
`;

export const NftAudio = styled.audio`
    position: relative;
    bottom: 20px; 
    display: flex;
    width: 320px;
    height: 25px;
    border-radius: 8px;
    margin: auto;
    @media (min-width: 768px){
        width: 586px;
        height: 25px;
    }
`;


export const NftType = styled.div`
    margin-top: 8px;
    color: grey;
    text-transform: capitalize;
`;

export const AddressContainer = styled.div`
    margin-top: 24px;
`;

export const label = styled.div`
    font-size: 14px;
    margin-bottom: 4px;
    color: grey;
`;

export const Address = styled.div`
    display: flex;
    align-items: center;
`;

export const NftAddress = styled.a`
    text-decoration: unset;
    color: #1E2026;
    font-size: 12px;
`;

export const NftNetwork = styled.div`
    padding: 4px 8px;
    background: #f1f1f1;
    color: #1E2026;
    font-size: 12px;
    border-radius: 4px;
    margin-left: 12px;
`;

export const TokenIdContainer = styled.div`
    margin-top: 24px;
`;

export const TokenId = styled.div`

`;

export const DetailContainer = styled.div`
    margin-left: 0;
    padding: 12px;
        
    flex-grow: 1;
    @media (min-width: 1200px){
        margin-left: 40px;
      padding: 0;
    }
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
`;

export const Collection = styled.div`
    margin-top: 20px;
`;

export const CollectionCaption = styled.div`
    font-weight: bold;
    margin-bottom: 12px; 
`;

export const CollectionContainer = styled.div`
    display: flex;
    align-items: center;
`;

export const CollectionImage = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 24px;
`;

export const CollectionTitle = styled.div`
    font-weight: bold;
    font-size: 16px;
    margin-left: 20px;
`;

export const NftTitle = styled.div`
    font-size: 20px;
    font-weight: bold;
`;

export const NftCategory = styled.div`
    padding: 4px 8px;
    background: #f1f1f1;
    color: #1E2026;
    font-size: 12px;
    border-radius: 4px;
    margin-left: 12px;
`;

export const HeaderRight = styled.div`
    display: flex;
    align-items: center;
    position: relative;
`;

export const DropDownMenus = styled.div`
    background: white;
    width: 240px;
    position: absolute;
    bottom: -144px;
    box-shadow: rgb(0 0 0 / 10%) 0px 0px 15px;
    right: 0;
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

export const TelegramIcon = styled(Telegram)`
    margin-right: 8px;
`;

export const TwitterIcon = styled(Twitter)`
    margin-right: 8px;
`;

export const EmailIcon = styled(Mail)`
    margin-right: 8px;
`;

export const Favorite = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
export const FavouritesCount = styled.div`
    font-size: 10px;
`;

export const LoveFillIcon = styled(HeartFill)`
    color: #8f624b;
`;


export const LoveIcon = styled(Heart)`

`;

export const ShareIcon = styled(ShareSocial)`
    margin-left: 12px;    
    margin-bottom: 4px;
`;

export const OwnerContainer = styled.div`
    margin-top: 24px;
`;
export const Owners = styled.div`
    display: flex;
`;
export const Owner = styled.div`
    display: flex;
    align-items: center;
    margin-right: 40px;
`;
export const OptionText = styled.div`
    font-size: 14px;
    margin-bottom: 8px;    
`;
export const UserOptionText = styled.div`
    font-size: 12px;
    margin-bottom: 4px;
    color: grey;
`;
export const CreatorContent = styled.div`
    margin-left: 20px;
`;
export const CreatorImage = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 24px;
    cursor: pointer;
`;
export const CreatorName = styled.div`
    font-weight: bold;
    font-size: 14px;
`;
export const Caption = styled.div`
    margin-top: 20px;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    word-break: break-word;
    white-space: pre-line;
    max-height: 80px;
    overflow: auto;
    color: rgb(30, 35, 41);
`;
export const StatusContainer = styled.div`
    margin-top: 20px;
    display: block;
    justify-content: space-between;
  @media (min-width: 768px){
    display flex;
  }
`;

export const CurrentBid = styled.div`

`;

export const OptionContent = styled.div`
    display: flex;
    align-items: center;
`;
export const PriceContainer = styled.div`
    display: flex;
    align-items: center;
`;

export const UnitContainer = styled.div`
    display: flex;
    align-items: center;
`;
export const CoinImage = styled.img`
    width: 24px;
    height: 24px;
    border-radius: 12px;
`;

export const Price = styled.div`
    margin-left: 8px;
    font-size: 20px;
    font-weight: bold;
`;
export const Unit = styled.div`
    margin-left: 4px;
    font-size: 20px;
    font-weight: bold;
`;

export const UsdPrice = styled.span`
    color: grey;
    font-size: 12px;
    margin-left: 8px;
`;

export const ActionContainer = styled.div`
    display: block;
    margin-top: 20px;
  @media (min-width: 480px){
    display flex;
  }
`;

export const Action = styled.div`
    width: 200px;
    text-align: center;
    font-size : 14px;
    font-weight: 600;    
    background-image: linear-gradient(rgb(215 169 146) 0%,rgb(187 135 108) 100%);
    padding: 12px 20px;
    margin-right: 12px;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 8px;
`;

export const Others = styled.div`
    margin-top: 40px;
`;

export const TabHeader = styled.div`
    display: flex;
`;

export const Tab = styled.div`
    padding: 8px 20px;
    font-size: 14px;
    font-weight : 600;
    cursor: pointer;
    &.active {
        border-bottom: solid 4px #8f624b;
    }
`;

export const TabContent = styled.div`
    padding: 20px 0;
`;

export const BidTime = styled.div`
    text-align: right;
`;

export const Times = styled.div`
    display: flex;
    justify-content: flex-end;
`;

export const Time = styled.div`
    text-align: center;
    margin: 0 2px;
`;

export const TimeValue = styled.div`
    border-radius: 4px;
    padding: 12px;
    font-size: 24px;
    font-weight: bold;
    color: #1E2026;
    background-color: #e3e3e3;
`;

export const TimeLabel = styled.div`

`;

// History

export const TabContentContainer = styled.div`
    position: relative;
`;

export const InfoList = styled.div`
    max-height: 450px;
    padding-bottom: 80px;
    overflow: auto;
`;

export const ViewMore = styled.div`
    position: absolute;
    left: 0px;
    bottom: 0px;
    background: linear-gradient(rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 100%);
    text-align: center;
    cursor: pointer;
    text-decoration: underline;
    width: 100%;
    height: 106px;
`;

export const MoreText = styled.div`
    margin-top: 80px;
    color: #1E2026;
`;


export const HistoryContainer = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    border-bottom: 1px solid rgb(234, 236, 239);
    padding: 16px 0px;
`;

export const BidderImage = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 15px;
    cursor: pointer
`;

export const BidderContent = styled.div`
    margin-left: 12px;
    flex-grow: 1;
`;
export const BidderName = styled.div`
    font-size: 16px;
    span {
        font-size: 14px;
        color: grey;    
    }
`;

export const BidTimeAgo = styled.div`
    font-size: 14px;
    color: grey;
`;


export const BidAmount = styled.div`

`;

export const HistoryCoinImage = styled.img`
    width: 16px;
    height: 16px;
    border-radius: 8px;
`;

export const HistoryPrice = styled.div`
    margin-left: 4px;
    font-size: 14px;
    font-weight: bold;
`;
export const HistoryUnit = styled.div`
    margin-left: 4px;
    font-size: 14px;
    font-weight: bold;
`;

// Provenance
export const ProvenanceContainer = styled.div`
    display: flex;
    position: relative;
    padding-left: 16px;
    padding-bottom: 34px;
    &::before {
        content: "";
        position: absolute;
        left: 3px;
        top: 14px;
        width: 1px;
        height: 100%;
        border-right: 1px dashed rgb(183, 189, 198);
    }
    &::after {
        content: "";
        position: absolute;
        left: 0px;
        top: 6px;
        width: 8px;
        height: 8px;
        background: #8f624b;
        border-radius: 50%;
        z-index: 1;
    }
`;

export const ProvenanceContent = styled.div`
    margin-left: 12px;
    flex-grow: 1;
`;

export const ProvenanceName = styled.div`
    font-size: 14px;
    cursor: pointer;
    span {
        font-size: 14px;
        color: grey;    
    }
`;

export const ProvenanceTime = styled.div`
    margin-top: 4px;
    font-size: 12px;
    color: grey;
`;

// Modal
export const ModalBody = styled.div`
  padding: 4px 0px;
`;

export const ModalHeader = styled.div`
   text-align: right;
`;

export const ModalCloseIcon = styled(Close)`
`;

export const ModalTitle = styled.div`
  margin-bottom: 30px;
  font-weight: bold;
  font-size: 24px;
  text-align: center;
`;

export const ModalRow = styled.div`
   display: flex;
   justify-content: space-between;
   margin: 20px 0;
`;

export const ModalLabel = styled.div`
    font-size: 16px;
    color: grey;
`;

export const ModalPrice = styled.div`
    font-weight: bold;
    font-size: 16px;
    color: #1E2026;
`;

export const BidPrice = styled.div`
    display: flex;
    align-items: flex-end;
    margin: 20px 0;
    justify-content: space-between;
`;

export const ModalMainPrice = styled.input`
    font-size: 30px;
    line-height: 40px;
    flex-grow: 1;
    width: 250px;
    text-align: center;
    border: unset;
    outline: none;
    &::-webkit-inner-spin-button, &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

export const BidUsd = styled.div`
    text-align: center;
    color: grey;
    font-size: 14px;
`;

export const ModalAction = styled.div`
  margin-top: 20px;
  width: 100%;
  text-align: center;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  width: 100%;
  text-align: center;
`;

export const ModalButton = styled.div`
    background-image: linear-gradient(rgb(215 169 146) 0%,rgb(187 135 108) 100%);
    padding: 16px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
`;

export const ModalCancelButton = styled.div`
    background-image: linear-gradient(rgb(219 219 219) 0%,rgb(184 184 184) 100%);
    padding: 16px 20px;
    margin-right: 12px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    width: 160px
`;

export const ModalSubmitButton = styled.div`
    background-image: linear-gradient(rgb(215 169 146) 0%,rgb(187 135 108) 100%);
    padding: 16px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    width: 160px
`;


// Buy Modal
export const InfoImage = styled.img`
    width: 120px;
    height: 120px;
    border-radius: 60px;
    margin-bottom: 12px;
`;

export const PayAmount = styled.div`
    display: flex;
    justify-content: center;
    margin: 8px 0;
`;

export const ModalInfoContent = styled.div`
    background-color: #ffedbe;
    padding: 20px 32px;
`;

export const InfoRow = styled.div`
    display: flex;
    align-items: center;
`;

export const InfoIcon = styled(Info)`
    color: #b0851f;
`;

export const InfoLabel = styled.div`
  font-size: 18px;
     margin-left: 8px;
`;
export const InfoActionLabel = styled.div`
    color: #b0851f;
    font-size: 20px;
    font-weight: bold;
    margin-top: 8px;
    margin-left: 32px;
    cursor: pointer;
`;

// Put on marketplace
export const PutTypes = styled.div`
   display: flex;
   justify-content: center;
`;

export const PutType = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 160px;
    height: 160px;
    border: solid 3px #cacaca;
    border-radius: 12px;
    margin: 8px 20px;
    cursor: pointer;
    &.active {
        border: solid 3px #8f624b;
    }
`;

export const FixedIcon = styled(Tag)`

`;

export const TimeIcon = styled(AccessTimeFilled)`

`;

export const TypeLabel = styled.div`
    font-weight: bold;
    margin-top: 12px;
    text-align: center;
`;

export const Field = styled.div`
    margin: 40px 0; 
`;

export const InputContainer = styled.div`
    display: flex;
    border-bottom: 1px solid rgb(234, 236, 239);
    align-items: center;
`;
export const Input = styled.input`
    flex-grow: 1;
    border: unset;
    font-size: 18px;
    padding: 8px;
    &:focus-visible{
        outline: unset;
    }
`;
export const InputUnit = styled.div`
    font-size: 18px;
    font-weight: bold;
`;

export const CurrencySelect = styled.select`
    width:  100px;
    border: unset;
    border-bottom: 1px solid rgb(234, 236, 239);
    font-size: 18px;
    font-weight: bold;
    padding: 8px;
    &:focus-visible{
        outline: unset;
    }
`;

export const SelectRow = styled.div`
    display: block;
    justify-content: space-between;
  @media (min-width: 480px){
    display flex;
  }
`;

export const SelectField = styled.div`
    width: 46%;
    padding: 8px 12px 0 12px;

    .input-picker{
        width: 190px;
        margin-top: 12px;
        border-radius: 8px;
        padding: 8px;
        border-width: 1px;
    }
`;

export const StartingDateSelect = styled.select`
    width: 230px;
    border: unset;
    border-bottom: 1px solid rgb(234, 236, 239);
    font-size: 16px;
    padding: 8px;
    width: 100%;
    &:focus-visible{
        outline: unset;
    }
`;

export const OrderByOption = styled.option`
    
`;

export const DetailsSection = styled.div`
	padding: 80px 0 75px;
	& > div {
		padding-right: 16px;
		padding-left: 16px;
	}
  @media screen and (min-width: 992px) {
		padding: 120px 0 115px;
	}
	@media screen and (max-width: 991px) and (min-width: 768px) {
		& > div {
			max-width: 720px;
		}
	}
`
export const GridRow = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin-top: -32px;
	margin-right: -16px;
	margin-left: -16px;
	& > div {
		padding-right: 16px;
    padding-left: 16px;
    margin-top: 32px;
	}
`
export const ItemDescPart = styled.div`

`
export const ItemDescThumb = styled.div`
	margin-bottom: 40px;
	@media screen and (min-width: 992px) {
		margin-bottom: 50px;
	}
	img {
		border-radius: 10px;
    margin: auto;
		display: block;
	}
`
export const ItemDescContent = styled.div`

`
export const TabList = styled.div`
	background: rgba(0,0,0,.07);
	border-bottom: none;
	padding-block: 5px;
	margin-bottom: 25px;
	display: flex;
	flex-wrap: wrap;
	padding-left: 0;
`
export const TabButton = styled.button`
	color: ${props => props.active ? '#5138ee' : '#000'};
	border: 0;
	outline: none;
	box-shadow: none;
	font-weight: 500;
	position: relative;
	cursor: pointer;
	margin-bottom: -1px;
  background: 0 0;
	border-radius: 0;
	display: block;
  padding: 0.5rem 1rem;
	transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out;
	&::after {
		border-color: transparent transparent #fff transparent;
		bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 8px 10px 8px;
		position: absolute;
    content: "";
		display: ${props => props.active ? 'block' : 'none'}
	}
`
export const DetailsTab = styled.div`
	display: ${props => props.show ? 'block' : 'none'};	
	color: #555;
	p {
		margin-bottom: 20px;
		margin-top: 0;
	}
	& .text-center {
		text-align: center;
	}
	@media screen and (min-width: 992px) {
		p {
			max-width: 95%;
		}
	}
`
export const AuthorProfile = styled.div`
	margin-bottom: 25px;
	gap: 15px;
	align-items: center;
	flex-wrap: wrap;
	display: flex;
`
export const AuthorThumb = styled.div`
	width: 60px;
	height: 60px;
	img {
		border-radius: 50%;
    border: 2px solid #030010;
		max-width: 100%;
    height: auto;
	}
`
export const AuthorInfo = styled.div`
	p {
		margin: 0;
	}
	h6 {
		color: #000;
		font-size: 1.125rem;
		margin: 0;
	}
`
export const OtherInfoList = styled.ul`
	list-style: none;
	padding-left: 0;
	margin-top: 0;
  margin-bottom: 1rem;
`
export const ItemOtherInfo = styled.li`
	margin-bottom: 20px;
	align-items: center;
	display: flex;
	flex-wrap: wrap;
`
export const ItemInfoTitle = styled.div`
	width: 30%;
	h6 {
		color: #000;
		font-size: 1.125rem;
		margin: 0;
	}
	&::after {
		content: ":";
    right: 10px;
    top: 0;
		position: absolute;
	}
	@media screen and (min-width: 576px) {
		width: 35%;
		position: relative;
	}
`
export const ItemInfoDetails = styled.div`
	width: 70%;
	p {
		margin: 0;
		color: #555;
		position: relative;
		padding-right: 40px;
		text-overflow: ellipsis;
    overflow: hidden;
		span {
			padding: 4px 8px;
			background: #5138ee;
			color: #fff;
			font-size: 12px;
			border-radius: 6px;			
			position: absolute;
			right: 0;
			top: 50%;
			transform: translateY(-50%);
		}
	}
	.cursor-pointer {
		cursor: pointer;
	}
	@media screen and (min-width: 576px) {
		width: 65%;	
	}
`
