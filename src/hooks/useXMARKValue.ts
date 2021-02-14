import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getXMARKValueInMARK, getXMARKContract, getSushiContract, getUsdcContract } from '../sushi/utils'
import useSushi from './useSushi'
import useBlock from './useBlock'

const useXMARKValue = () => {
  const [balance, setBalance] = useState(0)
  const { account }: { account: string } = useWallet()
  const sushi = useSushi()
  const XMARKContract = getXMARKContract(sushi)
  const MARKContract = getSushiContract(sushi)
  const usdcContract = getUsdcContract(sushi)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getXMARKValueInMARK(XMARKContract, MARKContract, usdcContract)
    setBalance(balance)
  }, [account, sushi])

  useEffect(() => {
    if (account && sushi) {
      fetchBalance()
    }
  }, [account, setBalance, block, sushi])

  return balance
}

export default useXMARKValue
