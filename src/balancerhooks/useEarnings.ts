import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getBalancerEarned, getMasterChefBalancerContract } from '../sushi/utils'
import useSushi from './useSushi'
import useBlock from './useBlock'

const useEarnings = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const sushi = useSushi()
  const masterChefBalancerContract = getMasterChefBalancerContract(sushi)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getBalancerEarned(masterChefBalancerContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, masterChefBalancerContract, sushi])

  useEffect(() => {
    if (account && masterChefBalancerContract && sushi) {
      fetchBalance()
    }
  }, [account, block, masterChefBalancerContract, setBalance, sushi])

  return balance
}

export default useEarnings
