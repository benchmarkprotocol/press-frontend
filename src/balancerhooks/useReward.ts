import { useCallback } from 'react'

import useSushi from './useSushi'
import { useWallet } from 'use-wallet'

import { harvestBalancer, getMasterChefBalancerContract } from '../sushi/utils'

const useReward = (pid: number) => {
  const { account } = useWallet()
  const sushi = useSushi()
  const masterChefBalancerContract = getMasterChefBalancerContract(sushi)

  const handleReward = useCallback(async () => {
    const txHash = await harvestBalancer(masterChefBalancerContract, pid, account)
    console.log(txHash)
    return txHash
  }, [account, pid, sushi])

  return { onReward: handleReward }
}

export default useReward
