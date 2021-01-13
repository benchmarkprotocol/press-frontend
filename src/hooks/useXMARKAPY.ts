import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getXMARKStaked, getSushiContract, getXMARKContract, getXMARKAPY, getUsdcContract} from '../sushi/utils'
import useSushi from './useSushi'
import useBlock from './useBlock'

const useXMARKAPY = () => {
  const [rewards, setRewards] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const sushi = useSushi()
  const XMARKContract = getXMARKContract(sushi)
  const sushiContract = getSushiContract(sushi)
  const usdcContract = getUsdcContract(sushi)
  const block = useBlock()

  const fetchRewards = useCallback(async () => {
    const balance = await getXMARKAPY(XMARKContract, sushiContract, usdcContract, account, sushi)
    setRewards(new BigNumber(balance))
  }, [account, sushi])

  useEffect(() => {
    if (account && sushi) {
      fetchRewards()
    }
  }, [account, setRewards, block, sushi, sushiContract, XMARKContract, usdcContract])

  return rewards
}

export default useXMARKAPY
