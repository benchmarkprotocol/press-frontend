import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import useSushi from './useSushi'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { getAllowance } from '../utils/erc20'
import { getXMARKContract, getSushiContract } from '../sushi/utils'

const useAllowance = (lpContract: Contract) => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account }: { account: string; ethereum: provider } = useWallet()
  const sushi = useSushi()
  const xmarkContract = getXMARKContract(sushi)
  const sushiContract = getSushiContract(sushi)

  const fetchAllowance = useCallback(async () => {
    const allowance = await getAllowance(
      sushiContract,
      xmarkContract,
      account,
    )
    setAllowance(new BigNumber(allowance))
  }, [account, xmarkContract, sushiContract])

  useEffect(() => {
    if (account && xmarkContract && sushiContract && lpContract) {
      fetchAllowance()
    }
    let refreshInterval = setInterval(fetchAllowance, 10000)
    return () => clearInterval(refreshInterval)
  }, [account, xmarkContract, lpContract])

  return allowance
}

export default useAllowance
