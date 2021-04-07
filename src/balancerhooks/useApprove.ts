import { useCallback } from 'react'

import useSushi from './useSushi'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { approve, getMasterChefBalancerContract } from '../sushi/utils'

const useApprove = (lpContract: Contract) => {
  const { account }: { account: string; ethereum: provider } = useWallet()
  const sushi = useSushi()
  const masterChefBalancerContract = getMasterChefBalancerContract(sushi)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, masterChefBalancerContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, masterChefBalancerContract])

  return { onApprove: handleApprove }
}

export default useApprove
