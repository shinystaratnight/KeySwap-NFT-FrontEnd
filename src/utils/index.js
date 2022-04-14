import { Contract } from '@ethersproject/contracts'
import TokenABI from '../contracts/Token.json'
import NFTCollectionABI from '../contracts/NFTCollection.json'
import MarketABI from '../contracts/Market.json'
import AuctionABI from '../contracts/Auction.json'

export const currentNetwork = process.env.REACT_APP_NETWORK_ID;

export const CONTRACTS_BY_NETWORK = {
  [currentNetwork]: {
    NFTCollection: {
      address: "0x30D8ca4A66e93D2a46F230CD783C7c426c144223",
      abi: NFTCollectionABI,
    },
    Market: {
      address: "0xf0511c4eaed3864940e4ab8ed28cdc8fee9c4e1b",
      abi: MarketABI
    },
    Auction: {
      address: "0x6637edb1be29574743cf142fc0f5c0a9b3e6553d",
      abi: AuctionABI
    }
  },  
}

export const currencies = [
  {symbol: 'BNB', address: '0x0000000000000000000000000000000000000000'},
  {symbol: 'KEY', address: '0x07b1681c082039551952bdee4a505cecc2ff4998'}
];

export function getCurrencyInfo(_address){
  for (let index = 0; index < currencies.length; index++) {
    const currencyInfo = currencies[index];
    if (currencyInfo.address.toLowerCase() === _address.toLowerCase()) {
      return currencyInfo;
    }
  }
  return null;
}

export function getContractInfo(name, chainId = null) {
  if(!chainId) chainId = currentNetwork;

  const contracts = CONTRACTS_BY_NETWORK?.[chainId];  
  if(contracts) {
    return contracts?.[name];
  }else{
    return null;
  }
}

export function getContractObj(name, chainId, provider) {
  const info = getContractInfo(name, chainId);
  return !!info && new Contract(info.address, info.abi, provider);
}

export function getTokenContract(address, provider) {  
  return new Contract(address, TokenABI, provider);
}

export function getCollectionContract(address, chainId, provider) {
  const info = getContractInfo('NFTCollection', chainId);
  return !!info && new Contract(address, info.abi, provider);
}

export const shorter = (str) =>
  str?.length > 8 ? str.slice(0, 6) + '...' + str.slice(-4) : str

export function formatNum(value) {
  let intValue = Math.floor(value)
  if (intValue < 10) {
    return ''+ parseFloat(value).toFixed(2)
  } else if (intValue < 1000){
    return '' + intValue
  } else if (intValue < 1000000) {
    return parseFloat(intValue/1000).toFixed(1) + 'K'
  } else if (intValue < 1000000000) {
    return parseFloat(intValue/1000000).toFixed(1) + 'M'
  } else {
    return parseFloat(intValue/1000000000).toFixed(1) + 'B'
  }
}
