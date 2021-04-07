import { useCallback } from 'react'

import useSushi from './useSushi'
import { useWallet } from 'use-wallet'

import { stakeBalancer, getMasterChefBalancerContract } from '../sushi/utils'

const useStake = (pid: number) => {
  const { account } = useWallet()
  const sushi = useSushi()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stakeBalancer(
        getMasterChefBalancerContract(sushi),
        pid,
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, pid, sushi],
  )

  return { onStake: handleStake }
}

export default useStake
