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
import useAllowance from '../../../hooks/useXMARKAllowance'
import useApprove from '../../../hooks/useXMARKApprove'
import useModal from '../../../hooks/useModal'
import useXMARKStake from '../../../hooks/useXMARKStake'
import useXMARKRewards from '../../../hooks/useXMARKRewards'
import useXMARKAPY from '../../../hooks/useXMARKAPY'
import useXMARKStakedBalance from '../../../hooks/useXMARKStakedBalance'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useXMARKUnstake from '../../../hooks/useXMARKUnstake'
import { getBalanceNumber } from '../../../utils/formatBalance'
import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'
import {getXMARKAddress} from "../../../sushi/utils"
import useSushi from '../../../hooks/useSushi'

interface StakeProps {
  lpContract: Contract
  pid: number
  tokenName: string,
  name: string
}

const Claim: React.FC<StakeProps> = ({ lpContract, pid, tokenName, name }) => {
  const [requestedApproval, setRequestedApproval] = useState(false)



  const sushi = useSushi()
  const allowance = useAllowance(lpContract)
  const { onApprove } = useApprove(lpContract)


  const address = getXMARKAddress(sushi)

  const tokenBalance = useTokenBalance(address)

  const rewards = useXMARKRewards();

  const apy = useXMARKAPY()

  console.log("claim", address, tokenBalance.toNumber(), rewards, apy)

  const stakedBalance = useXMARKStakedBalance()

  const { onStake } = useXMARKStake()
  const { onUnstake } = useXMARKUnstake()

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      onConfirm={onStake}
      tokenName={"MARK"}
    />,
  )

  const [onPresentWithdraw] = useModal(
    <WithdrawModal
      max={tokenBalance}
      onConfirm={onUnstake}
      tokenName={"xMARK"}
    />,
  )

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      console.log("APPROVE?", txHash)
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
            <div style={{ position:"relative"}}>
              <img src={require(`./../../../assets/img/MARK.png`)} style={{width:50, height:50, marginLeft:15, marginRight:15, marginBottom:12}}/>
            </div>
            <StyledActionSpacer />
            <Value value={getBalanceNumber(tokenBalance, 9)} decimals={2}/>
            <StyledActionSpacer/>
            <Label text={`xMARK`} />
            <StyledActionSpacer />

            <APYContainer>
            <APYText>{apy.toNumber().toFixed(2).toLocaleString()}%</APYText>
            <StyledActionSpacer/>
            <APYText>Estimated APY</APYText>
            </APYContainer>
            <APYContainer>
              <APYText>{getBalanceNumber(rewards, 9).toFixed(2).toLocaleString()}</APYText>
              <StyledActionSpacer/>
              <APYText> Estimated Return </APYText>
            </APYContainer>



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
                  disabled={tokenBalance.eq(new BigNumber(0))}
                  text="Convert to MARK"
                  onClick={onPresentWithdraw}
                />
              </>
            )}

          </StyledCardActions>
        </StyledCardContentInner>
      </CardContent>
  )
}

const APYContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  border:1px solid #fff;
  width:100%;
  border-radius:5px;
  margin:10px;
  padding:10px;

`
const APYText = styled.span`
  color: #fff;
  font-size:14px;
  text-align:center;
  width:100%;
`

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

export default Claim
