import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { useWallet } from 'use-wallet'

//import chef from '../../assets/img/chef.png'

import Button from '../../components/Button'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import WalletProviderModal from '../../components/WalletProviderModal'

import useModal from '../../hooks/useModal'

import StakeBox from '../StakeBox'
import Spacer from '../../components/Spacer'
import StakeCards from './components/StakeCards'

const Stake: React.FC = () => {
  const { path } = useRouteMatch()
  const { account } = useWallet()
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)
  return (
    <Switch>
      <Page>
        {!!account ? (
          <>
            <Route exact path={path}>
              <PageHeader
                icon={false}
                subtitle="Earn MARK tokens by staking MARK."
                title="Stake"
              />
              <Spacer size="md" />
              {/*<FarmMenus auth={true}/>*/}
              <Spacer size="md" />
              <StakeCards auth={true}/>
            </Route>
            <Route path={`${path}/:farmId`}>
              <StakeBox/>
            </Route>
            <Spacer size="lg" />
          </>
        ) : (
          <>
            <Route exact path={path}>
              <PageHeader
                icon={false}
                subtitle="Earn MARK tokens by staking MARK."
                title="Stake"
              />
              <Spacer size="md" />
              {/*<FarmMenus auth={false}/>*/}
              <Spacer size="md" />
              <StakeCards auth={false}/>
            </Route>
            <Route path={`${path}/:farmId`}>
              <StakeBox/>
            </Route>
            <Spacer size="lg" />
          </>
        )}
      </Page>
    </Switch>
  )
}

export default Stake
