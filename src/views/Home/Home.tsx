import React from 'react'
import styled from 'styled-components'
import Button from '../../components/Button'
import Container from '../../components/Container'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import Balances from './components/Balances'
import Countdown from 'react-countdown';

import { useWallet } from 'use-wallet'
const Banner: React.FC = () => {

    return (
      <img src="https://i.imgur.com/TNHL9K8.gif" style={{width:300}}/>
    )
  
}



const Home: React.FC = () => {
  const { account } = useWallet()
  return (
    <Page>
{/*}
<div style={{ width: "100%", overflow: "hidden", height: "4rem", paddingLeft: "100%", boxSizing: "content-box"}}>
<div className="ticker">
  <div className="ticker__item">aaaa</div>
  <div className="ticker__item">bbbbb</div>
  <div className="ticker__item">ccccc</div>
  <div className="ticker__item">dddddd</div>
</div>
</div>*/}

      <PageHeader
        icon={<Banner/>}
        title="The Press"
        subtitle="Farm MARK"
      />


      <Container>
        <Balances />
      </Container>
      <Spacer size="md" />
            <Spacer size="md" />
      <div
        style={{
          margin: '0 auto',
          width: 752
        }}
      >
        <Button pools={true} text="View Pools" to="/pools" variant="secondary" />
      </div>
      <Spacer size="md" />
            <Spacer size="md" />
    </Page>
  )
}
const CountdownWrapper = styled.div`
  font-family: 'Roboto Mono', monospace;
  color: ${(props) => props.theme.color.grey[600]};
  font-size: 18px;
  text-transform:uppercase;
  font-weight: 700;
`
const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.grey[500]};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;

  > b {
    color: ${(props) => props.theme.color.grey[600]};
  }
`




export default Home
