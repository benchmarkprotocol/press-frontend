import { useCallback } from 'react'

import useSushi from './useSushi'
import { useWallet } from 'use-wallet'

import { enterXMARK, getXMARKContract } from '../sushi/utils'

const useXMARKStake = () => {
  const { account } = useWallet()
  const sushi = useSushi()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await enterXMARK(
        getXMARKContract(sushi),
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, sushi],
  )

  return { onStake: handleStake }
}

export default useXMARKStake
