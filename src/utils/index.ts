import { Contract } from '@ethersproject/contracts'
import NanaiNFTABI from 'contracts/NanaiNFT.json'

export const Networks = {
  MainNet: 56,
  Testnet: 97,
  Rinkeby: 4,
  Kovan: 42,
}

export const CONTRACTS_BY_NETWORK = {
  [Networks.MainNet]: {
    NanaiNFT: {
      address: '0x495a3512678ad8c68592eef58bd7b4996fab2e36',
      abi: NanaiNFTABI,
    }
  },
  [Networks.Testnet]: {
    NanaiNFT: {
      address: '0x791d3D1b83dA4fdCc03e67393d78028e19771116',
      abi: NanaiNFTABI,
    }
  },
  [Networks.Rinkeby]: {
    NanaiNFT: {
      address: '0xE41367745bfA0fCeBDaB4840ED8ED7364F894943',
      abi: NanaiNFTABI,
    }
  },
  [Networks.Kovan]: {
    NanaiNFT: {
      address: '0x6296af0f175b2e76e953ed3450ae5d16a460cfd5',
      abi: NanaiNFTABI,
    }
  },
}

export const currentNetwork = process.env.REACT_APP_NETWORK_ID;

export const baseApiUrl = process.env.REACT_APP_API_URL;

export function getContractInfo(name, chainId = null) {
  if (!chainId) chainId = currentNetwork;

  const contracts = CONTRACTS_BY_NETWORK?.[chainId];
  if (contracts) {
    return contracts?.[name];
  } else {
    return null;
  }
}

export function truncateWalletString(walletAddress) {
  if (!walletAddress) return walletAddress;
  const lengthStr = walletAddress.length;
  const startStr = walletAddress.substring(0, 7);
  const endStr = walletAddress.substring(lengthStr - 7, lengthStr);
  return startStr + '...' + endStr;
}

export function truncateHashString(txhash) {
  if (!txhash) return txhash;
  const lengthStr = txhash.length;
  const startStr = txhash.substring(0, 10);
  const endStr = txhash.substring(lengthStr - 10, lengthStr);
  return startStr + '...' + endStr;
}

export function getContractObj(name, chainId, provider) {
  const info = getContractInfo(name, chainId);
  return !!info && new Contract(info.address, info.abi, provider);
}

export const shorter = (str) =>
  str?.length > 8 ? str.slice(0, 6) + '...' + str.slice(-4) : str
