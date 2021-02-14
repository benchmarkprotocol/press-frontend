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
import useXMARKStakedBalance from '../../../hooks/useXMARKStakedBalance'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useXMARKUnstake from '../../../hooks/useXMARKUnstake'
import { getBalanceNumber } from '../../../utils/formatBalance'
import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'
import {getSushiAddress} from "../../../sushi/utils"
import useSushi from '../../../hooks/useSushi'

interface StakeProps {
  lpContract: Contract
  pid: number
  tokenName: string,
  name: string
}

const Stake: React.FC<StakeProps> = ({ lpContract, pid, tokenName, name }) => {
  const [requestedApproval, setRequestedApproval] = useState(false)


  const sushi = useSushi()

  const allowance = useAllowance(lpContract)
  const { onApprove } = useApprove(lpContract)

  const address = getSushiAddress(sushi)

  const tokenBalance = useTokenBalance(address)

  console.log(address, tokenBalance.toNumber())
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
      max={stakedBalance}
      onConfirm={onUnstake}
      tokenName={"MARK"}
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
            <Label text={`MARK`} />
            <StyledActionSpacer />


          </StyledCardHeader>
                  <p style={{color:"#fff", paddingTop:0,paddingBottom:"1em", marginBottom:0, textAlign:'center'}}>
ℹ️  Converting xMARK tokens back into MARK will automatically claim MARK rewards. xMARK tokens can be used for off-chain governance with <a style={{color:"#2CF48B"}} href="https://snapshot.page/#/benchmarkprotocol.eth">Snapshot</a>.</p>
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
                  text="Convert to xMARK"
                  onClick={onPresentDeposit}
                />
              </>
            )}

          </StyledCardActions>
          
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
