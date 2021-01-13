import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getXMARKStaked, getSushiContract, getXMARKContract, getXMARKRewards } from '../sushi/utils'
import useSushi from './useSushi'
import useBlock from './useBlock'

const useXMARKRewards = () => {
  const [rewards, setRewards] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const sushi = useSushi()
  const XMARKContract = getXMARKContract(sushi)
  const sushiContract = getSushiContract(sushi)
  const block = useBlock()

  const fetchRewards = useCallback(async () => {
    const balance = await getXMARKRewards(XMARKContract, sushiContract, account)
    setRewards(new BigNumber(balance))
  }, [account, sushi])

  useEffect(() => {
    if (account && sushi) {
      fetchRewards()
    }
  }, [account, setRewards, block, sushi, sushiContract, XMARKContract])

  return rewards
}

export default useXMARKRewards
