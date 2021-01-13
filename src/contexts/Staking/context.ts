import { createContext } from 'react'
import { StakingContext } from './types'

const context = createContext<StakingContext>({
  staking: [],
  unharvested: 0,
})

export default context
