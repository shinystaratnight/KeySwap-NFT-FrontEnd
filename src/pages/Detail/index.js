/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"
import { useWeb3React } from '@web3-react/core'
import axios from 'axios'
import Querystring from 'query-string'
import DatePicker from 'react-datepicker'

import CircularProgress from '@material-ui/core/CircularProgress';

import PageHeader from 'components/PageHeader'
import { GridContainer, GridItem } from 'components/Grid'
import CustomSnackbar from 'components/CustomSnackbar'
import DetailActions from './DetailActions'
import History from "./history";
import Provenance from "./provenance";
import ModalBox from './modal'

import * as Element from "./styles";

import { getTokenBalance, listItem, delistItem, buy, createAuction, finalizeAuction, bidOnAuction } from "utils/contracts";
import { formatNum, currencies, getCurrencyInfo } from "utils";

import "react-datepicker/dist/react-datepicker.css";

function Detail(props) {

	const { collection, id } = useParams();
	const [item, setItem] = useState(null);
	const { account, chainId, library } = useWeb3React();
	const [balance, setBalance] = useState(0);
	const [currencyInfo, setCurrencyInfo] = useState({ symbol: 'BNB', address: '0x0000000000000000000000000000000000000000' });
	const [snackBarMessage, setSnackBarMessage] = useState("");
	const [openSnackbar, setOpenSnackbar] = useState(false);

	useEffect(() => {
		if (account && library && currencyInfo) {
			getTokenBalance(account, currencyInfo?.address, library)
				.then((balance) => {
					setBalance(balance)
				})
				.catch(() => {
					setBalance(0)
				})
		}
		return () => {
			setBalance(0)
		}
	}, [account, library, currencyInfo])

	const [localLikeCount, setLocalLikeCount] = useState(0)
	const [didLike, setDidLike] = useState(false)
	const [isLiking, setIsLiking] = useState(false)

	const [curTab, setCurTab] = useState('detail')

	const [showPlaceBidModal, setShowPlaceBidModal] = useState(false)
	const [showBuyNowModal, setShowBuyNowModal] = useState(false)
	const [showEndAuction, setShowEndAuction] = useState(false)
	const [showUnlistMarketPlace, setShowUnlistMarketPlace] = useState(false)
	const [showPutMarketPlace, setShowPutMarketPlace] = useState(false)

	const [auctionStatus, setAuctionStatus] = useState(false)
	const [auctionStatusMessage, setAuctionStatusMessage] = useState('')
	const [state, setState] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	});


	const [bidPrice, setBidPrice] = useState(0)

	const [putType, setPutType] = useState('fixed')
	const [putPrice, setPutPrice] = useState(0)

	const [startType, setStartType] = useState('now')
	const [startDate, setStartDate] = useState(null)
	const [endType, setEndType] = useState('1')
	const [endDate, setEndDate] = useState(null)

	const [listingStatus, setListingStatus] = useState(false);
	const [delistingStatus, setDelistingStatus] = useState(false);
	const [buyingStatus, setBuyingStatus] = useState(false);
	const [creatingAuctionStatus, setCreatingAuctionStatus] = useState(false);
	const [endingAuctionStatus, setEndingAuctionStatus] = useState(false);
	const [biddingStatus, setBiddingStatus] = useState(false);

	function fetchItem() {
		axios.get(`/api/item/${collection}/${id}`)
			.then(res => {
				setItem(res.data.item)
			})
			.catch(() => {
				//show an error page that the item doesnt exist
				setItem(undefined)
			})
	}
	useEffect(() => {
		if (!item) {
			fetchItem();
		}
	}, [item])

	useEffect(() => {
		if (item) {
			setLocalLikeCount(item.likes ? item.likes.length : 0)
			if (props.user) {
				setDidLike(item.likes && item.likes.includes(props.user.address.toLowerCase()))
			}
			if (item.auction) {
				setCurrencyInfo(getCurrencyInfo(item.auction.tokenAdr))
			} else if (item.pair) {
				setCurrencyInfo(getCurrencyInfo(item.pair.tokenAdr))
			}
		}
	}, [item, props.user])

	useEffect(() => {
		if (item?.auction) setInterval(() => setNewTime(), 1000);
	}, [item]);

	const setNewTime = () => {
		const currentTimestamp = new Date().getTime()
		let countdownDate = 0;
		if (item.auction.startTime * 1000 > currentTimestamp) {
			setAuctionStatus(false)
			countdownDate = item.auction.startTime * 1000;
			setAuctionStatusMessage('Auction starts in')

		} else if (item.auction.endTime * 1000 > currentTimestamp) {
			setAuctionStatus(true)
			countdownDate = item.auction.endTime * 1000;
			setAuctionStatusMessage('Ends in')
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
		} else {
			setState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
		}
	};

	function clickFavorite() {
		if (props.user) {
			if (!isLiking) {
				setIsLiking(true)
				setLocalLikeCount(l => l + (didLike ? -1 : 1))
				setDidLike(i => !i)
				axios.post("/api/item/like", Querystring.stringify({ address: props.user.address.toLowerCase(), tokenId: item.tokenId, collection: item.itemCollection }))
					.then(() => {
						setIsLiking(false)
					})
					.catch(() => {
						setIsLiking(false)
					})
			}
		}
	}


	const handleCloseDialog = () => {		
		setOpenSnackbar(false);
	};

	function putOnMarketPlace() {
		if (putType === 'fixed') {
			putFixed()
		} else if (putType === 'timed') {
			putAuction()
		}
	}

	function putFixed() {
		if (putPrice <= 0) {
			setSnackBarMessage("Please input price correctly!")
			setOpenSnackbar(true)
			return
		}
		setListingStatus(true)

		listItem(
			item.itemCollection,
			account,
			item.tokenId,
			currencyInfo?.address,
			putPrice,
			chainId,
			library.getSigner()
		).then((result) => {
			if (result) {
				setListingStatus(false);
				setShowPutMarketPlace(false)
				setSnackBarMessage("Success");
				setOpenSnackbar(true);
				props.history.push(`/profile/${account}`)
				return true;
			} else {
				setListingStatus(false);
				setSnackBarMessage("Failed Transaction");
				setOpenSnackbar(true);
			}
		});

	}

	function unlistItem() {
		setDelistingStatus(true)

		delistItem(
			item.pair.id,
			chainId,
			library.getSigner()
		).then((result) => {
			if (result) {
				setDelistingStatus(false);
				setShowUnlistMarketPlace(false)
				setSnackBarMessage("Success");
				setOpenSnackbar(true);
				props.history.push(`/profile/${account}`)
				return true;
			} else {
				setDelistingStatus(false);
				setSnackBarMessage("Failed Transaction");
				setOpenSnackbar(true);
			}
		});


	}

	function buyItem() {
		if (balance < item.pair.price) {
			setShowBuyNowModal(false)
			setSnackBarMessage("Your available balance is less than the price!")
			setOpenSnackbar(true)
			return
		}
		setBuyingStatus(true)

		buy(
			account,
			item.pair.id,
			currencyInfo?.address,
			item.pair.price,
			chainId,
			library.getSigner()
		).then((result) => {
			if (result) {
				setBuyingStatus(false);
				setShowBuyNowModal(false)
				setSnackBarMessage("Success");
				setOpenSnackbar(true);
				props.history.push(`/profile/${account}`)
				return true;
			} else {
				setBuyingStatus(false);
				setSnackBarMessage("Failed Transaction");
				setOpenSnackbar(true);
			}
		});
	}

	function putAuction() {
		if (putPrice <= 0) {
			setSnackBarMessage("Please input price correctly!")
			setOpenSnackbar(true)
			return
		}
		const currentTime = new Date().getTime()

		let startTimeStamp = 0
		if (startType === 'specific') {
			if (!startDate) {
				setSnackBarMessage("Please select start time.")
				setOpenSnackbar(true)
				return
			}
			const startTime = startDate.getTime()
			if (currentTime >= startTime) {
				setSnackBarMessage("The start time must be after the current time.")
				setOpenSnackbar(true)
				return
			}
			startTimeStamp = Math.floor(startTime / 1000)
		} else {
			startTimeStamp = Math.floor(currentTime / 1000)
		}
		console.log("startTimeStamp")
		console.log(startTimeStamp)

		let endTimeStamp = 0
		if (endType === 'specific') {
			if (!endDate) {
				setSnackBarMessage("Please select end time.")
				setOpenSnackbar(true)
				return
			}
			const endTime = endDate.getTime()
			endTimeStamp = Math.floor(endTime / 1000)
			if (currentTime >= endTime) {
				setSnackBarMessage("The end time must be after the current time.")
				setOpenSnackbar(true)
				return
			}
			if (startTimeStamp >= endTimeStamp) {
				setSnackBarMessage("The end time must be after the start time.")
				setOpenSnackbar(true)
				return
			}
		} else {
			const later = Number(endType)
			endTimeStamp = startTimeStamp + 86400 * later
		}
		console.log("endTimeStamp")
		console.log(endTimeStamp)


		setCreatingAuctionStatus(true)
		createAuction(
			item.itemCollection,
			account,
			item.tokenId,
			currencyInfo?.address,
			putPrice,
			startTimeStamp,
			endTimeStamp,
			chainId,
			library.getSigner()
		).then((result) => {
			if (result) {
				setCreatingAuctionStatus(false);
				setShowPutMarketPlace(false)
				setSnackBarMessage("Success");
				setOpenSnackbar(true);
				props.history.push(`/profile/${account}`)
				return true;
			} else {
				setCreatingAuctionStatus(false);
				setSnackBarMessage("Failed Transaction");
				setOpenSnackbar(true);
			}
		});
	}

	function endAuction() {
		setEndingAuctionStatus(true)

		finalizeAuction(
			item.auction.id,
			chainId,
			library.getSigner()
		).then((result) => {
			if (result) {
				setEndingAuctionStatus(false);
				setShowEndAuction(false)
				setSnackBarMessage("Success");
				setOpenSnackbar(true);
				props.history.push(`/profile/${account}`)
				return true;
			} else {
				setEndingAuctionStatus(false);
				setSnackBarMessage("Failed Transaction");
				setOpenSnackbar(true);
			}
		});

	}

	function placeBid() {

		if (!(item?.auction.bids) && (bidPrice - item.auction.price < 0)) {
			setSnackBarMessage("Your bid must be higher than minimum bid price!")
			setOpenSnackbar(true)
			return
		}

		if ((item?.auction.bids?.length > 0) && (bidPrice - item.auction.price * 1.05 <= 0)) {
			setSnackBarMessage("Your bid must be 5% higher than current bid!")
			setOpenSnackbar(true)
			return
		}

		if (balance - bidPrice < 0) {
			setSnackBarMessage("Your available balance is less than the bid price!")
			setOpenSnackbar(true)
			return
		}


		setBiddingStatus(true)

		bidOnAuction(
			account,
			item.auction.id,
			currencyInfo?.address,
			bidPrice,
			chainId,
			library.getSigner()
		).then((result) => {
			if (result) {
				setBiddingStatus(false);
				closePlaceBidModal()
				setSnackBarMessage("Success");
				setOpenSnackbar(true);
				window.location.reload();
				return true;
			} else {
				setBiddingStatus(false);
				setSnackBarMessage("Failed Transaction");
				setOpenSnackbar(true);
			}
		});

	}

	function closePlaceBidModal() {
		setShowPlaceBidModal(false)
		setBidPrice(0)
	}

	return (
		<div>
			<PageHeader title='Item Details Page' />
			<Element.DetailsSection>
				<GridContainer>
					<Element.GridRow>
						<GridItem xl={6} lg={6} md={12} sm={12}>
							<Element.ItemDescPart>
								<Element.ItemDescThumb>
									{
										item?.image && (
											<img loading="lazy" src={item?.image} alt='Item-img' />
										)
									}
								</Element.ItemDescThumb>
								<Element.ItemDescContent>
									<Element.TabList>
										<Element.TabButton active={curTab === 'detail'} onClick={() => setCurTab('detail')}>
											Details
										</Element.TabButton>
										{
											item?.auction && (
												<Element.TabButton active={curTab === 'bid_history'} onClick={() => setCurTab('bid_history')}>
													Bids
												</Element.TabButton>
											)
										}

										<Element.TabButton active={curTab === 'provenance'} onClick={() => setCurTab('provenance')}>
											Activities
										</Element.TabButton>
									</Element.TabList>

									<div className="tab-content">
										<Element.DetailsTab show={curTab === 'detail'}>
											<p>
												{item?.description}
											</p>
											<Element.AuthorProfile>
												<Element.AuthorThumb>
													<Link to={`/profile/${item?.ownerUser.address}`}>
														{
															item?.ownerUser.profilePic && (
																<img src={item?.ownerUser.profilePic} alt='Author' />
															)
														}
													</Link>
												</Element.AuthorThumb>
												<Element.AuthorInfo>
													<p>Owner</p>
													<h6>{item?.ownerUser.name}</h6>
												</Element.AuthorInfo>
											</Element.AuthorProfile>
											<Element.OtherInfoList>
												<Element.ItemOtherInfo>
													<Element.ItemInfoTitle>
														<h6>Contact Address</h6>
													</Element.ItemInfoTitle>
													<Element.ItemInfoDetails>
														<p className="cursor-pointer" onClick={() => window.open(`https://bscscan.com/address/${item?.itemCollection}`, '_blank')}>
															{item?.itemCollection}
															<span>BSC</span>
														</p>
													</Element.ItemInfoDetails>
												</Element.ItemOtherInfo>

												<Element.ItemOtherInfo>
													<Element.ItemInfoTitle>
														<h6>Token ID</h6>
													</Element.ItemInfoTitle>
													<Element.ItemInfoDetails>
														<p>{item?.tokenId}</p>
													</Element.ItemInfoDetails>
												</Element.ItemOtherInfo>
											</Element.OtherInfoList>
										</Element.DetailsTab>

										<Element.DetailsTab show={curTab === 'bid_history'}>
											{
												item?.auction && ((item?.auction.bids?.length ?? 0) === 0) && (
													<p className="text-center m-0">
														No active bids yet. Be the first to make a bid!
													</p>
												)
											}
											<Element.InfoList>
												{
													item?.auction && item?.auction.bids?.map((bid, index) => <History key={index} {...props} bid={bid} />)
												}
											</Element.InfoList>

										</Element.DetailsTab>

										<Element.DetailsTab show={curTab === 'provenance'}>
											<Element.InfoList>
												{
													item?.events.map((event, index) => <Provenance key={index} {...props} event={event} />)
												}
											</Element.InfoList>
										</Element.DetailsTab>
									</div>
								</Element.ItemDescContent>
							</Element.ItemDescPart>
						</GridItem>
						<GridItem xl={6} lg={6} md={12} sm={12}>
							<Element.ItemBuyPart>
								<Element.NftItemTitle>
									<h3>{item?.name}</h3>
									<DetailActions
										didLike={didLike}
										clickFavorite={clickFavorite}
										localLikeCount={localLikeCount}
									/>
								</Element.NftItemTitle>
								{
									item?.auction ?
										<>
											<Element.ItemDetailsCountDown>
												<h4>{auctionStatusMessage}</h4>
												<Element.ItemCountDownList>
													<li>
														<Element.CountValue>{state.days || '00'}</Element.CountValue>
														<Element.CountLabel>Days</Element.CountLabel>
													</li>
													<li>
														<Element.CountValue>{state.hours || '00'}</Element.CountValue>
														<Element.CountLabel>Hours</Element.CountLabel>
													</li>
													<li>
														<Element.CountValue>{state.minutes || '00'}</Element.CountValue>
														<Element.CountLabel>Mins</Element.CountLabel>
													</li>
													<li>
														<Element.CountValue>{state.seconds || '00'}</Element.CountValue>
														<Element.CountLabel>Secs</Element.CountLabel>
													</li>
												</Element.ItemCountDownList>
											</Element.ItemDetailsCountDown>

											<Element.ItemPriceBox>
												<h4>
													Current Bid
												</h4>
												<p>
													{`${formatNum(item?.auction?.price)} ${currencyInfo?.symbol ?? ''}`}
												</p>
											</Element.ItemPriceBox>
										</> :
										item?.pair ?
											<Element.ItemPriceBox>
												<h4>
													Price
												</h4>
												<p>
													{`${formatNum(item?.pair?.price)} ${currencyInfo?.symbol ?? ''}`}
												</p>
											</Element.ItemPriceBox>
											:
											<Element.ItemPriceBox>
												<p>
													Not for sale
												</p>
											</Element.ItemPriceBox>
								}
								<Element.ActionContainer>
									{
										item && props.user ?
											<>
												{item.ownerUser.address.toLowerCase() === props.user.address.toLowerCase() ?
													<>
														<Element.ActionBtn hidden={item?.auction || item?.pair} onClick={() => setShowPutMarketPlace(true)}>Put on marketplace</Element.ActionBtn>
														<Element.ActionBtn hidden={!item?.auction} onClick={() => setShowEndAuction(true)}>End Auction</Element.ActionBtn>
														<Element.ActionBtn hidden={!item?.pair} onClick={() => setShowUnlistMarketPlace(true)}>Unlist on marketplace</Element.ActionBtn>
													</>
													:
													<>
														<Element.ActionBtn hidden={!(item?.auction && auctionStatus)} onClick={() => setShowPlaceBidModal(true)}>Place a Bid</Element.ActionBtn>
														<Element.ActionBtn hidden={!item?.pair} onClick={() => setShowBuyNowModal(true)}>Buy Now</Element.ActionBtn>
													</>
												}
											</>
											: <></>
									}
								</Element.ActionContainer>
							</Element.ItemBuyPart>
						</GridItem>
					</Element.GridRow>
				</GridContainer>
			</Element.DetailsSection>


			<ModalBox
				open={showPlaceBidModal}
				handleClose={closePlaceBidModal}
			>
				<Element.ModalHeader>
					<Element.ModalCloseIcon size={32} onClick={() => closePlaceBidModal()} />
				</Element.ModalHeader>
				<Element.ModalTitle>Your Bid</Element.ModalTitle>
				<Element.ModalRow>
					<Element.ModalLabel>Current bid</Element.ModalLabel>
					<Element.ModalPrice>{formatNum(item?.auction?.price)} {currencyInfo?.symbol}</Element.ModalPrice>
				</Element.ModalRow>
				<Element.BidPrice>
					<Element.ModalLabel>Your bid</Element.ModalLabel>
					<Element.ModalMainPrice type={"number"} value={bidPrice} onChange={event => setBidPrice(event.target.value)} />
					<Element.UnitContainer>
						<Element.Unit>{currencyInfo?.symbol}</Element.Unit>
					</Element.UnitContainer>
				</Element.BidPrice>
				<Element.ModalRow>
					<Element.ModalLabel>Available</Element.ModalLabel>
					<Element.ModalPrice>{formatNum(balance)} {currencyInfo?.symbol}</Element.ModalPrice>
				</Element.ModalRow>
				<Element.ModalAction>
					<Element.ModalButton onClick={() => placeBid()}>
						{
							biddingStatus ? <CircularProgress style={{ width: "16px", height: "16px", color: "white", }} /> : "Place a Bid"
						}
					</Element.ModalButton>
				</Element.ModalAction>
			</ModalBox>

			<ModalBox
				open={showBuyNowModal}
				handleClose={() => setShowBuyNowModal(false)}
			>
				<Element.ModalHeader>
					<Element.ModalCloseIcon size={32} onClick={() => setShowBuyNowModal(false)} />
				</Element.ModalHeader>
				<Element.ModalTitle>
					<Element.ModalLabel>You will pay</Element.ModalLabel>
					<Element.PayAmount>
						<Element.Price>{formatNum(item?.pair?.price)}</Element.Price>
						<Element.Unit>{currencyInfo?.symbol}</Element.Unit>
					</Element.PayAmount>

				</Element.ModalTitle>
				<Element.ModalRow>
					<Element.ModalLabel>Available</Element.ModalLabel>
					<Element.ModalPrice>{formatNum(balance)} {currencyInfo?.symbol}</Element.ModalPrice>
				</Element.ModalRow>
				<Element.ModalActions>
					<Element.ModalCancelButton onClick={() => setShowBuyNowModal(false)}>Cancel</Element.ModalCancelButton>
					<Element.ModalSubmitButton onClick={() => buyItem()}>
						{
							buyingStatus ? <CircularProgress style={{ width: "16px", height: "16px", color: "white", }} /> : "Confirm"
						}
					</Element.ModalSubmitButton>
				</Element.ModalActions>
			</ModalBox>

			<ModalBox
				open={showPutMarketPlace}
				handleClose={() => setShowPutMarketPlace(false)}
			>
				<Element.ModalHeader>
					<Element.ModalCloseIcon size={32} onClick={() => setShowPutMarketPlace(false)} />
				</Element.ModalHeader>
				<Element.ModalTitle>Put on Marketplace</Element.ModalTitle>
				<Element.PutTypes>
					<Element.PutType onClick={() => setPutType('fixed')} className={putType === 'fixed' ? 'active' : ''}>
						<Element.FixedIcon size={32} />
						<Element.TypeLabel>Fixed price</Element.TypeLabel>
					</Element.PutType>
					<Element.PutType onClick={() => setPutType('timed')} className={putType === 'timed' ? 'active' : ''}>
						<Element.TimeIcon size={36} />
						<Element.TypeLabel>Timed auction</Element.TypeLabel>
					</Element.PutType>
				</Element.PutTypes>
				{
					putType === 'fixed' &&
					<Element.Field>
						<Element.label>Price</Element.label>
						<Element.InputContainer>
							<Element.Input type={"number"} placeholder={"Enter Price"} value={putPrice} onChange={event => setPutPrice(event.target.value)} />
							<Element.CurrencySelect name={"currencies"} defaultValue={currencyInfo.address} onChange={event => setCurrencyInfo(getCurrencyInfo(event.target.value))}>
								{
									currencies.map((currencyItem, index) =>
										<Element.OrderByOption key={index} value={currencyItem.address}>{currencyItem.symbol}</Element.OrderByOption>
									)
								}
							</Element.CurrencySelect>
						</Element.InputContainer>
					</Element.Field>
				}
				{
					putType === 'timed' &&
					<>
						<Element.Field>
							<Element.label>Minimum bid</Element.label>
							<Element.InputContainer>
								<Element.Input type={"number"} placeholder={"Enter minimum bid"} value={putPrice} onChange={event => setPutPrice(event.target.value)} />
								<Element.CurrencySelect name={"currencies"} defaultValue={currencyInfo.address} onChange={event => setCurrencyInfo(getCurrencyInfo(event.target.value))}>
									{
										currencies.map((currencyItem, index) =>
											<Element.OrderByOption key={index} value={currencyItem.address}>{currencyItem?.symbol}</Element.OrderByOption>
										)
									}
								</Element.CurrencySelect>
							</Element.InputContainer>

						</Element.Field>
						<Element.SelectRow>
							<Element.SelectField>
								<Element.label>Starting Date</Element.label>
								<Element.StartingDateSelect name={"starting_date"} defaultValue={startType} onChange={event => setStartType(event.target.value)}>
									<Element.OrderByOption value={"now"}>Right after listing</Element.OrderByOption>
									<Element.OrderByOption value={"specific"}>Pick specific date</Element.OrderByOption>
								</Element.StartingDateSelect>
								{
									startType === "specific" &&
									<DatePicker
										selected={startDate}
										onChange={value => setStartDate(value)}
										className={"input-picker"}
										showTimeSelect
										dateFormat="Pp"
									/>
								}
							</Element.SelectField>
							<Element.SelectField>
								<Element.label>Expiration Date</Element.label>
								<Element.StartingDateSelect name={"expiration_date"} defaultValue={endType} onChange={event => setEndType(event.target.value)}>
									<Element.OrderByOption value={"1"}>1 day</Element.OrderByOption>
									<Element.OrderByOption value={"3"}>3 days</Element.OrderByOption>
									<Element.OrderByOption value={"5"}>5 days</Element.OrderByOption>
									<Element.OrderByOption value={"7"}>7 days</Element.OrderByOption>
									<Element.OrderByOption value={"specific"}>Pick specific date</Element.OrderByOption>
								</Element.StartingDateSelect>
								{
									endType === "specific" &&
									<DatePicker
										selected={endDate}
										onChange={value => setEndDate(value)}
										className={"input-picker"}
										showTimeSelect
										dateFormat="Pp"
									/>
								}
							</Element.SelectField>
						</Element.SelectRow>
					</>
				}

				<Element.ModalActions>
					<Element.ModalCancelButton onClick={() => setShowPutMarketPlace(false)}>Cancel</Element.ModalCancelButton>
					<Element.ModalSubmitButton onClick={() => putOnMarketPlace()}>
						{
							listingStatus || creatingAuctionStatus ? <CircularProgress style={{ width: "16px", height: "16px", color: "white", }} /> : "Confirm"
						}
					</Element.ModalSubmitButton>
				</Element.ModalActions>
			</ModalBox>

			<ModalBox
				open={showEndAuction}
				handleClose={() => setShowEndAuction(false)}
			>
				<Element.ModalHeader>
					<Element.ModalCloseIcon size={32} onClick={() => setShowEndAuction(false)} />
				</Element.ModalHeader>
				<Element.ModalTitle>
					End Auction
					<Element.PayAmount>
						<Element.Price>Are you sure you want to end this auction ?</Element.Price>
					</Element.PayAmount>
				</Element.ModalTitle>
				<Element.ModalActions>
					<Element.ModalCancelButton onClick={() => setShowEndAuction(false)}>Cancel</Element.ModalCancelButton>
					<Element.ModalSubmitButton onClick={() => endAuction()}>
						{
							endingAuctionStatus ? <CircularProgress style={{ width: "16px", height: "16px", color: "white", }} /> : "End Auction"
						}
					</Element.ModalSubmitButton>
				</Element.ModalActions>
			</ModalBox>

			<ModalBox
				open={showUnlistMarketPlace}
				handleClose={() => setShowUnlistMarketPlace(false)}
			>
				<Element.ModalHeader>
					<Element.ModalCloseIcon size={32} onClick={() => setShowUnlistMarketPlace(false)} />
				</Element.ModalHeader>
				<Element.ModalTitle>
					Unlist Item
					<Element.PayAmount>
						<Element.Price>Are you sure you want to unlist this auction ?</Element.Price>
					</Element.PayAmount>
				</Element.ModalTitle>
				<Element.ModalActions>
					<Element.ModalCancelButton onClick={() => setShowUnlistMarketPlace(false)}>Cancel</Element.ModalCancelButton>
					<Element.ModalSubmitButton onClick={() => unlistItem()}>
						{
							delistingStatus ? <CircularProgress style={{ width: "16px", height: "16px", color: "white", }} /> : "Unlist"
						}
					</Element.ModalSubmitButton>
				</Element.ModalActions>
			</ModalBox>

			<CustomSnackbar
				open={openSnackbar}
				handleClose={handleCloseDialog}
				message={snackBarMessage}
			/>
		</div>
	);

}

export default Detail;
