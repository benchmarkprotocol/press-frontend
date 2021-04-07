import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import { getBalance } from '../utils/erc20'
import useBlock from './useBlock'
import useSushi from './useSushi'
import {getXMARKBalance, getXMARKAddress, getXMARKContract} from './../sushi/utils'

const useTokenBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const block = useBlock()
  const sushi = useSushi()

  const fetchBalance = useCallback(async () => {
    const xmarkAddress = getXMARKAddress(sushi)
    if (tokenAddress == xmarkAddress){
      const xmarkContract = getXMARKContract(sushi)
      var balance = await getXMARKBalance(xmarkContract, account)
    } else {
      var balance = await getBalance(ethereum, tokenAddress, account)
    }
    setBalance(new BigNumber(balance))
  }, [account, ethereum, tokenAddress])

  useEffect(() => {
    if (account && ethereum) {
      fetchBalance()
    }
  }, [account, ethereum, setBalance, sushi, block, tokenAddress])

  return balance
}

export default useTokenBalance
