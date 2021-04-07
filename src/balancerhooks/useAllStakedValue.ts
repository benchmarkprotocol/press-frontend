import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'

import {
  getMasterChefBalancerContract,
  getWethContract,
  getWbtcContract,
  getBalancerFarms,
  getTotalLPWethValueBalancer,
  getUsdcContract
} from '../sushi/utils'
import useSushi from './useSushi'
import useBlock from './useBlock'
import useEthPrice from './useEthPrice'
export interface StakedValue {
  tokenAmount: BigNumber
  wethAmount: BigNumber
  totalWethValue: BigNumber
  tokenPriceInWeth: BigNumber
  poolWeight: BigNumber
  totalBalance:BigNumber
}

const useAllStakedValue = () => {
  const [balances, setBalance] = useState([] as Array<StakedValue>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const sushi = useSushi()
  const farms = getBalancerFarms(sushi)
  const masterChefBalancerContract = getMasterChefBalancerContract(sushi)
  const wethContact = getWethContract(sushi)
  const usdcContact = getUsdcContract(sushi)
  const wbtcContact = getWbtcContract(sushi)
  const block = useBlock()
  const ethPrice = useEthPrice();

  console.log("BAL FARMS", farms)

  const fetchAllStakedValue = useCallback(async () => {
    const balances: Array<StakedValue> = await Promise.all(
      farms.map(
        ({
          pid,
          lpContract,
          tokenContract,
        }: {
          pid: number
          lpContract: Contract
          tokenContract: Contract
        }) =>
          getTotalLPWethValueBalancer(
            masterChefBalancerContract,
            wethContact,
            usdcContact,
            wbtcContact,
            ethPrice,
            lpContract,
            tokenContract,
            pid,
          ),
      ),
    )

    setBalance(balances)
  }, [account, masterChefBalancerContract, sushi, ethPrice])

  useEffect(() => {
    if (account && masterChefBalancerContract && sushi) {
      fetchAllStakedValue()
      console.log("BALANCES FROM GET STAKED VALUE", balances)
    }
  }, [account, block, masterChefBalancerContract, setBalance, sushi, ethPrice])

  return balances
}

export default useAllStakedValue
