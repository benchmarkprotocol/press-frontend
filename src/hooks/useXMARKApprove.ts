import { useCallback } from 'react'

import useSushi from './useSushi'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { approveXMARK, getXMARKContract, getSushiContract } from '../sushi/utils'

const useApprove = (lpContract: Contract) => {
  const { account }: { account: string; ethereum: provider } = useWallet()
  const sushi = useSushi()
  const xmarkContract = getXMARKContract(sushi)
  const sushiContract = getSushiContract(sushi)


  const handleApprove = useCallback(async () => {
    try {
      const tx = await approveXMARK(sushiContract, xmarkContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, xmarkContract])

  return { onApprove: handleApprove }
}

export default useApprove
