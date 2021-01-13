import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getMarkStakedValue, getXMARKContract, getSushiContract, getUsdcContract } from '../sushi/utils'
import useSushi from './useSushi'
import useBlock from './useBlock'

const useAllMARKStakedValue = () => {
  const [balance, setBalance] = useState(0)
  const { account }: { account: string } = useWallet()
  const sushi = useSushi()
  const XMARKContract = getXMARKContract(sushi)
  const MARKContract = getSushiContract(sushi)
  const usdcContract = getUsdcContract(sushi)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getMarkStakedValue(XMARKContract, MARKContract, usdcContract)
    setBalance(balance)
  }, [account, sushi])

  useEffect(() => {
    if (account && sushi) {
      fetchBalance()
    }
  }, [account, setBalance, block, sushi])

  return balance
}

export default useAllMARKStakedValue
