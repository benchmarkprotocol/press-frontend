import React, { useCallback, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'
import useSushi from '../../hooks/useSushi'

import { bnToDec } from '../../utils'
import { getMasterChefBalancerContract, getBalancerEarned } from '../../sushi/utils'
import { getBalancerFarms } from '../../sushi/utils'

import Context from './context'
import { Farm } from './types'

const BalancerFarms: React.FC = ({ children }) => {
  const [unharvested, setUnharvested] = useState(0)

  const sushi = useSushi()
  //const { account } = useWallet()

  const farms = getBalancerFarms(sushi)
  return (
    <Context.Provider
      value={{
        farms,
        unharvested,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default BalancerFarms
