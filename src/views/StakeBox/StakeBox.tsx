import React, { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import useFarm from '../../hooks/useFarm'
import useRedeem from '../../hooks/useRedeem'
import useSushi from '../../hooks/useSushi'
import { getMasterChefContract, getXMARKAddress } from '../../sushi/utils'
import { getContract } from '../../utils/erc20'
import Stake from './components/Stake'
import Claim from './components/Claim'
import Card from '../../components/Card'
import CardContent from '../../components/CardContent'
import { NavLink } from 'react-router-dom'
import Page from '../../components/Page'
const Flip = require('react-reveal/Flip');
const StakeBox: React.FC = () => {
  const farmId  = '0'
  const {
    pid,
    lpToken,
    lpTokenAddress,
    tokenAddress,
    earnToken,
    name,
    icon,
  } = useFarm(farmId) || {
    pid: 0,
    lpToken: '',
    lpTokenAddress: '',
    tokenAddress: '',
    earnToken: '',
    name: '',
    icon: '',
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const sushi = useSushi()
  const { ethereum } = useWallet()
  const xmarkAddress = getXMARKAddress();
  const lpContract = useMemo(() => {
    return getContract(ethereum as provider, xmarkAddress)
  }, [ethereum, xmarkAddress])

  const { onRedeem } = useRedeem(getMasterChefContract(sushi))

  const lpTokenName = useMemo(() => {
    return lpToken.toUpperCase()
  }, [lpToken])

  const earnTokenName = useMemo(() => {
    return earnToken.toUpperCase()
  }, [earnToken])

  return (
    <Page>
    <Spacer />
      
      <PageHeader
        icon={false}
        subtitle={`Stake MARK for xMARK`}
        title={"xMARK"}
      />

      <StyledFarm>
        <StyledCardsWrapper>

        
<StyledCardWrapper>
<Card>
             


      <CardContent>
            <Claim
              lpContract={lpContract}
              pid={0}
              tokenName={"xMARK"}
              name={"xMARK"}
            />
          <Spacer />
                
      </CardContent>
      </Card>
</StyledCardWrapper>
<Spacer size="lg" />
          <StyledCardWrapper>
              <Card>
             


      <CardContent>
            <Stake
              lpContract={lpContract}
              pid={0}
              tokenName={"MARK"}
              name={"MARK"}
            />
          <Spacer />
                
      </CardContent>
      </Card>


          </StyledCardWrapper>
        </StyledCardsWrapper>
            

        <Spacer size="lg" />
        <Spacer size="lg" />
      </StyledFarm>
    </Page>
  )
}

const StyledFarm = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 800px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  position:relative;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.grey[400]};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
`

export default StakeBox
