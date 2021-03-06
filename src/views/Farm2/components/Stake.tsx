import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Contract } from 'web3-eth-contract'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import IconButton from '../../../components/IconButton'
import { AddIcon } from '../../../components/icons'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import useAllowance from '../../../balancerhooks/useAllowance'
import useApprove from '../../../balancerhooks/useApprove'
import useModal from '../../../balancerhooks/useModal'
import useStake from '../../../balancerhooks/useStake'
import useStakedBalance from '../../../balancerhooks/useStakedBalance'
import useTokenBalance from '../../../balancerhooks/useTokenBalance'
import useUnstake from '../../../balancerhooks/useUnstake'
import { getBalanceNumber } from '../../../utils/formatBalance'
import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'

interface StakeProps {
  lpContract: Contract
  pid: number
  tokenName: string,
  name: string
}

const Stake: React.FC<StakeProps> = ({ lpContract, pid, tokenName, name }) => {
  const [requestedApproval, setRequestedApproval] = useState(false)

  const allowance = useAllowance(lpContract)
  const { onApprove } = useApprove(lpContract)

  const tokenBalance = useTokenBalance(lpContract.options.address)
  const stakedBalance = useStakedBalance(pid)

  const { onStake } = useStake(pid)
  const { onUnstake } = useUnstake(pid)

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      onConfirm={onStake}
      tokenName={tokenName}
    />,
  )

  const [onPresentWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={onUnstake}
      tokenName={tokenName}
    />,
  )

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false)
      }
    } catch (e) {
      console.log(e)
    }
  }, [onApprove, setRequestedApproval])

  return (

      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>

            { name.split("-")[0] == "WBTC" ?
              <div style={{ position:"relative"}}>
                <img src={require(`./../../../assets/img/${name.split("-")[1]}.png`)} style={{width:50, height:50, marginLeft:15, marginRight:15, marginBottom:12}}/>
                <img src={require(`./../../../assets/img/${name.split("-")[0]}.png`)} style={{width:30, height:30, margin:8, position:"absolute", bottom:0, right:-10}}/>
              </div>
              :
              <div style={{ position:"relative"}}>
                <img src={require(`./../../../assets/img/${name.split("-")[0]}.png`)} style={{width:50, height:50, marginLeft:15, marginRight:15, marginBottom:12}}/>
                <img src={require(`./../../../assets/img/${name.split("-")[1]}.png`)} style={{width:30, height:30, margin:8, position:"absolute", bottom:0, right:-10}}/>
              </div>
            }
            <StyledActionSpacer />
            <Value value={getBalanceNumber(stakedBalance, 18)} decimals={2}/>
            
            <StyledActionSpacer/>
            <Label text={`${tokenName} Staked`} />

            {tokenName.split("-")[0]=="SUSHI"?
            <p style={{color:"orange"}}>Please only deposit SUSHISWAP SLP tokens here!</p> : null
          }

          </StyledCardHeader>

          <StyledCardActions>
            {!allowance.toNumber() ? (
              <Button
                disabled={requestedApproval}
                onClick={handleApprove}
                text={!requestedApproval ? `Approve ${tokenName}` : "Loading...."}
              />
            ) : (
              <>
                <Button
                  disabled={stakedBalance.eq(new BigNumber(0))}
                  text="Unstake"
                  onClick={onPresentWithdraw}
                />

                <div style={{position: 'absolute', right: -75, }}>
                
                <IconButton onClick={onPresentDeposit}>
                  <AddIcon />
                </IconButton>
                </div>

              </>
            )}

            </StyledCardActions>

          <p style={{color:"#fff", paddingTop:10,paddingBottom:0, marginBottom:0, textAlign:'center'}}>Staking or unstaking LP tokens will automatically claim all MARK.</p>
        </StyledCardContentInner>
      </CardContent>
  )
}

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`
const StyledCardActions = styled.div`
  display: flex;
  position:relative;
  justify-content: center;
  margin-top: 16px;
  width: 65%;
`

const StyledActionSpacer = styled.div`
  height: 6px;
  width: 100%;
`

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`

export default Stake
