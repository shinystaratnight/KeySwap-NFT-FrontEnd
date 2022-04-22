/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { GridContainer, GridItem } from 'components/Grid'
import ExploreItem from 'components/ExploreItem'
import * as Element from "./styles";

const SELECT_SALE_TYPES = [
  { value: 'all', text: 'All Price' },
  { value: 'fixed', text: 'Fixed Price' },
  { value: 'auction', text: 'Live Auction' }
];

const SELECT_ORDER_BY_ITEMS = [
  { value: 'timestamp', text: 'Recently listed' },
  { value: 'likeCount', text: 'Most favorited' },
  { value: 'name', text: 'Name' },
];

const Explore = () => {

  const [searchTxt, setSearchTxt] = useState("")

  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('timestamp')

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [noItems, setNoItems] = useState(false)
  const [initialItemsLoaded, setInitialItemsLoaded] = useState(false)

  const fetchItems = (reset) => {
    
    let paramData = { sortDir: 'desc' }

    if (sortBy) {
      paramData.sortBy = sortBy;
    }
    if (searchTxt) {
      paramData.searchTxt = searchTxt;
    }

    if (filter) {
      paramData.saleType = filter;
    }

    if (reset) {
      paramData.page = 1;
    } else {
      paramData.page = page;
    }

    axios.get("/api/item", {
      params: paramData
    })
      .then(res => {
        console.log(res.data)
        setLoading(false)
        if (res.data.items.length === 0) setNoItems(true)
        if (reset) {
          setItems(res.data.items)
          setInitialItemsLoaded(true)
        } else {
          let prevArray = JSON.parse(JSON.stringify(items))
          prevArray.push(...res.data.items)
          setItems(prevArray)
        }
      })
      .catch((err) => {
        setItems([])
        setLoading(false)
        if (err.response.data.message === 'No Items found') {
          setNoItems(true)
        }
      })
  }

  function loadMore() {
    if (!loading) {
      setPage(page => { return (page + 1) })
    }
  }

  useEffect(() => {
    setLoading(true)
    if (initialItemsLoaded) {
      fetchItems(false);
    }
  }, [page])

  useEffect(() => {
    setItems([])
    setNoItems(false)
    setInitialItemsLoaded(false)
    setLoading(true)
    setPage(1)
    fetchItems(true)
  }, [filter, searchTxt, sortBy])

  return (
    <div>
      <Element.Header>
        <GridContainer>
          <Element.PageTitle>
            Explore All NFT's
          </Element.PageTitle>
        </GridContainer>
      </Element.Header>

      <Element.ExploreSection>
        <GridContainer>
          <Element.SectionHeader>
            <Element.FilterBox>
              <Element.FormFloating>
                <Element.FormSelect onChange={(e) => setFilter(e.target.value)} value={filter}>
                  {
                    SELECT_SALE_TYPES.map((cell) => (
                      <option value={cell.value} key={cell.value}>{cell.text}</option>
                    ))
                  }
                </Element.FormSelect>
                <Element.SelectLabel>
                  Filters
                </Element.SelectLabel>
              </Element.FormFloating>

              <Element.FormFloating>
                <Element.FormSelect onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
                  {
                    SELECT_ORDER_BY_ITEMS.map((cell) => (
                      <option value={cell.value} key={cell.value}>{cell.text}</option>
                    ))
                  }
                </Element.FormSelect>
                <Element.SelectLabel>
                  Sort By
                </Element.SelectLabel>
              </Element.FormFloating>
            </Element.FilterBox>

            <Element.SearchBox>
              <Element.FormFloating width='100%'>
                <Element.SearchInput onChange={(e) => setSearchTxt(e.target.value)} />
                <Element.SearchLabel>Search NFT</Element.SearchLabel>
                <Element.SearchBtn>
                  <Element.SearchIcon />
                </Element.SearchBtn>
              </Element.FormFloating>
            </Element.SearchBox>
          </Element.SectionHeader>

          <Element.CardList>
            {
              items.map((item, index) => (
                <GridItem xl={3} lg={4} md={4} sm={6} xs={12} key={index}>
                  <ExploreItem item={item} />
                </GridItem>
              ))
            }
            {
              !noItems && (
                <GridItem xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Element.LoadMoreBtn onClick={() => loadMore()}>
                    {loading ? "Loading..." : "Load more"}
                  </Element.LoadMoreBtn>
                </GridItem>
              )
            }

            {/* <div className="cardList" style={{ display: noItems ? "none" : "" }}>
              <button className="cta-button" onClick={() => loadMore()}>
                {loading ? "Loading..." : "Load more"}
              </button>
            </div> */}
          </Element.CardList>
        </GridContainer>
      </Element.ExploreSection>
    </div>
  )
}

export default Explore
