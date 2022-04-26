/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React , {useState,useEffect} from "react";
import axios from 'axios';
import { slice } from 'lodash'

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

import WhatshotIcon from '@material-ui/icons/Whatshot';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import WidgetsIcon from '@material-ui/icons/Widgets';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

// filter images
import FilterIcon from '../../assets/images/filter.png';

import GridContainer from '../../components/Grid/GridContainer';
import GridRow from '../../components/Grid/GridRow';
import GridItem from '../../components/Grid/GridItem';

import * as Element from './styles';
import ProcessCard from './process';
import NftItem from '../../components/NftItem';

SwiperCore.use([Navigation]);

const SELECT_SALE_TYPES = [
    {value: 'fixed', text: 'Fixed Price'},
    {value: 'auction', text: 'Live Auction'}
];

const SELECT_ORDER_BY_ITEMS = [
    {value: 'timestamp', text: 'Recently listed'},
    {value: 'likeCount', text: 'Most favorited'},
    {value: 'name', text: 'Name'},
];

function Home(props) {    
    const [showFilter, setShowFilter] = useState(false);
    const [showSortBy, setShowSortBy] = useState(false);

    const [filters, setFilters] = useState({
        saleType: null, 
    });
    const [selectedFilters, setSelectedFilters] = useState({
        saleType: null, 
    });
    
    
    const [liveItems, setLiveItems] = useState([])
    const [favItems, setFavItems] = useState([])
    const [searchTxt, setSearchTxt] = useState("")   
    const [tempSearchTxt, setTempSearchTxt] = useState("") 
    const [sortBy, setSortBy] = useState("timestamp") 
    const [sortByText, setSortByText] = useState("Recently listed") 
    
    const [page, setPage] = useState(1)
    const [noItems, setNoItems] = useState(false)
    const [initialItemsLoaded, setInitialItemsLoaded] = useState(false)
    const [loading, setLoading] = useState(false)

    function onSetSaleType(saleType) {
        if (filters.saleType && (filters.saleType?.value === saleType.value)) {
            setFilters({ saleType:null })
        } else {
            setFilters({ saleType:saleType })
        }  
    }
    
    function removeSaleType() {
        setFilters({ saleType:null })
        setSelectedFilters({ saleType:null })        
    }
    
    function onSetSelectedFilters() {
        setShowFilter(false)
        setSelectedFilters(filters)        
    }
    function onClearAll() {
        setFilters({saleType: null})
        setSelectedFilters({saleType: null})
    }
    
    useEffect(() => {    
        setLiveItems([])
        setNoItems(false)
        setInitialItemsLoaded(false)
        setLoading(true)   
        setPage(1)    		
        fetchItems(true)    
    }, [selectedFilters, searchTxt, sortBy])

    useEffect(() => {
        setLoading(true)    
        if (initialItemsLoaded){			
            fetchItems(false);
        }
    }, [page])

    function fetchItems(reset) {
        let paramData = {
            sortDir: 'desc',
            sortBy: 'timestamp',
            searchTxt: '',
            saleType: 'auction',
        }
      
        axios.get("/api/item", {
            params: paramData
        })
        .then(res => {            
            setLoading(false)
            if (res.data.items.length === 0) setNoItems(true)      
            if (reset){        
                setLiveItems(res.data.items)
                setInitialItemsLoaded(true)
            }else{
                let prevArray = JSON.parse(JSON.stringify(liveItems))
                prevArray.push(...res.data.items)
                setLiveItems(prevArray)        
            }            
        })
        .catch(err => {
            setLiveItems([]);
            setLoading(false)
            if (err.response.data.message === 'No Items found') {
                setNoItems(true)
            }
        });

        paramData = {
            sortDir: 'desc',
            sortBy: 'likeCount',
            saleType: 'all'
        };
      
        axios.get("/api/item", {
            params: paramData
        })
        .then(res => {
            const sortedItems = res.data.items.filter((item => item.likeCount > 0)).sort(function (a, b) {
            return b.likeCount - a.likeCount;
            })
            setFavItems(slice(sortedItems, 0, 8))
        })
        .catch(() => {
            setFavItems([])
        })
    }

    function loadMore() {
        if (!loading) {
            setPage(page => {return (page + 1)}) 
        }      
    }

    return (
        <Element.HomePageWrapper onClick={() => {setSearchTxt(tempSearchTxt); }}>
            
            <Element.HomeBanner>
                <GridContainer>
                    <GridRow>
                        <GridItem xl={6} lg={6} md={6}>
                            <h1>
                                <span className="theme-color">Discover</span> Collect <br />
                                And Sell <span className="theme-color">NFT</span> Assets
                            </h1>
                            <p>
                                Digital Marketplace For Crypto Collectibles And Non-Fungible Tokens.
                                Buy, Sell, And Discover Exclusive Digital Assets.
                            </p>
                            <div className="banner-buttons">
                                <a href="/explore" className="header-button button-explore"><span>Explore</span> </a>
                                <a href="/create" className="header-button button-create"><span>Create</span> </a>
                            </div>
                        </GridItem>
                        <GridItem xl={6} lg={6} md={6}>
                            <Element.BannerImage>
                                <img src="/images/banner-img.png" alt="NFT Image" />
                            </Element.BannerImage>
                        </GridItem>
                    </GridRow>
                </GridContainer>
            </Element.HomeBanner>

            <GridContainer>
                <Element.AuctionSection>
                    <div className="section-header">
                        <div className="header-title">
                            <div className="live-icon" data-blast="bgColor">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 24">
                                    <title>live</title>
                                    <g id="Layer_2" data-name="Layer 2" data-blast="color">
                                        <g id="Layer_2-2" data-name="Layer 2">
                                            <path d="M12,17.87l4.36,4.51,4.37-4.51A6,6,0,0,0,12,17.87Z"></path>
                                            <path d="M6,12.35l2.91,3a10,10,0,0,1,14.54,0l2.91-3A14.09,14.09,0,0,0,6,12.35Z"></path>
                                            <path d="M0,6.85l2.91,3a18.09,18.09,0,0,1,26.18,0l2.91-3A22.12,22.12,0,0,0,0,6.85Z"></path>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                            <h3>Live Auctions</h3>
                        </div>
                        <div className="header-content">
                            <div className="auction-nav">
                                <div className="live-auction-prev">
                                    <ArrowBackIcon />
                                </div>
                                <div className="live-auction-next">
                                    <ArrowForwardIcon />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="section-wrapper">
                        <Swiper
                            spaceBetween={30}
                            navigation={{
                                nextEl: '.live-auction-next',
                                prevEl: '.live-auction-prev',
                            }}
                            breakpoints={{
                                576: {
                                  slidesPerView: 2,
                                },
                                768: {
                                    slidesPerView: 3,
                                },
                                1200: {
                                    slidesPerView: 4,
                                }
                            }}
                        >
                        {
                            liveItems.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <NftItem key={index} {...props} item={item}/>
                                </SwiperSlide>
                            ))
                        }
                        </Swiper>
                        {/* <div className="cardList" style={{display: noItems ? "none" : ""}}>
                            <button className="cta-button"  onClick={() => loadMore()}>
                                {loading ? "Loading..." : "Load more"}
                            </button>
                        </div> */}
                    </div>
                </Element.AuctionSection>

                <Element.AuctionSection>
                    <div className="section-header">
                        <div className="header-title">
                            <span><WhatshotIcon /></span>
                            <h3>Most Favorited Auctions</h3>
                        </div>
                        <div className="header-content">
                            <div className="auction-nav">
                                <div className="fav-auction-prev">
                                    <ArrowBackIcon />
                                </div>
                                <div className="fav-auction-next">
                                    <ArrowForwardIcon />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="section-wrapper">
                        <Swiper
                            spaceBetween={30}
                            navigation={{
                                nextEl: '.fav-auction-next',
                                prevEl: '.fav-auction-prev',
                            }}
                            breakpoints={{
                                576: {
                                  slidesPerView: 2,
                                },
                                768: {
                                    slidesPerView: 3,
                                },
                                1200: {
                                    slidesPerView: 4,
                                }
                            }}
                        >
                        {
                            favItems.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <NftItem key={index} {...props} item={item}/>
                                </SwiperSlide>
                            ))
                        }
                        </Swiper>
                        {/* <div className="cardList" style={{display: noItems ? "none" : ""}}>
                            <button className="cta-button"  onClick={() => loadMore()}>
                                {loading ? "Loading..." : "Load more"}
                            </button>
                        </div> */}
                    </div>
                </Element.AuctionSection>

                <Element.ProcessSection>
                    <div className="section-header">
                        <div className="header-title">
                            <span><EmojiObjectsIcon /></span>
                            <h3>Create And Sell your nfts</h3>
                        </div>
                    </div>
                    <div className="section-wrapper">
                        <div className="nft-sell-wrapper">
                            <GridRow justifyContent="center">
                                <GridItem xl={3} lg={4} sm={6}>
                                    <ProcessCard
                                        thumb="images/process/01.png"
                                        title="Set Up Your Wallet"
                                        content="Click Create & set up your colecton Add social links and a description profile banner images and set"
                                    />
                                </GridItem>
                                <GridItem xl={3} lg={4} sm={6}>
                                    <ProcessCard
                                        thumb="images/process/02.png"
                                        title="Creat Your Collection"
                                        content="Click Create & set up your colecton Add social links and a description profile banner images and set"
                                    />
                                </GridItem>
                                <GridItem xl={3} lg={4} sm={6}>
                                    <ProcessCard
                                        thumb="images/process/03.png"
                                        title="Add Your NFTs"
                                        content="Click Create & set up your colecton Add social links and a description profile banner images and set"
                                    />
                                </GridItem>
                                <GridItem xl={3} lg={4} sm={6}>
                                    <ProcessCard
                                        thumb="images/process/04.png"
                                        title="List Them For Sale"
                                        content="Click Create & set up your colecton Add social links and a description profile banner images and set"
                                    />
                                </GridItem>
                            </GridRow>
                            
                        </div>
                    </div>
                </Element.ProcessSection>

                <Element.SponsorSection>
                    <div className="section-header">
                        <div className="header-title">
                            <span><WidgetsIcon /></span>
                            <h3>our partners Logo </h3>
                        </div>
                    </div>
                    <div className="section-wrapper">
                        <div className="sponsor-wrapper">
                            <GridRow justifyContent="center">
                                <GridItem xl={1} lg={2} md={3} sm={3} xs={3}>
                                    <a target="_blank" rel="noreferrer noopener" href="https://zonoswap.finance/" className="sponsor-img">
                                        <img src="images/sponsor/01.png" alt="sponsor-img" />
                                    </a>
                                </GridItem>
                                <GridItem xl={1} lg={2} md={3} sm={3} xs={3}>
                                    <a target="_blank" rel="noreferrer noopener" href="http://www.corgidoge.com" className="sponsor-img">
                                        <img src="images/sponsor/02.png" alt="sponsor-img" />
                                    </a>
                                </GridItem>
                                <GridItem xl={1} lg={2} md={3} sm={3} xs={3}>
                                    <a target="_blank" rel="noreferrer noopener" href="https://www.dragonsgamefi.com/" className="sponsor-img">
                                        <img src="images/sponsor/03.png" alt="sponsor-img" />
                                    </a>
                                </GridItem>
                                <GridItem xl={1} lg={2} md={3} sm={3} xs={3}>
                                    <a target="_blank" rel="noreferrer noopener" href="http://www.smileswap.finance" className="sponsor-img">
                                        <img src="images/sponsor/04.png" alt="sponsor-img" />
                                    </a>
                                </GridItem>
                                <GridItem xl={1} lg={2} md={3} sm={3} xs={3}>
                                    <a target="_blank" rel="noreferrer noopener" href="https://github.com/Tech-Audit/Smart-Contract-Audits/blob/main/TECHAUDIT_KEYMASTERCHEF.pdf" className="sponsor-img">
                                        <img src="images/sponsor/05.png" alt="sponsor-img" />
                                    </a>
                                </GridItem>
                                <GridItem xl={1} lg={2} md={3} sm={3} xs={3}>
                                    <a target="_blank" rel="noreferrer noopener" href="https://github.com/freshcoins/Smart-Contract-Audits/blob/main/KEYSWAP_0x07b1681C082039551952bDee4A505cecC2FF4998.pdf" className="sponsor-img">
                                        <img src="images/sponsor/06.png" alt="sponsor-img" />
                                    </a>
                                </GridItem>
                                <GridItem xl={1} lg={2} md={3} sm={3} xs={3}>
                                    <a target="_blank" rel="noreferrer noopener" href="https://github.com/RhinoAuditing/complete-contracts/blob/main/Keyswap%20Audit%20-%205th%20of%20March%202022.pdf" className="sponsor-img">
                                        <img src="images/sponsor/07.png" alt="sponsor-img" />
                                    </a>
                                </GridItem>
                                <GridItem xl={1} lg={2} md={3} sm={3} xs={3}>
                                    <a target="_blank" rel="noreferrer noopener" href="https://bscscan.com/address/0x499A20EB717D3885FDba6dCa9a05F7c597b6A020" className="sponsor-img">
                                        <img src="images/sponsor/08.png" alt="sponsor-img" />
                                    </a>
                                </GridItem>
                            </GridRow>
                        </div>
                    </div>
                </Element.SponsorSection>
            </GridContainer>
        </Element.HomePageWrapper>
    );    
}

export default Home;
