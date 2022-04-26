import styled from 'styled-components';
import { Search } from '@styled-icons/boxicons-regular/Search'

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
export const ExploreSection = styled.div`
  padding: 80px 0 75px;
  @media screen and (min-width: 992px) {
    padding: 120px 0 115px;
  }
`
export const SectionHeader = styled.div`
  border: 1px solid var(--bgcolorMaroon);
  margin-bottom: 30px;
  border-radius: 3px;
  background: rgba(0,0,0,.07);
  display: flex;
  flex-wrap: wrap;
  color: #555;
  align-items: center;
  gap: 15px;
  padding: 10px 15px;
  justify-content: center;
  @media screen and (min-width: 992px) {
    padding: 15px;
    justify-content: space-between;
  }
`
export const FilterBox = styled.div`
  flex-wrap: wrap;
  justify-content: center;
  display: flex;
  width: 100%;
  gap: 10px;
  @media screen and (min-width: 992px) {
    width: auto;
  }
  @media screen and (min-width: 768px) {
    gap: 15px;
  }
`
export const FormFloating = styled.div`
  position: relative;
  width: 100%;
  @media screen and (min-width: 576px) {
    width: ${props => props.width ? props.width : '45%'};
  }
  @media screen and (min-width: 992px) {
    width: auto;
  }  
`
export const FormSelect = styled.select`
  background-color: #fff;
  color: #000;  
  height: calc(3.5rem + 2px);
  padding: 1.625rem 0.75rem 0.625rem;
  border: 1px solid rgba(255,255,255,.1);
  display: block;
  width: 100%;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  border-radius: 0.25rem;
  appearance: none;
  margin: 0;
  @media screen and (min-width: 992px) {
    min-width: 200px;
  }
  &:focus {
    outline: none;
    border-color: rgba(81,56,238,.4);
    box-shadow: none;
  }
`
export const SelectLabel = styled.label`
  color: var(--colorMaroon);
  opacity: .8;
  transform: scale(.85) translateY(-0.5rem) translateX(0.15rem);
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  padding: 1rem 0.75rem;
  pointer-events: none;
  border: 1px solid transparent;
  transform-origin: 0 0;
  transition: opacity .1s ease-in-out,transform .1s ease-in-out;
  font-family: "Roboto",sans-serif;
` 
export const SearchBox = styled.div`
  & input:focus~label {
    color: var(--colorMaroon);
    opacity: .8;
    transform: scale(.85) translateY(-0.5rem) translateX(0.15rem);
  }
  @media screen and (max-width: 575px) {
    width: 100%;
  }
`
export const SearchInput = styled.input`  
  height: calc(3.5rem + 2px);
  padding: 1.625rem 0.75rem 0.625rem;
  padding-right: 45px !important;
  display: block;
  width: 100%;
  font-size: 1rem;
  appearance: none;
  border-radius: 0.25rem;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  font-weight: 400;
  line-height: 1.5;
  border: 1px solid rgba(255,255,255,.1);
  &:focus {
    background-color: #fff;
    color: #000;
    border-color: rgba(81,56,238,.4);
    box-shadow: none;
    outline: 0;
  }
  @media screen and (min-width: 992px) {
    min-width: 280px;
  }
`
export const SearchLabel = styled.label`
  color: #000;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  padding: 1rem 0.75rem;
  pointer-events: none; 
  transform-origin: 0 0;
  transition: opacity .1s ease-in-out,transform .1s ease-in-out;
  font-family: "Roboto",sans-serif;
  line-height: 1.5;
`
export const SearchBtn = styled.button`
  cursor: pointer;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  outline: none;
  box-shadow: none;
  position: absolute;
  content: "";
  margin: 0;
`
export const SearchIcon = styled(Search)`
  color: #000;
  font-size: 1.2rem;
  width: 24px;
  height: 24px;
`
export const CardList = styled.div`
  justify-content: center!important;
  display: flex;
  flex-wrap: wrap;
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 1rem;
  margin-top: calc(var(--bs-gutter-y) * -1);
  margin-right: calc(var(--bs-gutter-x)/ -2);
  margin-left: calc(var(--bs-gutter-x)/ -2);
  & > div {
    padding-left: 12px;
    padding-right: 12px;
  }
`
export const LoadMoreBtn = styled.button`
  background: var(--colorMaroon);
  padding: 12px 30px;
  border: 1px solid var(--colorMaroon);
  border-radius: 100px;
  display: inline-block;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 16px;
  &:hover {
    background: #000 !important;
    color: #fff;
  }
`
