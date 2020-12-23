import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import { getMarkPerBlock } from '../sushi/utils'

const useMarkPerBlock = (sushi: Object) => {
  const [markPerBlock, setMarkPerBlock] = useState(0)
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()

  const fetchMPB = useCallback(async () => {
    const amount = await getMarkPerBlock(sushi)
    setMarkPerBlock(amount)
  }, [account, ethereum, sushi])

  useEffect(() => {
    if (account && ethereum) {
      fetchMPB()
    }
  }, [account, ethereum, setMarkPerBlock, sushi])

  return markPerBlock
}

export default useMarkPerBlock
