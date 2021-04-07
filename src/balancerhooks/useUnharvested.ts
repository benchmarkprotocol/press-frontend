import { useContext } from 'react'
import { Context as FarmsContext } from '../balancercontexts/BalancerFarms'

const useUnharvested = () => {
  const { unharvested } = useContext(FarmsContext)
  return unharvested
}

export default useUnharvested
