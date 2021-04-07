import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import useSushi from './useSushi'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { getAllowance } from '../utils/erc20'
import { getMasterChefBalancerContract } from '../sushi/utils'

const useAllowance = (lpContract: Contract) => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account }: { account: string; ethereum: provider } = useWallet()
  const sushi = useSushi()
  const masterChefBalancerContract = getMasterChefBalancerContract(sushi)

  const fetchAllowance = useCallback(async () => {
    const allowance = await getAllowance(
      lpContract,
      masterChefBalancerContract,
      account,
    )
    setAllowance(new BigNumber(allowance))
  }, [account, masterChefBalancerContract, lpContract])

  useEffect(() => {
    if (account && masterChefBalancerContract && lpContract) {
      fetchAllowance()
    }
    let refreshInterval = setInterval(fetchAllowance, 10000)
    return () => clearInterval(refreshInterval)
  }, [account, masterChefBalancerContract, lpContract])

  return allowance
}

export default useAllowance
