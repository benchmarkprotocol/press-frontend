import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Nav: React.FC = () => {

  const [menuOpen, toggleMenuOpen] = useState(false)

  return (
    <StyledNav>
      <StyledLink onClick={()=> toggleMenuOpen(false)} exact activeClassName="active" to="/">
        Home
      </StyledLink>
      <StyledLink onClick={()=> toggleMenuOpen(false)} exact activeClassName="active" to="/pools">
        Pools
      </StyledLink>
      <StyledLink onClick={()=> toggleMenuOpen(false)} exact activeClassName="active" to="/stake">
        Stake
      </StyledLink>


      <div style={{position:"relative"}}>
          <StyledAbsoluteLink href="#" onClick={()=> toggleMenuOpen(!menuOpen)}>More <span style={{fontSize:10}}> { !menuOpen ? "▼" : "▲"}</span></StyledAbsoluteLink>

        { menuOpen ? 
          <Dropdown>
            <StyledAbsoluteLinkMenu
              href="https://www.youtube.com/watch?v=tQwuzCA8rYE"
              target="_blank"
            >
              Pools Tutorial
            </StyledAbsoluteLinkMenu>
            <StyledAbsoluteLinkMenu
              href="https://medium.com/benchmarkprotocol/transitioning-from-benchmark-launchpad-to-the-press-80e480ee4bc7"
              target="_blank"
            >
              About Pools
            </StyledAbsoluteLinkMenu>
            <StyledAbsoluteLinkMenu
              href="https://medium.com/r/?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DaZ7W7_HNkxc"
              target="_blank"
            >
              Staking Tutorial
            </StyledAbsoluteLinkMenu>
            <StyledAbsoluteLinkMenu
              href="https://medium.com/p/6ecded56deb/"
              target="_blank"
            >
              About Staking
            </StyledAbsoluteLinkMenu>

            <StyledAbsoluteLinkMenu
              href="https://snapshot.page/#/benchmarkprotocol.eth"
              target="_blank"
            >
             Governance
            </StyledAbsoluteLinkMenu>

            <StyledAbsoluteLinkMenu
              href="https://benchmarkprotocol.finance/terms"
              target="_blank"
            >
             Terms
            </StyledAbsoluteLinkMenu>

            <StyledAbsoluteLinkMenu
              href="https://benchmarkprotocol.finance/privacy"
              target="_blank"
            >
             Privacy Policy
            </StyledAbsoluteLinkMenu>

          </Dropdown>
          : null
        }
        </div>



    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`
const Dropdown = styled.div`
  position:absolute;
  background:#000;
  border-radius:4px;
  padding:10px;
  z-index:999;
  top:40px;
  width:150px;
  flex-direction:column;
  display:flex;
  &:hover{
        box-shadow: 0 0 2rem #2CF48B;
  }
`;
const StyledLink = styled(NavLink)`
  color: ${(props) => props.theme.color.grey[400]};
  font-weight: 700;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
  }
  &.active {
    color: ${(props) => props.theme.color.primary.main};
  }
  @media (max-width: 400px) {
    padding-left: ${(props) => props.theme.spacing[2]}px;
    padding-right: ${(props) => props.theme.spacing[2]}px;
  }
`

const StyledAbsoluteLink = styled.a`
  color: ${(props) => props.theme.color.grey[400]};
  font-weight: 700;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
  }
  &.active {
    color: ${(props) => props.theme.color.primary.main};
  }
  @media (max-width: 400px) {
    padding-left: ${(props) => props.theme.spacing[2]}px;
    padding-right: ${(props) => props.theme.spacing[2]}px;
  }
`

const StyledAbsoluteLinkMenu = styled.a`
  color: ${(props) => props.theme.color.grey[400]};
  font-weight: 700;
  text-decoration: none;
  margin:6px 0;
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
  }
  &.active {
    color: ${(props) => props.theme.color.primary.main};
  }
`

export default Nav
