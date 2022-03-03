import HomeCard from '../../components/cards/home/HomeCard';
import './Home.css';
import CreatorCard from '../../components/cards/creator/CreatorCard';
import Header from './Header';
import TrendingCollections from './TrendingCollections/index';
import Categories from './Categories/index';
import Auctions from './auctions.json';
import OtherCategories from './other-category.json';
import FeaturedArts from './feature-arts.json';
import BackedBy from '../../components/backedBy/BackedBy';
import HomeSubFooter from './HomeSubFooter';
import { useHistory } from 'react-router';
import Dialog from 'components/modal';
import BecomeCreator from '../../components/becomeCreator/BecomeCreator';
import { Col, Container, Row, Form, Image } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { NFTObjectData, useGetNFTList } from 'hooks/useApi';
import { Home_List } from './constant';
import { Button } from '../../components/button/Button';
import Loader from 'components/Loader';
import ExploreCard from './explore/index';
import InfoText from '../../components/InfoText/index';
import { PageBG } from 'components/page-bg';

const exploreList = [
  {
    title: 'Filter',
    icon: '/img/filter.svg',
  },
];
const filterModaltems = ['Default', 'Cheapest', 'Expensive', 'Recently Added'];

export const Home = () => {
  const history = useHistory();

  function goToDetails(product: NFTObjectData) {
    history.push(`/details/${product.tokenID}`);
  }

  const [NFTObjectList, setNFTObjectList] = useState<NFTObjectData[]>([]);
  const [loading, setLoading] = useState(false);
  const [start, setStart] = useState(0);
  const [category, setCategory] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [isFilterModal, setFilterModal] = useState(false);
  const [filterValue, setFilterValue] = useState('Default');

  function isAlreadyAdded(item: NFTObjectData) {
    return NFTObjectList?.find(list => list.tokenID === item.tokenID);
  }

  const items = useGetNFTList({
    start,
    count: Home_List.size,
    category: category,
    sort_field: sortField,
    sort_order: sortOrder,
  });

  useEffect(() => {
    setStart(0);
    setNFTObjectList([]);
  }, [category, sortField, sortOrder]);

  useEffect(() => {
    if (items?.nfts?.length) {
      const newNFTObjectList = [...NFTObjectList];
      if (!items?.nfts.find(item => isAlreadyAdded(item))) {
        newNFTObjectList.push(...items.nfts);
        setLoading(false);
      }
      setNFTObjectList(newNFTObjectList);
    }
  }, [items]);

  function loadMoreItem() {
    setLoading(true);
    setStart(start + Home_List.size);
  }

  function onFilterBy(filter) {
    if (filter === 'Default') {
      setSortField('');
      setSortOrder('');
    } else if (filter === 'Cheapest') {
      setSortField('price');
      setSortOrder('asc');
    } else if (filter === 'Expensive') {
      setSortField('price');
      setSortOrder('desc');
    } else if (filter === 'Recently Added') {
      setSortField('createdAt');
      setSortOrder('desc');
    }
    setFilterValue(filter);
    setFilterModal(false);
  }

  const onExploreHandler = explore => {
    //console.log(explore);
    if (explore.title === 'Filter') setFilterModal(true);
  };

  const ExploreBox = () => (
    <div className="mt-5 explorebox">
      {/* <ExploreCard exploreList={exploreList} onClick={onExploreHandler} /> */}
      <span onClick={() => setFilterModal(true)}>
        <Image src="/img/filter.svg" />
      </span>
      <Dialog
        show={isFilterModal}
        label={<InfoText className="m-0">Filter By</InfoText>}
        border
        className="filter-modal"
        onHide={() => setFilterModal(false)}
      >
        <Form.Group onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFilterBy(e.target.value)}>
          {filterModaltems.map((item, i) => (
            <Form.Check
              key={i}
              name="filter-radio-btn"
              type="radio"
              value={item}
              label={item}
              id={`frb${i}`}
              defaultChecked={item === filterValue ? true : false}
            />
          ))}
        </Form.Group>
      </Dialog>
    </div>
  );

  function renderLoadMore() {
    if (items?.total_count > NFTObjectList.length) {
      return (
        <Row>
          <Col className="text-center load-more-action">
            <Button
              label="Load More"
              variant="primary"
              onClick={loadMoreItem}
              isLoading={loading}
              loadingMessage="Loading..."
            />
          </Col>
        </Row>
      );
    }
    return null;
  }

  return (
    <div id="home-page">
      <PageBG />
      <h4 className="head title-font ml-2">
        Marketplace for NFTs <br /> and digital goods.
      </h4>
      <p className="head-text">
        WE'RE BRINGING DIGITAL CREATORS, CRYPTO NATIVES, AND COLLECTORS TOGETHER TO MOVE CULTURE FORWARD.
      </p>

      {/* <Container>
        <Header />
        <TrendingCollections />
        <Categories title="Live auctions" items={Auctions} click={goToDetails} />
        <Categories title="Featured artworks" items={FeaturedArts} click={goToDetails} />
      </Container>
      <BackedBy /> */}
      <Container>
        {NFTObjectList.length ? (
          <>
            <ExploreBox />
            <Categories items={NFTObjectList} click={goToDetails} />
          </>
        ) : (
          <Loader message="Fetching List..." />
        )}
      </Container>
      {renderLoadMore()}
      <BecomeCreator />
    </div>
  );
};
