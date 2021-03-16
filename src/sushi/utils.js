import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import { supportedPools, supportedStaking } from './lib/constants'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const GAS_LIMIT = {
  STAKING: {
    DEFAULT: 200000,
    SNX: 850000,
  },
}

export const getMasterChefAddress = (sushi) => {
  return sushi && sushi.masterChefAddress
}
export const getMasterChefBalancerAddress = (sushi) => {
  return sushi && sushi.masterChefAddress
}
export const getSushiAddress = (sushi) => {
  return sushi && sushi.sushiAddress
}
export const getXMARKAddress = (sushi) => {
  return sushi && sushi.xmarkAddress
}
export const getWethContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.weth
}
export const getUsdcContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.usdc
}
export const getWbtcContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.wbtc
}
export const getMasterChefContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.masterChef
}
export const getMasterChefBalancerContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.masterChef
}
export const getXMARKContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.xmark
}
export const getSushiContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.sushi
}

export const getFarms = (sushi) => {
  console.log("SUPPORT POOLS", supportedPools)
  return sushi
    ? sushi.contracts.pools.map(
        ({
          pid,
          name,
          symbol,
          icon,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          lpAddress,
          lpContract,
        }) => ({
          pid,
          id: symbol,
          name,
          lpToken: symbol,
          lpTokenAddress: lpAddress,
          lpContract,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          earnToken: 'MARK',
          earnTokenAddress: sushi.contracts.sushi.options.address,
          icon,
        }),
      )
    : supportedPools.map(({
          pid,
          name,
          symbol,
          icon,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          lpAddress,
          lpContract,
        }) => ({
          pid,
          id: symbol,
          name,
          lpToken: symbol,
          lpTokenAddress: lpAddress,
          lpContract,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          earnToken: 'MARK',
          icon,
        }),
      )
}

export const getBalancerFarms = (sushi) => {
  console.log("SUPPORT POOLS", supportedPools)
  return sushi
    ? sushi.contracts.balancerPools.map(
        ({
          pid,
          name,
          symbol,
          icon,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          lpAddress,
          lpContract,
        }) => ({
          pid,
          id: symbol,
          name,
          lpToken: symbol,
          lpTokenAddress: lpAddress,
          lpContract,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          earnToken: 'MARK',
          earnTokenAddress: sushi.contracts.sushi.options.address,
          icon,
        }),
      )
    : supportedBalancerPools.map(({
          pid,
          name,
          symbol,
          icon,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          lpAddress,
          lpContract,
        }) => ({
          pid,
          id: symbol,
          name,
          lpToken: symbol,
          lpTokenAddress: lpAddress,
          lpContract,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          earnToken: 'MARK',
          icon,
        }),
      )
}

export const getStaking = (sushi) => {
  console.log("SUPPORT staking POOLS", supportedPools)
  return sushi
    ? sushi.contracts.staking.map(
        ({
          pid,
          name,
          symbol,
          icon,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          lpAddress,
          lpContract,
        }) => ({
          pid,
          id: symbol,
          name,
          lpToken: symbol,
          lpTokenAddress: lpAddress,
          lpContract,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          earnToken: 'MARK',
          earnTokenAddress: sushi.contracts.sushi.options.address,
          icon,
        }),
      )
    : supportedStaking.map(({
          pid,
          name,
          symbol,
          icon,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          lpAddress,
          lpContract,
        }) => ({
          pid,
          id: symbol,
          name,
          lpToken: symbol,
          lpTokenAddress: lpAddress,
          lpContract,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          earnToken: 'MARK',
          icon,
        }),
      )
}


export const getPoolWeight = async (masterChefContract, pid) => {
  const { allocPoint } = await masterChefContract.methods.poolInfo(pid).call()
  const totalAllocPoint = await masterChefContract.methods
    .totalAllocPoint()
    .call()
  return new BigNumber(allocPoint).div(new BigNumber(totalAllocPoint))
}

export const getBalancerPoolWeight = async (masterChefContract, pid) => {
  const { allocPoint } = await masterChefBalancerContract.methods.poolInfo(pid).call()
  const totalAllocPoint = await masterChefBalancerContract.methods
    .totalAllocPoint()
    .call()
  return new BigNumber(allocPoint).div(new BigNumber(totalAllocPoint))
}

export const getEarned = async (masterChefContract, pid, account) => {
  //console.log("masterchef", masterChefContract, masterChefContract.methods.pendingMark )
  return masterChefContract.methods.pendingMark(pid, account).call();
  //console.log("MARK EARNED", markEarned)
  //return markEarned;
}

export const getBalancerEarned = async (masterChefContract, pid, account) => {
  //console.log("masterchef", masterChefContract, masterChefContract.methods.pendingMark )
  return masterChefBalancerContract.methods.pendingMark(pid, account).call();
  //console.log("MARK EARNED", markEarned)
  //return markEarned;
}

export const getMarkPerBlock = async (sushi) => {
  //console.log("masterchef", masterChefContract, masterChefContract.methods.pendingMark )
  if (sushi && sushi.contracts){
     const markPerBlock = await sushi.contracts.masterChef.methods.markPerBlock().call()
     console.log("MARK PER BLOCK", markPerBlock, new BigNumber(markPerBlock).div(new BigNumber(10).pow(9)).toNumber())
    return new BigNumber(markPerBlock).div(new BigNumber(10).pow(9)).toNumber();
    //console.log("MARK EARNED", markEarned)
    //return markEarned;
  }
}

export const getMarkPerBlockBalancer = async (sushi) => {
  //console.log("masterchef", masterChefContract, masterChefContract.methods.pendingMark )
  if (sushi && sushi.contracts){
     const markPerBlock = await sushi.contracts.masterChefBalancer.methods.markPerBlock().call()
     console.log("MARK PER BLOCK", markPerBlock, new BigNumber(markPerBlock).div(new BigNumber(10).pow(9)).toNumber())
    return new BigNumber(markPerBlock).div(new BigNumber(10).pow(9)).toNumber();
    //console.log("MARK EARNED", markEarned)
    //return markEarned;
  }
}

export const getWBTCPriceFromUniswap = async (wbtcContract, usdcContract) => {

  console.log("CONTRACTS",wbtcContract, usdcContract)

  const lpContractWBTC = await wbtcContract.methods
    .balanceOf("0x004375dff511095cc5a197a54140a24efef3a416")
    .call()

      const lpContractUsdc = await usdcContract.methods
      .balanceOf("0x004375dff511095cc5a197a54140a24efef3a416")
      .call()

      const wBTCAmount = new BigNumber(lpContractWBTC).div(new BigNumber(10).pow(8)).toNumber()

      const usdcAmount = new BigNumber(lpContractUsdc).div(new BigNumber(10).pow(6)).toNumber()

      const wbtcPrice = parseFloat((usdcAmount/wBTCAmount).toFixed(2))

      //console.log("ETH PRICE?", (usdcAmount/wethAmount), wethAmount, usdcAmount )

      return wbtcPrice;
}

export const getEthPriceFromUniswap = async (wethContract, usdcContract) => {


  const lpContractWeth = await wethContract.methods
    .balanceOf("0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc")
    .call()

      const lpContractUsdc = await usdcContract.methods
      .balanceOf("0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc")
      .call()

      const wethAmount = new BigNumber(lpContractWeth).div(new BigNumber(10).pow(18)).toNumber()

      const usdcAmount = new BigNumber(lpContractUsdc).div(new BigNumber(10).pow(6)).toNumber()

      const ethPrice = parseFloat((usdcAmount/wethAmount).toFixed(2))

      //console.log("ETH PRICE?", (usdcAmount/wethAmount), wethAmount, usdcAmount )

      return ethPrice;
}

export const getTotalLPWethValue = async (
  masterChefContract,
  wethContract,
  usdcContract,
  wbtcContract,
  ethPrice,
  lpContract,
  tokenContract,
  pid,
) => {


//console.log("TOKEN/LP contracts", tokenContract, lpContract)
  //console.log("GET TOTAL LP VALUE", pid)
  // Get balance of the token address
  const tokenAmountWholeLP = await tokenContract.methods
    .balanceOf(lpContract.options.address)
    .call()

    //console.log("TOKEN AMOUNT WHOEL LP", pid, tokenAmountWholeLP)
  const tokenDecimals = await tokenContract.methods.decimals().call()

  //console.log("TOKEN DECIMALS", pid, tokenDecimals)
  // Get the share of lpContract that masterChefContract owns
  const balance = await lpContract.methods
    .balanceOf(masterChefContract.options.address)
    .call()

    //console.log("token balance", pid, balance)
  // Convert that into the portion of total lpContract = p1
  const totalSupply = await lpContract.methods.totalSupply().call()

  //console.log("Total supply", pid, totalSupply)
  //console.log("total supply", totalSupply)
  // Get total weth value for the lpContract = w1
  if (!ethPrice || isNaN(ethPrice)){
    ethPrice= await getEthPriceFromUniswap(wethContract, usdcContract)
    console.log("LOADED ETH PRICE FROM UNISWAP")
  }

  if (pid == 1){ // usdc pairs

    ///console.log("USDC PAIR")
    const lpContractUsdc = await usdcContract.methods
      .balanceOf(lpContract.options.address)
      .call()


      //console.log("LP contract USDC", pid, lpContractUsdc)
      
    // Return p1 * w1 * 2
    const portionLp = new BigNumber(balance).div(new BigNumber(totalSupply))
    const lpUsdcWorth = new BigNumber(lpContractUsdc)
    const totalLpUsdcValue = portionLp.times(lpUsdcWorth).times(new BigNumber(2))

    //console.log("TOTAL USDC POOL VALUE", totalLpUsdcValue.div(new BigNumber(10).pow(6)).toString())
    // Calculate
    const tokenAmount = new BigNumber(tokenAmountWholeLP)
      .times(portionLp)
      .div(new BigNumber(10).pow(tokenDecimals))
      //console.log("Token amount", tokenAmount)
    const usdcAmount = new BigNumber(lpContractUsdc)
      .times(portionLp)
      .div(new BigNumber(10).pow(6))

      //console.log("usdc LP VALUE RET", tokenAmount.toString(), usdcAmount.toString(), pid)

     // console.log("USDC TOTAL VALUE", (totalLpUsdcValue).div(new BigNumber(10).pow(6)).toString())
      //console.log("USDC TOKEN PRICE", (usdcAmount).div(tokenAmount).div(ethPrice).toString(), ethPrice)
      //console.log("USDC AMOUNT", usdcAmount.toNumber())

    return {
      tokenAmount,
      totalBalance: new BigNumber(balance),
      wethAmount: usdcAmount.div(ethPrice),
      totalWethValue: (totalLpUsdcValue).div(new BigNumber(10).pow(6)).div(ethPrice),
      tokenPriceInWeth: (usdcAmount).div(tokenAmount).div(ethPrice),
      poolWeight: await getPoolWeight(masterChefContract, pid),
    }
  } else if (pid == 2){ // wbtc pairs


    const wbtcPrice = await getWBTCPriceFromUniswap(wbtcContract, usdcContract);

    ///console.log("USDC PAIR")
    const lpContractWbtc = await wbtcContract.methods
      .balanceOf(lpContract.options.address)
      .call()


      //console.log("LP contract USDC", pid, lpContractUsdc)
      
    // Return p1 * w1 * 2
    const portionLp = new BigNumber(balance).div(new BigNumber(totalSupply))
    const lpWbtcWorth = new BigNumber(lpContractWbtc)
    const totalLpWbtcValue = portionLp.times(lpWbtcWorth).times(new BigNumber(2))

    //console.log("TOTAL USDC POOL VALUE", totalLpUsdcValue.div(new BigNumber(10).pow(6)).toString())
    // Calculate
    const tokenAmount = new BigNumber(tokenAmountWholeLP)
      .times(portionLp)
      .div(new BigNumber(10).pow(tokenDecimals))
      //console.log("Token amount", tokenAmount)
    const wbtcAmount = new BigNumber(lpContractWbtc)
      .times(portionLp)
      .div(new BigNumber(10).pow(8))

      //console.log("usdc LP VALUE RET", tokenAmount.toString(), usdcAmount.toString(), pid)

     // console.log("USDC TOTAL VALUE", (totalLpUsdcValue).div(new BigNumber(10).pow(6)).toString())
      //console.log("USDC TOKEN PRICE", (usdcAmount).div(tokenAmount).div(ethPrice).toString(), ethPrice)
      //console.log("USDC AMOUNT", usdcAmount.toNumber())
      /*console.log({
        wbtcPrice, 
        lpContractWbtc: lpContractWbtc,
        portionLp: portionLp.toNumber(),
        lpWbtcWorth: lpWbtcWorth.toNumber(),
        totalLpWbtcValue: totalLpWbtcValue.toNumber(),

      tokenAmount,
      totalBalance: new BigNumber(balance),
      wethAmount: (wbtcAmount).times(wbtcPrice).div(ethPrice).toNumber(),
      totalWethValue: (totalLpWbtcValue).times(wbtcPrice).div(new BigNumber(10).pow(8)).div(ethPrice).toNumber(),
      tokenPriceInWeth: (wbtcAmount).times(wbtcPrice).div(tokenAmount).div(ethPrice).toNumber(),
      poolWeight: await getPoolWeight(masterChefContract, pid),
    })*/
    return {
      tokenAmount,
      totalBalance: new BigNumber(balance),
      wethAmount: (wbtcAmount).times(wbtcPrice).div(ethPrice),
      totalWethValue: (totalLpWbtcValue).times(wbtcPrice).div(new BigNumber(10).pow(8)).div(ethPrice),
      tokenPriceInWeth: (wbtcAmount).times(wbtcPrice).div(tokenAmount).div(ethPrice),
      poolWeight: await getPoolWeight(masterChefContract, pid),
    }

  } else if (pid == 3){ // balancer usdc pairs

    ///console.log("USDC PAIR")
    const lpContractUsdc = await usdcContract.methods
      .balanceOf(lpContract.options.address)
      .call()


      //console.log("LP contract USDC", pid, lpContractUsdc)
      
    // Return p1 * w1 * 2
    const portionLp = new BigNumber(balance).div(new BigNumber(totalSupply))
    const lpUsdcWorth = new BigNumber(lpContractUsdc)
    const totalLpUsdcValue = portionLp.times(lpUsdcWorth).times(new BigNumber(5))

    //console.log("TOTAL USDC POOL VALUE", totalLpUsdcValue.div(new BigNumber(10).pow(6)).toString())
    // Calculate
    const tokenAmount = new BigNumber(tokenAmountWholeLP)
      .times(portionLp)
      .div(new BigNumber(10).pow(tokenDecimals))
      //console.log("Token amount", tokenAmount)
    const usdcAmount = new BigNumber(lpContractUsdc)
      .times(portionLp)
      .div(new BigNumber(10).pow(6))

      //console.log("usdc LP VALUE RET", tokenAmount.toString(), usdcAmount.toString(), pid)

     // console.log("USDC TOTAL VALUE", (totalLpUsdcValue).div(new BigNumber(10).pow(6)).toString())
      //console.log("USDC TOKEN PRICE", (usdcAmount).div(tokenAmount).div(ethPrice).toString(), ethPrice)
      //console.log("USDC AMOUNT", usdcAmount.toNumber())

    return {
      tokenAmount,
      totalBalance: new BigNumber(balance),
      wethAmount: usdcAmount.div(ethPrice),
      totalWethValue: (totalLpUsdcValue).div(new BigNumber(10).pow(6)).div(ethPrice),
      tokenPriceInWeth: (usdcAmount).div(tokenAmount).div(ethPrice),
      poolWeight: await getPoolWeight(masterChefContract, pid),
    }
  } else if (pid == 4){ // balancer ethereum pool

    const lpContractWeth = await wethContract.methods
      .balanceOf(lpContract.options.address)
      .call()

      //console.log("LP contract weth", pid, lpContractWeth)

      //console.log("lp weth", lpContractWeth)

    // Return p1 * w1 * 2
    const portionLp = new BigNumber(balance).div(new BigNumber(totalSupply))
    const lpWethWorth = new BigNumber(lpContractWeth)
    const totalLpWethValue = portionLp.times(lpWethWorth).times(new BigNumber(5))
    // Calculate
    const tokenAmount = new BigNumber(tokenAmountWholeLP)
      .times(portionLp)
      .div(new BigNumber(10).pow(tokenDecimals))

      //console.log("Token amount", tokenAmount)

    const wethAmount = new BigNumber(lpContractWeth)
      .times(portionLp)
      .div(new BigNumber(10).pow(18))

      //console.log("LP VALUE RET", tokenAmount.toString(), wethAmount.toString(), wethAmount.div(tokenAmount).toString(), pid)
    return {
      tokenAmount,
      totalBalance: new BigNumber(balance),
      wethAmount,
      totalWethValue: totalLpWethValue.div(new BigNumber(10).pow(18)),
      tokenPriceInWeth: wethAmount.div(tokenAmount),
      poolWeight: await getPoolWeight(masterChefContract, pid),
    }
  } else {

    const lpContractWeth = await wethContract.methods
      .balanceOf(lpContract.options.address)
      .call()

      //console.log("LP contract weth", pid, lpContractWeth)

      //console.log("lp weth", lpContractWeth)

    // Return p1 * w1 * 2
    const portionLp = new BigNumber(balance).div(new BigNumber(totalSupply))
    const lpWethWorth = new BigNumber(lpContractWeth)
    const totalLpWethValue = portionLp.times(lpWethWorth).times(new BigNumber(2))
    // Calculate
    const tokenAmount = new BigNumber(tokenAmountWholeLP)
      .times(portionLp)
      .div(new BigNumber(10).pow(tokenDecimals))

      //console.log("Token amount", tokenAmount)

    const wethAmount = new BigNumber(lpContractWeth)
      .times(portionLp)
      .div(new BigNumber(10).pow(18))

      //console.log("LP VALUE RET", tokenAmount.toString(), wethAmount.toString(), wethAmount.div(tokenAmount).toString(), pid)
    return {
      tokenAmount,
      totalBalance: new BigNumber(balance),
      wethAmount,
      totalWethValue: totalLpWethValue.div(new BigNumber(10).pow(18)),
      tokenPriceInWeth: wethAmount.div(tokenAmount),
      poolWeight: await getPoolWeight(masterChefContract, pid),
    }
  }
}






export const getTotalLPWethValueBalancer = async (
  masterChefBalancerContract,
  wethContract,
  usdcContract,
  wbtcContract,
  ethPrice,
  lpContract,
  tokenContract,
  pid,
) => {


//console.log("TOKEN/LP contracts", tokenContract, lpContract)
  //console.log("GET TOTAL LP VALUE", pid)
  // Get balance of the token address
  const tokenAmountWholeLP = await tokenContract.methods
    .balanceOf(lpContract.options.address)
    .call()

    //console.log("TOKEN AMOUNT WHOEL LP", pid, tokenAmountWholeLP)
  const tokenDecimals = await tokenContract.methods.decimals().call()

  //console.log("TOKEN DECIMALS", pid, tokenDecimals)
  // Get the share of lpContract that masterChefContract owns
  const balance = await lpContract.methods
    .balanceOf(masterChefContract.options.address)
    .call()

    //console.log("token balance", pid, balance)
  // Convert that into the portion of total lpContract = p1
  const totalSupply = await lpContract.methods.totalSupply().call()

  //console.log("Total supply", pid, totalSupply)
  //console.log("total supply", totalSupply)
  // Get total weth value for the lpContract = w1
  if (!ethPrice || isNaN(ethPrice)){
    ethPrice= await getEthPriceFromUniswap(wethContract, usdcContract)
    console.log("LOADED ETH PRICE FROM UNISWAP")
  }

  if (pid == 0){ // balancer usdc pairs

    ///console.log("USDC PAIR")
    const lpContractUsdc = await usdcContract.methods
      .balanceOf(lpContract.options.address)
      .call()


      //console.log("LP contract USDC", pid, lpContractUsdc)
      
    // Return p1 * w1 * 2
    const portionLp = new BigNumber(balance).div(new BigNumber(totalSupply))
    const lpUsdcWorth = new BigNumber(lpContractUsdc)
    const totalLpUsdcValue = portionLp.times(lpUsdcWorth).times(new BigNumber(5))

    //console.log("TOTAL USDC POOL VALUE", totalLpUsdcValue.div(new BigNumber(10).pow(6)).toString())
    // Calculate
    const tokenAmount = new BigNumber(tokenAmountWholeLP)
      .times(portionLp)
      .div(new BigNumber(10).pow(tokenDecimals))
      //console.log("Token amount", tokenAmount)
    const usdcAmount = new BigNumber(lpContractUsdc)
      .times(portionLp)
      .div(new BigNumber(10).pow(6))

      //console.log("usdc LP VALUE RET", tokenAmount.toString(), usdcAmount.toString(), pid)

     // console.log("USDC TOTAL VALUE", (totalLpUsdcValue).div(new BigNumber(10).pow(6)).toString())
      //console.log("USDC TOKEN PRICE", (usdcAmount).div(tokenAmount).div(ethPrice).toString(), ethPrice)
      //console.log("USDC AMOUNT", usdcAmount.toNumber())

    return {
      tokenAmount,
      totalBalance: new BigNumber(balance),
      wethAmount: usdcAmount.div(ethPrice),
      totalWethValue: (totalLpUsdcValue).div(new BigNumber(10).pow(6)).div(ethPrice),
      tokenPriceInWeth: (usdcAmount).div(tokenAmount).div(ethPrice),
      poolWeight: await getPoolWeight(masterChefContract, pid),
    }
  } else if (pid == 1){ // balancer ethereum pool

    const lpContractWeth = await wethContract.methods
      .balanceOf(lpContract.options.address)
      .call()

      //console.log("LP contract weth", pid, lpContractWeth)

      //console.log("lp weth", lpContractWeth)

    // Return p1 * w1 * 2
    const portionLp = new BigNumber(balance).div(new BigNumber(totalSupply))
    const lpWethWorth = new BigNumber(lpContractWeth)
    const totalLpWethValue = portionLp.times(lpWethWorth).times(new BigNumber(5))
    // Calculate
    const tokenAmount = new BigNumber(tokenAmountWholeLP)
      .times(portionLp)
      .div(new BigNumber(10).pow(tokenDecimals))

      //console.log("Token amount", tokenAmount)

    const wethAmount = new BigNumber(lpContractWeth)
      .times(portionLp)
      .div(new BigNumber(10).pow(18))

      //console.log("LP VALUE RET", tokenAmount.toString(), wethAmount.toString(), wethAmount.div(tokenAmount).toString(), pid)
    return {
      tokenAmount,
      totalBalance: new BigNumber(balance),
      wethAmount,
      totalWethValue: totalLpWethValue.div(new BigNumber(10).pow(18)),
      tokenPriceInWeth: wethAmount.div(tokenAmount),
      poolWeight: await getPoolWeight(masterChefContract, pid),
    }
  }
}


export const approveBalancer = async (lpContract, masterChefBalancerContract, account) => {
  return lpContract.methods
    .approve(masterChefBalancerContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export const approve = async (lpContract, masterChefContract, account) => {
  return lpContract.methods
    .approve(masterChefContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export const approveXMARK = async (lpContract, masterChefContract, account) => {
  return lpContract.methods
    .approve(masterChefContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export const getSushiSupply = async (sushi) => {
  //console.log("SUSHI CONTARCT", sushi.contracts.sushi)
  let totalSupply = await sushi.contracts.sushi.methods.totalSupply().call();
  console.log("TOTAL SUPPLY ", totalSupply, (new BigNumber(totalSupply)))
  return new BigNumber(totalSupply)
}





export const stake = async (masterChefContract, pid, amount, account) => {

    
  /*console.log("masterChefContract", masterChefContract)
  let PoolInfo = await masterChefContract.methods.poolInfo(0).call();
  console.log("GET POOL INFO", PoolInfo);*/

  console.log("STAKE", pid, amount)
  return masterChefContract.methods
    .deposit(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const stakeBalancer = async (masterChefBalancerContract, pid, amount, account) => {

    
  /*console.log("masterChefContract", masterChefContract)
  let PoolInfo = await masterChefContract.methods.poolInfo(0).call();
  console.log("GET POOL INFO", PoolInfo);*/

  console.log("STAKE", pid, amount)
  return masterChefBalancerContract.methods
    .deposit(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const unstake = async (masterChefContract, pid, amount, account) => {
  return masterChefContract.methods
    .withdraw(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}


export const unstakeBalancer = async (masterChefBalancerContract, pid, amount, account) => {
  return masterChefBalancerContract.methods
    .withdraw(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}


export const harvest = async (masterChefContract, pid, account) => {
  return masterChefContract.methods
    .deposit(pid, '0')
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const harvestBalancer = async (masterChefBalancerContract, pid, account) => {
  return masterChefBalancerContract.methods
    .deposit(pid, '0')
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const getStaked = async (masterChefContract, pid, account) => {
  //console.log("masterChefContract", masterChefContract)
  let PoolInfo = await masterChefContract.methods.poolInfo(0).call();
  //console.log("GET POOL INFO", PoolInfo);
  //console.log("CALLING GET STAKED")
  try {
    const { amount } = await masterChefContract.methods
      .userInfo(pid, account)
      .call()
    return new BigNumber(amount)
  } catch {
    return new BigNumber(0)
  }
}

export const getStakedBalancer = async (masterChefBalancerContract, pid, account) => {
  //console.log("masterChefContract", masterChefContract)
  let PoolInfo = await masterChefBalancerContract.methods.poolInfo(0).call();
  //console.log("GET POOL INFO", PoolInfo);
  //console.log("CALLING GET STAKED")
  try {
    const { amount } = await masterChefBalancerContract.methods
      .userInfo(pid, account)
      .call()
    return new BigNumber(amount)
  } catch {
    return new BigNumber(0)
  }
}

export const redeem = async (masterChefContract, account) => {
  return masterChefContract.methods
    .exit()
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const redeemBalancer = async (masterChefBalancerContract, account) => {
  return masterChefBalancerContract.methods
    .exit()
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const getXMARKBalance = async (xMarkContract, account) => {
  try {
    const amount = await xMarkContract.methods
      .balanceOf(account)
      .call()
      console.log("AMOUNT ", amount, xMarkContract, account)
    return new BigNumber(amount).toString()
  } catch {
    return new BigNumber(0).toString()
  }
}

export const getXMARKStaked = getXMARKBalance;
export const enterXMARK = async (xMarkContract, amount, account) => {

  return xMarkContract.methods
    .enter(
      new BigNumber(amount).times(new BigNumber(10).pow(9)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}
export const leaveXMARK = async (xMarkContract, amount, account) => {
  return xMarkContract.methods
    .leave(
      new BigNumber(amount).times(new BigNumber(10).pow(9)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}


export const getXMARKRewards = async (xMarkContract, sushiContract, account) => {
  const myXMARKBalance = await getXMARKBalance(xMarkContract, account);
  const totalSupplyXMARK = await xMarkContract.methods.totalSupply().call();
  const XMARKBalanceOfMARK = await sushiContract.methods.balanceOf(xMarkContract._address).call();
  const totalRewards = (XMARKBalanceOfMARK)// - totalSupplyXMARK
  const shareOfRewards = myXMARKBalance/totalSupplyXMARK
  const myRewards = (shareOfRewards * totalRewards)
  //console.log(myXMARKBalance, totalSupplyXMARK, XMARKBalanceOfMARK, totalRewards, shareOfRewards, myRewards, xMarkContract.address)
  return myRewards
}


export const getMARKPriceFromUniswap = async (markContract, usdcContract) => {


  const lpContractMARK = await markContract.methods
    .balanceOf("0x7f0ad87b99ba16e6e651120c2e230cf6928c3d15")
    .call()

      const lpContractUsdc = await usdcContract.methods
      .balanceOf("0x7f0ad87b99ba16e6e651120c2e230cf6928c3d15")
      .call()

      const markAmount = new BigNumber(lpContractMARK).div(new BigNumber(10).pow(9)).toNumber()

      const usdcAmount = new BigNumber(lpContractUsdc).div(new BigNumber(10).pow(6)).toNumber()

      const markPrice = parseFloat((usdcAmount/markAmount).toFixed(2))

      //console.log("ETH PRICE?", (usdcAmount/wethAmount), wethAmount, usdcAmount )

      return markPrice;
}

export const getXMARKAPY = async (xMarkContract, sushiContract, usdcContract, account, sushi) => {
  const rewardsPerDay = new BigNumber(1228125000000);
  const businessDaysPerYear = new BigNumber(365);
  const myXMARKBalance = await getXMARKBalance(xMarkContract, account);
  const XMARKBalanceOfMARK = await sushiContract.methods.balanceOf(xMarkContract._address).call();
  const markPrice = await getMARKPriceFromUniswap(sushiContract, usdcContract);
  //console.log("MARK PRICE", markPrice)
  //const rewardValue = (rewardsPerDay*businessDaysPerYear)*shareOfRewards*markPrice
  //const startingValue = (rewardsPerDay*businessDaysPerYear)*shareOfRewards*markPrice
  //console.log("MARK PRICE", markPrice)
  const apy = new BigNumber(markPrice).times(rewardsPerDay.times(businessDaysPerYear)).div(new BigNumber(markPrice).times(XMARKBalanceOfMARK)).times(100)
  return apy
}

export const getMarkStakedValue = async (xMarkContract, sushiContract, usdcContract) => {
  const XMARKBalanceOfMARK = await sushiContract.methods.balanceOf(xMarkContract._address).call();
  const markPrice = await getMARKPriceFromUniswap(sushiContract, usdcContract);
  //console.log("GET STAKED VALUE", XMARKBalanceOfMARK, new BigNumber(XMARKBalanceOfMARK).div(new BigNumber(10).pow(9)).toNumber(), markPrice)
  return (new BigNumber(XMARKBalanceOfMARK).div(new BigNumber(10).pow(9)).toNumber()) * markPrice;
}

export const getXMARKValueInMARK = async (xMarkContract, sushiContract, usdcContract) => {
  const XMARKBalanceOfMARK = await sushiContract.methods.balanceOf(xMarkContract._address).call();
  const XMARKSupply = await xMarkContract.methods.totalSupply().call();
  //console.log("XMARK VALUE ", XMARKBalanceOfMARK, XMARKSupply, (new BigNumber(XMARKBalanceOfMARK).div(new BigNumber(10).pow(9))).div(new BigNumber(XMARKSupply).div(new BigNumber(10).pow(9))).toNumber())
  return (new BigNumber(XMARKBalanceOfMARK).div(new BigNumber(10).pow(9))).div(new BigNumber(XMARKSupply).div(new BigNumber(10).pow(9))).toNumber();
}



