/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { useWeb3React } from '@web3-react/core'
import axios from 'axios'
import { slice } from 'lodash'

import PageHeader from 'components/PageHeader'
import { GridContainer, GridRow, GridItem } from 'components/Grid'
import ExploreItem from 'components/ExploreItem'

import * as Element from "./styles";

const SELECT_SALE_TYPES = [
  { value: 'fixed', text: 'Fixed Price' },
  { value: 'auction', text: 'Live Auction' }
];

function Profile(props) {
  let { id } = useParams();
  const history = useHistory();
  const { user, login } = props;
  const [userProfile, setUserProfile] = useState(undefined)
  const { account, chainId, library } = useWeb3React();

  const [curTab, setCurTab] = useState(1); // 1: Owned, 2: On sale, 3: Created, 4: Liked

  const [items, setItems] = useState([])
  const [favoritedItems, setFavoritedItems] = useState([])
  const [searchTxt, setSearchTxt] = useState("")
  const [tempSearchTxt, setTempSearchTxt] = useState("")
  const [saleType, setSaleType] = useState('all')

  const [page, setPage] = useState(1)
  const [noItems, setNoItems] = useState(false)
  const [initialItemsLoaded, setInitialItemsLoaded] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!userProfile) {
      getUser()
    }
  }, [user])

  useEffect(() => {
    if (!!user) {
      login();
    }
    getFavoritedItems()
  }, [user, account, library])

  function getUser() {
    axios.get(`/api/user/${id ? id : ""}`)
      .then(res => {
        setUserProfile(res.data.user)
      })
  }

  useEffect(() => {
    setItems([]);
    setNoItems(false)
    setInitialItemsLoaded(false);
    setLoading(true);
    setPage(1);
    fetchItems(true);
  }, [id, saleType, searchTxt, curTab])

  useEffect(() => {
    setLoading(true)
    if (initialItemsLoaded) {
      fetchItems(false);
    }
  }, [page])

  function fetchItems(reset) {
    let paramData = {
      sortDir: 'desc',
      saleType: saleType,
      sortBy: 'timestamp'
    }

    if (searchTxt) {
      paramData.searchTxt = searchTxt
    }

    switch (curTab) {
      case 1:
        // Owned
        paramData.owner = id;
        break;
      case 2:
        // On sale
        paramData.itemOwner = id;
        paramData.saleType = 'all';
        break;
      case 3:
        // Created
        paramData.creator = id;
        break;
      case 4:
        // Liked
        paramData.likes = id;
        break;
      default:
        break;
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
      .catch(err => {
        setLoading(false)      
        setNoItems(true)
      })
  }

  function loadMore() {
    if (!loading) {
      setPage(page => { return (page + 1) })
    }
  }

  const copyToClipboard = (text) => {
    var textField = document.createElement('textarea')
    textField.innerText = text
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
  }

  const getFavoritedItems = () => {
    let paramData = {
      sortDir: 'desc',
      sortBy: 'likeCount',
      saleType: 'all'
    }

    axios.get("/api/item", {
      params: paramData
    })
      .then(res => {
        const sortedItems = res.data.items.filter((item => item.likeCount > 0)).sort(function (a, b) {
          return b.likeCount - a.likeCount;
        })       
        setFavoritedItems(slice(sortedItems, 0, 9))
      })
      .catch(() => {
        setFavoritedItems([])
      })
  }

  return (
    <Element.ProfilePageWrap>
      <PageHeader title='Author Profile' />
      <Element.ProfileSection>
        <GridContainer>
          <div>
            <Element.ProfileItem>
              <Element.ProfileCover>
                <img src='/images/cover.jpg' alt='Cover' />
                <Element.EditProfile className="edit-profile">
                  <Element.EditProfileBtn onClick={() => history.push('/edit_profile')}>
                    <Element.EditIcon />
                    Edit
                  </Element.EditProfileBtn>
                </Element.EditProfile>
              </Element.ProfileCover>

              <Element.ProfileInformation>
                <Element.ProfilePic>
                  <img src={userProfile && userProfile.profilePic ? userProfile.profilePic : "/images/profile.png"} alt="ProfileImage" />
                  <Element.EditProfile className="edit-profile">
                    <Element.EditProfileBtn onClick={() => history.push('/edit_profile')}>
                      <Element.EditIcon />
                      Edit
                    </Element.EditProfileBtn>
                  </Element.EditProfile>
                </Element.ProfilePic>

                <Element.ProfileName>
                  <h4>
                    {userProfile && userProfile.name ? userProfile.name : "NoName"}
                  </h4>
                  <p>
                    {userProfile && userProfile.socialLink ? userProfile.socialLink : ""}
                  </p>
                </Element.ProfileName>

                <Element.ProfileContact>
                  <Element.CrytoCode>
                    <input value={id} readOnly />
                    <Element.CrytoCopy onClick={() => copyToClipboard(id)}>
                      <Element.CopyIcon></Element.CopyIcon>
                    </Element.CrytoCopy>
                  </Element.CrytoCode>
                </Element.ProfileContact>
              </Element.ProfileInformation>
            </Element.ProfileItem>

            <Element.ProfileDetails>
              <GridRow>
                <GridItem xl={9} lg={12} md={9} sm={12} xs={12}>
                  <Element.NavBox>
                    <Element.NavItem>
                      <Element.NavLink active={curTab == 1} onClick={() => setCurTab(1)}>
                        Owned
                      </Element.NavLink>
                    </Element.NavItem>
                    <Element.NavItem>
                      <Element.NavLink active={curTab == 2} onClick={() => setCurTab(2)}>
                        On Sale
                      </Element.NavLink>
                    </Element.NavItem>
                    <Element.NavItem>
                      <Element.NavLink active={curTab == 3} onClick={() => setCurTab(3)}>
                        Created
                      </Element.NavLink>
                    </Element.NavItem>
                    <Element.NavItem>
                      <Element.NavLink active={curTab == 4} onClick={() => setCurTab(4)}>
                        Liked
                      </Element.NavLink>
                    </Element.NavItem>
                    <Element.FilterSelect>
                      <select onChange={(e) => setSaleType(e.target.value)} value={saleType}>
                        <option value='all'>All</option>
                        {
                          SELECT_SALE_TYPES.map((option, index) => (
                            <option key={index} value={option.value}>{option.text}</option>
                          ))
                        }
                      </select>
                    </Element.FilterSelect>
                  </Element.NavBox>
                  <Element.TabContents>
                    <GridRow justifyContent='center'>
                      {
                        items.map((item, index) => (
                          <GridItem xl={4} lg={4} md={4} sm={6} xs={12} key={index}>
                            <ExploreItem item={item} />
                          </GridItem>
                        ))
                      }
                    </GridRow>
                    {
                      !noItems && (
                        <GridItem xl={12} lg={12} md={12} sm={12} xs={12}>
                          <Element.LoadMoreBtn onClick={() => loadMore()}>
                            {loading ? "Loading..." : "Load more"}
                          </Element.LoadMoreBtn>
                        </GridItem>
                      )
                    }
                  </Element.TabContents>
                </GridItem>
                <GridItem xl={3} lg={12} md={9} sm={12} xs={12}>
                  <Element.RightSection>
                    <Element.SearchWidget>
                      <Element.WidgetTitle>
                        <h5>Search NFT</h5>
                      </Element.WidgetTitle>
                      <Element.WidgetContent>
                        <p>
                          Search from best Rarest NFT collections
                        </p>
                        <Element.SearchBox>
                          <Element.FormFloating width='100%'>
                            <Element.SearchInput
                              value={tempSearchTxt}
                              onChange={event => { setTempSearchTxt(event.target.value) }}
                              onKeyDown={event => {
                                if (event.key === 'Enter')
                                  setSearchTxt(event.target.value)
                              }}
                            />
                            <Element.SearchLabel>Search NFT</Element.SearchLabel>
                          </Element.FormFloating>
                        </Element.SearchBox>
                      </Element.WidgetContent>
                    </Element.SearchWidget>

                    <Element.SearchWidget>
                      <Element.WidgetTitle>
                        <h5>Most Favorited</h5>
                      </Element.WidgetTitle>
                      <Element.WidgetWrapper>
                        {
                          favoritedItems.map((item, index) => (
                            <li key={index}>
                              <Link to={`/detail/${item.itemCollection}/${item.tokenId}`}>
                                <img src={item.image} alt="NftItem" loading="lazy" />
                              </Link>
                            </li>
                          ))
                        }
                      </Element.WidgetWrapper>
                    </Element.SearchWidget>
                  </Element.RightSection>
                </GridItem>
              </GridRow>
            </Element.ProfileDetails>
          </div>
        </GridContainer>
      </Element.ProfileSection>
    </Element.ProfilePageWrap>
  );

}

export default Profile;
