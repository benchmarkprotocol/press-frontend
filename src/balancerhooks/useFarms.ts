import { useContext } from 'react'
import { Context as FarmsContext } from '../balancercontexts/BalancerFarms'

const useFarms = () => {
  const { farms } = useContext(FarmsContext)
  return [farms]
}

export default useFarms
