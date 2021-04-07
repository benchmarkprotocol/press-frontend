import { useCallback } from 'react'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'
import { redeemBalancer } from '../sushi/utils'

const useRedeem = (masterChefBalancerContract: Contract) => {
  const { account } = useWallet()

  const handleRedeem = useCallback(async () => {
    const txHash = await redeemBalancer(masterChefBalancerContract, account)
    console.log(txHash)
    return txHash
  }, [account, masterChefBalancerContract])

  return { onRedeem: handleRedeem }
}

export default useRedeem
