import { useContext } from 'react'
import { Context as StakingContext } from '../contexts/Staking'

const useStaking = () => {
	console.log("here", StakingContext, useContext(StakingContext))
  const { staking } = useContext(StakingContext)
  return [staking]
}

export default useStaking
