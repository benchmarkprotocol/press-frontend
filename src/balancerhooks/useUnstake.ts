import { useCallback } from 'react'

import useSushi from './useSushi'
import { useWallet } from 'use-wallet'

import { unstakeBalancer, getMasterChefBalancerContract } from '../sushi/utils'

const useUnstake = (pid: number) => {
  const { account } = useWallet()
  const sushi = useSushi()
  const masterChefBalancerContract = getMasterChefBalancerContract(sushi)

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstakeBalancer(masterChefBalancerContract, pid, amount, account)
      console.log(txHash)
    },
    [account, pid, sushi],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
