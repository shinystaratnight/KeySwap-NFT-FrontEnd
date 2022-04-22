import React from 'react';
import { useHistory } from 'react-router-dom'

import Collapse from '@material-ui/core/Collapse';

import GridContainer from 'components/Grid/GridContainer'
import {
  CollapseWrapper,
  CollapseContent,
  MobileNavLinkList,
  NavLink,
  BuyZonoLink
} from './styles';

const CollapseMenu = (props) => {

  const history = useHistory();
  const { open, handleClose, account, connectAccount, signOut } = props

  return (
    <CollapseWrapper>
      <GridContainer>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <CollapseContent>
            <MobileNavLinkList>
              <NavLink href='/explore' onClick={(e) => { e.preventDefault(); handleClose(); history.push('/explore') }}>
                Explore
              </NavLink>
              <BuyZonoLink
                href='https://keyswap.exchange/swap#/swap?outputCurrency=0x07b1681c082039551952bdee4a505cecc2ff4998'
                target='_blank'
              >
                Buy KEY
              </BuyZonoLink>
              {
                account ?
                  <>
                    <NavLink href='/create' onClick={(e) => { e.preventDefault(); handleClose(); history.push('/create'); }} >Create</NavLink>
                    <NavLink href={`/profile/${account}`} onClick={(e) => { e.preventDefault(); handleClose(); history.push(`/profile/${account}`); }}>My Items</NavLink>
                    <NavLink href='/edit_profile' onClick={(e) => { e.preventDefault(); handleClose(); history.push('/edit_profile'); }} >Edit Profile</NavLink>
                    <NavLink href='/' onClick={(e) => { e.preventDefault(); handleClose(); signOut(); }}>Sign out</NavLink>
                  </>
                  :
                  <NavLink href='/' onClick={(e) => { e.preventDefault(); handleClose(); connectAccount() }}>Sign in</NavLink>
              }
            </MobileNavLinkList>
          </CollapseContent>
        </Collapse>
      </GridContainer>
    </CollapseWrapper>
  )
}

export default CollapseMenu
