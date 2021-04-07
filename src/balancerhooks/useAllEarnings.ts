import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getBalancerEarned, getMasterChefBalancerContract, getBalancerFarms } from '../sushi/utils'
import useSushi from './useSushi'
import useBlock from './useBlock'

const useAllEarnings = () => {
  const [balances, setBalance] = useState([] as Array<BigNumber>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const sushi = useSushi()
  const farms = getBalancerFarms(sushi)
  const masterChefBalancerContract = getMasterChefBalancerContract(sushi)
  const block = useBlock()

  const fetchAllBalances = useCallback(async () => {
    const balances: Array<BigNumber> = await Promise.all(
      farms.map(({ pid }: { pid: number }) =>
        getBalancerEarned(masterChefBalancerContract, pid, account),
      ),
    )
    setBalance(balances)
  }, [account, masterChefBalancerContract, sushi])

  useEffect(() => {
    if (account && masterChefBalancerContract && sushi) {
      fetchAllBalances()
    }
  }, [account, block, masterChefBalancerContract, setBalance, sushi])

  return balances
}

export default useAllEarnings
