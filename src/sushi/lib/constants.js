import BigNumber from 'bignumber.js/bignumber'

export const SUBTRACT_GAS_LIMIT = 100000

const ONE_MINUTE_IN_SECONDS = new BigNumber(60)
const ONE_HOUR_IN_SECONDS = ONE_MINUTE_IN_SECONDS.times(60)
const ONE_DAY_IN_SECONDS = ONE_HOUR_IN_SECONDS.times(24)
const ONE_YEAR_IN_SECONDS = ONE_DAY_IN_SECONDS.times(365)

export const INTEGERS = {
  ONE_MINUTE_IN_SECONDS,
  ONE_HOUR_IN_SECONDS,
  ONE_DAY_IN_SECONDS,
  ONE_YEAR_IN_SECONDS,
  ZERO: new BigNumber(0),
  ONE: new BigNumber(1),
  ONES_31: new BigNumber('4294967295'), // 2**32-1
  ONES_127: new BigNumber('340282366920938463463374607431768211455'), // 2**128-1
  ONES_255: new BigNumber(
    '115792089237316195423570985008687907853269984665640564039457584007913129639935',
  ), // 2**256-1
  INTEREST_RATE_BASE: new BigNumber('1e18'),
}
/*
export const addressMap = {
  uniswapFactory: '0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95',
  uniswapFactoryV2: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
  YFI: '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e',
  YCRV: '0xdF5e0e81Dff6FAF3A7e52BA697820c5e32D806A8',
  UNIAmpl: '0xc5be99a02c6857f9eac67bbce58df5572498f40c',
  WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  UNIRouter: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
  LINK: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
  MKR: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
  SNX: '0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F',
  COMP: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
  LEND: '0x80fB784B7eD66730e8b1DBd9820aFD29931aab03',
  SUSHIYCRV: '0x2C7a51A357d5739C5C74Bf3C96816849d2c9F726',
}*/

export const contractAddresses = {
  sushi: {
    1: '0x67c597624B17b16fb77959217360B7cD18284253', //mark token contract
    4: '0x5b0aCa386EE6bd89f917d8278047c9DCda04F61A',
  },
  masterChef: {
    1: '0x5D9972dD3Ba5602574ABeA6bF9E1713568D49903', // press contract
    4: '0x853C75720Eba5c1173eA6E127F755F139500B733', // press contract
  },
  masterChefBalancer: {
    1: '0x321849C98b28756274443287653607Ec5D747b8F', // press contract
    4: '0x853C75720Eba5c1173eA6E127F755F139500B733', // press contract
  },
  xmark:{
    1:"0x36b679bd64Ed73DBfd88909cDCB892cB66Bd4CBb",
    4:"0xa00731DE69ECE9a1B4116A4D6595af42611caCFB",
  },
  weth: {
    1: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    4: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  },
  usdc:{
    1: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    4: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  },
  wbtc:{
    1:'0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
    4: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  }
}

/*
UNI-V2 LP Address on mainnet for reference
==========================================
0  USDT 0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852
1  USDC 0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc
2  DAI  0xa478c2975ab1ea89e8196811f51a7b7ade33eb11
3  sUSD 0xf80758ab42c3b07da84053fd88804bcb6baa4b5c
4  COMP 0xcffdded873554f362ac02f8fb1f02e5ada10516f
5  LEND 0xab3f9bf1d81ddb224a2014e98b238638824bcf20
6  SNX  0x43ae24960e5534731fc831386c07755a2dc33d47
7  UMA  0x88d97d199b9ed37c29d846d00d443de980832a22
8  LINK 0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974
9  BAND 0xf421c3f2e695c2d4c0765379ccace8ade4a480d9
10 AMPL 0xc5be99a02c6857f9eac67bbce58df5572498f40c
11 YFI  0x2fdbadf3c4d5a8666bc06645b8358ab803996e28
12 SUSHI 0xce84867c3c02b05dc570d0135103d3fb9cc19433
*/

export const supportedPools = [
  {
    pid: 0,
    lpAddresses: {
      1: '0x6f23d2fedb4ff4f1e9f8c521f66e5f2a1451b6f3',
    },
    tokenAddresses: {
      1: '0x67c597624B17b16fb77959217360B7cD18284253',
    },
    name: 'MARK-ETH',
    symbol: 'MARK-ETH UNI-V2 LP',
    tokenSymbol: 'MARK',
    icon: 'MARK',
    lpAddress: '0x6f23d2fedb4ff4f1e9f8c521f66e5f2a1451b6f3',
    tokenAddress:'0x67c597624B17b16fb77959217360B7cD18284253'
  },
  {
    pid: 1,
    lpAddresses: {
      1: '0x7f0ad87b99ba16e6e651120c2e230cf6928c3d15',
    },
    tokenAddresses: {
      1: '0x67c597624B17b16fb77959217360B7cD18284253',
    },
    name: 'MARK-USDC',
    symbol: 'MARK-USDC UNI-V2 LP',
    tokenSymbol: 'MARK',
    icon: 'MARK',
    lpAddress: '0x7f0ad87b99ba16e6e651120c2e230cf6928c3d15',
    tokenAddress:'0x67c597624B17b16fb77959217360B7cD18284253'
  },
  {
    pid:2,
    lpAddresses:{
      1: '0x36cD8c1A21b0b7d86A26cE1221f5a48b80FE27c4',
    },
    tokenAddresses: {
      1: '0x67c597624B17b16fb77959217360B7cD18284253',
    },
    name: 'WBTC-MARK',
    symbol: 'WBTC-MARK UNI-V2 LP',
    tokenSymbol: 'MARK',
    icon: 'MARK',
    lpAddress: '0x36cD8c1A21b0b7d86A26cE1221f5a48b80FE27c4',
    tokenAddress:'0x67c597624B17b16fb77959217360B7cD18284253'
  },
  
 /* {
    pid:3,
    lpAddresses:{
      1: '0x8d5bd8407a55110a346ea0c8ac54c9511764ee22',
    },
    tokenAddresses: {
      1: '0x67c597624B17b16fb77959217360B7cD18284253',
    },
    name: 'MARK-USDC',
    symbol: 'MARK-USDC BAL LP',
    tokenSymbol: 'MARK',
    icon: 'MARK',
    lpAddress: '0x8d5bd8407a55110a346ea0c8ac54c9511764ee22',
    tokenAddress:'0x67c597624B17b16fb77959217360B7cD18284253'
  },
  {
    pid:4,
    lpAddresses:{
      1: '0x049c586132110f6551d758deb50a7c984fc0ec59',
    },
    tokenAddresses: {
      1: '0x67c597624B17b16fb77959217360B7cD18284253',
    },
    name: 'MARK-ETH',
    symbol: 'MARK-ETH BAL LP',
    tokenSymbol: 'MARK',
    icon: 'MARK',
    lpAddress: '0x049c586132110f6551d758deb50a7c984fc0ec59',
    tokenAddress:'0x67c597624B17b16fb77959217360B7cD18284253'
  }*/
]

export const supportedBalancerPools = [
  {
    pid:0,
    lpAddresses:{
      1: '0x049c586132110f6551d758deb50a7c984fc0ec59',
    },
    tokenAddresses: {
      1: '0x67c597624B17b16fb77959217360B7cD18284253',
    },
    name: 'MARK-ETH',
    symbol: 'MARK-ETH BAL LP',
    tokenSymbol: 'MARK',
    icon: 'MARK',
    lpAddress: '0x049c586132110f6551d758deb50a7c984fc0ec59',
    tokenAddress:'0x67c597624B17b16fb77959217360B7cD18284253'
  },
  {
    pid:1,
    lpAddresses:{
      1: '0x8d5bd8407a55110a346ea0c8ac54c9511764ee22',
    },
    tokenAddresses: {
      1: '0x67c597624B17b16fb77959217360B7cD18284253',
    },
    name: 'MARK-USDC',
    symbol: 'MARK-USDC BAL LP',
    tokenSymbol: 'MARK',
    icon: 'MARK',
    lpAddress: '0x8d5bd8407a55110a346ea0c8ac54c9511764ee22',
    tokenAddress:'0x67c597624B17b16fb77959217360B7cD18284253'
  }
]

export const supportedStaking = [
  {
    pid: 0,
    lpAddresses: {
      1: '0x6f23d2fedb4ff4f1e9f8c521f66e5f2a1451b6f3',
    },
    tokenAddresses: {
      1: '0x67c597624B17b16fb77959217360B7cD18284253',
    },
    name: 'MARK',
    symbol: 'MARK',
    tokenSymbol: 'MARK',
    icon: 'MARK',
    lpAddress: '0x6f23d2fedb4ff4f1e9f8c521f66e5f2a1451b6f3',
    tokenAddress:'0x67c597624B17b16fb77959217360B7cD18284253'
  },
]
