import styled from 'styled-components'

import HeaderBanner from 'assets/images/pg-header-banner.jpg'

export const Header = styled.div`
  padding: 120px 0;
  background-image: url(${HeaderBanner});
  background-size: cover;
  @media screen and (max-width: 991px) {
    padding: 60px 0;
  }
`
export const PageTitle = styled.h2`
  font-weight: 600;
  color: #000;
  font-size: calc(1.375rem + 1.5vw);;
  margin-bottom: 0;
  text-align: center;
  @media screen and (min-width: 1200px) {
    font-size: 2.5rem;
  }
`
