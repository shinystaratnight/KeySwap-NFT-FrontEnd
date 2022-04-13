import React from 'react';
import * as S from './styles';
import Menu from "./Menu";

const Sidebar = ({history, closeMini, account, connectAccount, signOut}) => {

  return (
    <S.Container>
      <S.Navbar>
        <S.CloseContainer><S.CloseBtn size={30} onClick={() => (closeMini())}/></S.CloseContainer>
        <S.Menus>
          <Menu onClick={() => {closeMini(); history.push('/'); }} label="MarketPlace" />
          <div style = {{marginBottom: '32px'}}>
            <S.LinkBuy href={"https://keyswap.exchange/swap#/swap?outputCurrency=0x07b1681c082039551952bdee4a505cecc2ff4998"} target="_blank">Buy KEY</S.LinkBuy>
          </div>
          {
            account ?
              <>
                <Menu onClick={() => {closeMini(); history.push('/create');}} label="Create"/>
                <Menu onClick={() => {closeMini(); history.push(`/profile/${account}`); }} label="My Items"/>
                <Menu onClick={() => {closeMini(); history.push('/edit_profile'); }} label="Edit Profile"/>
                <Menu onClick={() => {closeMini(); signOut();}} label="Sign out"/>
              </>
                :
            <Menu onClick={() => {closeMini(); connectAccount()}} label="Sign in" />
          }
        </S.Menus>
      </S.Navbar>
    </S.Container>
  );
};

export default Sidebar;
