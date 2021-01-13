import React, { useCallback, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'
import useSushi from '../../hooks/useSushi'

import { bnToDec } from '../../utils'
import { getMasterChefContract, getEarned } from '../../sushi/utils'
import { getStaking } from '../../sushi/utils'

import Context from './context'
import { Stake } from './types'

const Staking: React.FC = ({ children }) => {
  const [unharvested, setUnharvested] = useState(0)
  console.log("IN STAKING")
  const sushi = useSushi()
  //const { account } = useWallet()

  const farms = getStaking(sushi)
  console.log("farms here", farms)
  return (
    <Context.Provider
      value={{
        staking:farms,
        unharvested,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Staking
