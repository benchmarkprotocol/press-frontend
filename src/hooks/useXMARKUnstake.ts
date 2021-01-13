import { useCallback } from 'react'

import useSushi from './useSushi'
import { useWallet } from 'use-wallet'

import { leaveXMARK, getXMARKContract } from '../sushi/utils'

const useXMARKUnstake = () => {
  const { account } = useWallet()
  const sushi = useSushi()
  const xmarkContract = getXMARKContract(sushi)

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await leaveXMARK(xmarkContract, amount, account)
      console.log(txHash)
    },
    [account, sushi],
  )

  return { onUnstake: handleUnstake }
}

export default useXMARKUnstake
