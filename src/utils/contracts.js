/* eslint-disable no-redeclare */
import { BigNumber, ethers } from "ethers";
import { getCollectionContract, getContractInfo, getContractObj, getTokenContract } from ".";

export function isAddress(address) {
    try {
        ethers.utils.getAddress(address);
    } catch (e) { return false; }
    return true;
}

export function toEth(amount) {
    return ethers.utils.formatEther(String(amount), { commify: true });
}

export function toWei(amount) {
    return ethers.utils.parseEther(String(amount));
}

/**
 * Governance Token Contract Management
 */

export async function getTokenBalance(account, tokenAddr, library) {
    if (tokenAddr === '0x0000000000000000000000000000000000000000') {
        // get BNB balance
        var balance = await library.getBalance(account);
        var etherVal = parseFloat(ethers.utils.formatEther(balance));
        return etherVal;
    } else {
        // get token balance
        var Token = getTokenContract(tokenAddr, library.getSigner());
        if (Token) {
            var balance = await Token.balanceOf(account);
            var decimal = await Token.decimals();
            return parseFloat(ethers.utils.formatUnits(String(balance), decimal));
        }
    }
    return 0;
}

export async function isTokenApprovedForMarket(account, tokenAddr, amount, chainId, provider) {
    const marketContract = getContractObj('Market', chainId, provider);
    const tokenContract = getTokenContract(tokenAddr, provider);
    if (!marketContract || !tokenContract) return false
    const allowance = await tokenContract.allowance(account, marketContract.address);
    if (BigNumber.from(toWei(amount)).gt(allowance)) {
        return false;
    }
    return true;
}
export async function isTokenApprovedForAuction(account, tokenAddr, amount, chainId, provider) {
    const auctionContract = getContractObj('Auction', chainId, provider);
    const tokenContract = getTokenContract(tokenAddr, provider);
    if (!auctionContract || !tokenContract) return false

    const allowance = await tokenContract.allowance(account, auctionContract.address);
    if (BigNumber.from(toWei(amount)).gt(allowance)) {
        return false;
    }
    return true;
}

export async function approveTokenForMarket(tokenAddr, chainId, signer) {
    const marketContract = getContractObj('Market', chainId, signer);
    const tokenContract = getTokenContract(tokenAddr, signer);
    if (!marketContract || !tokenContract) return false
    const approveAmount = '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF';
    try {
        const approve_tx = await tokenContract.approve(marketContract.address, approveAmount);
        await approve_tx.wait(1);
        return true;
    } catch (e) {
        console.log(e)
        return false;
    }
}
export async function approveTokenForAuction(tokenAddr, chainId, signer) {
    const auctionContract = getContractObj('Auction', chainId, signer);
    const tokenContract = getTokenContract(tokenAddr, signer);
    if (!auctionContract || !tokenContract) return false

    const approveAmount = '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF';
    try {
        const approve_tx = await tokenContract.approve(auctionContract.address, approveAmount);
        await approve_tx.wait(1);
        return true;
    } catch (e) {
        console.log(e)
        return false;
    }
}




/**
 * NFT Contract Management
 */
export async function isNFTApprovedForMarket(collection, account, chainId, provider) {
    const marketContract = getContractObj('Market', chainId, provider);
    const nftToken = getCollectionContract(collection, chainId, provider);

    return await nftToken.isApprovedForAll(account, marketContract.address);
}
export async function isNFTApprovedForAuction(collection, account, chainId, provider) {
    const auctionContract = getContractObj('Auction', chainId, provider);
    const nftToken = getCollectionContract(collection, chainId, provider);

    return await nftToken.isApprovedForAll(account, auctionContract.address);
}

export async function setNFTApprovalForMarket(collection, approved, chainId, provider) {
    const marketContract = getContractObj('Market', chainId, provider);
    const nftToken = getCollectionContract(collection, chainId, provider);
    try {
        const tx = await nftToken.setApprovalForAll(marketContract.address, approved);
        await tx.wait(1);
        return true;
    } catch (e) {
        console.log(e)
    }
    return false;
}
export async function setNFTApprovalForAuction(collection, approved, chainId, provider) {
    const auctionContract = getContractObj('Auction', chainId, provider);
    const nftToken = getCollectionContract(collection, chainId, provider);
    try {
        const tx = await nftToken.setApprovalForAll(auctionContract.address, approved);
        await tx.wait(1);
        return true;
    } catch (e) {
        console.log(e)
    }
    return false;
}

/**
 * Get creation price
 */
export async function getCreationPrice(collection, chainId, provider) {
    const collectionContract = getCollectionContract(collection, chainId, provider);
    try {
        const price = await collectionContract.mintPrice()
        return parseFloat(ethers.utils.formatUnits(String(price), 18));
    } catch (e) {
        console.log(e)
        return 0;
    }
}


/**
 * Create Item
 */
export async function createItem(collection, uri, mintPrice, chainId, provider) {
    const collectionContract = getCollectionContract(collection, chainId, provider);
    try {
        const tx = await collectionContract.mintTo(uri, { value: toWei(mintPrice).toJSON() })
        const receipt = await tx.wait(2);
        if (receipt.confirmations) {
            return true
        }
        return false;
    } catch (e) {
        console.log(e)
        return false;
    }
}

export async function listItem(collection, owner, nftTokenID, tokenAddr, price, chainId, provider) {
    const marketContract = getContractObj('Market', chainId, provider);
    const marketContractInfo = getContractInfo('Market', chainId);
    if (!marketContract || !marketContractInfo) return false
    try {
        let isApproved = await isNFTApprovedForMarket(collection, owner, chainId, provider);
        if (!isApproved) {
            isApproved = await setNFTApprovalForMarket(collection, true, chainId, provider);
        }
        if (isApproved) {
            const tx = await marketContract.list(collection, nftTokenID, tokenAddr, ethers.utils.parseEther(price));
            const receipt = await tx.wait(2);
            if (receipt.confirmations) {
                return true
            }
        }
        return false;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function delistItem(id, chainId, provider) {
    const marketContract = getContractObj('Market', chainId, provider);
    if (!marketContract) return false
    try {
        const tx = await marketContract.delist(id)
        await tx.wait(2)
        return true
    } catch (e) {
        console.log(e)
        return false
    }
}

export async function buy(account, id, tokenAddr, price, chainId, provider) {
    const marketContract = getContractObj('Market', chainId, provider)
    if (!marketContract) return false
    try {
        if (tokenAddr === '0x0000000000000000000000000000000000000000') {
            const tx = await marketContract.buy(id, {
                value: toWei(price)
            })
            await tx.wait(2)
            return true
        } else {
            let isTokenApproved = await isTokenApprovedForMarket(account, tokenAddr, price, chainId, provider)
            if (!isTokenApproved) {
                isTokenApproved = await approveTokenForMarket(tokenAddr, chainId, provider)
            }
            if (isTokenApproved) {
                const tx = await marketContract.buy(id)
                await tx.wait(2)
                return true
            }
            return false
        }
    } catch (e) {
        console.log(e)
        return false
    }
}

/**
 * Auction Contract Management
 */
export async function createAuction(collection, owner, nftTokenID, tokenAddr, startPrice, startTime, endTime, chainId, provider) {
    const auctionContract = getContractObj('Auction', chainId, provider);
    const auctionContractInfo = getContractInfo('Auction', chainId);
    if (!auctionContract || !auctionContractInfo) return false
    try {
        let isApproved = await isNFTApprovedForAuction(collection, owner, chainId, provider);
        if (!isApproved) {
            isApproved = await setNFTApprovalForAuction(collection, true, chainId, provider);
        }
        if (isApproved) {
            const tx = await auctionContract.createAuction(collection, nftTokenID, tokenAddr, ethers.utils.parseEther(startPrice), startTime, endTime);
            const receipt = await tx.wait(2);
            if (receipt.confirmations) {
                return true
            }
        }
        return false;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function finalizeAuction(id, chainId, provider) {
    const auctionContract = getContractObj('Auction', chainId, provider)
    if (!auctionContract) return false
    try {
        const tx = await auctionContract.finalizeAuction(id)
        await tx.wait(2)
        return true
    } catch (e) {
        console.log(e)
        return false
    }
}

export async function bidOnAuction(account, id, tokenAddr, price, chainId, provider) {
    const auctionContract = getContractObj('Auction', chainId, provider)
    if (!auctionContract) return false
    try {
        if (tokenAddr === '0x0000000000000000000000000000000000000000') {
            const tx = await auctionContract.bidOnAuction(id, ethers.utils.parseEther(price), {
                value: ethers.utils.parseEther(price)
            })
            await tx.wait(2)
            return true
        } else {
            let isTokenApproved = await isTokenApprovedForAuction(account, tokenAddr, price, chainId, provider)
            if (!isTokenApproved) {
                isTokenApproved = await approveTokenForAuction(tokenAddr, chainId, provider)
            }
            if (isTokenApproved) {
                const tx = await auctionContract.bidOnAuction(id, ethers.utils.parseEther(price))
                await tx.wait(2)
                return true
            }
            return false
        }
    } catch (e) {
        console.log(e)
        return false
    }
}