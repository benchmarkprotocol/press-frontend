import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getXMARKStaked, getXMARKContract } from '../sushi/utils'
import useSushi from './useSushi'
import useBlock from './useBlock'

const useXMARKStakedBalance = () => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const sushi = useSushi()
  const XMARKContract = getXMARKContract(sushi)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getXMARKStaked(XMARKContract, account)
    setBalance(new BigNumber(balance))
  }, [account, sushi])

  useEffect(() => {
    if (account && sushi) {
      fetchBalance()
    }
  }, [account, setBalance, block, sushi])

  return balance
}

export default useXMARKStakedBalance
