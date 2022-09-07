import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { StyledLink } from '../../utils/style/Atoms'
import LightLogo from '../../assets/light-logo.png'
import DarkLogo from '../../assets/dark-logo.png'

import {useSelector} from 'react-redux'
import {selectTheme} from '../../utils/selectors.js'
const HomeLogo = styled.img`
  height: 70px;
`

const NavContainer = styled.nav`
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

function Header() {
  
  const Theme = useSelector(selectTheme);
  return (
    <NavContainer>
      <Link to="/">
        <HomeLogo src={Theme === 'light' ? DarkLogo : LightLogo} />
      </Link>
      <div>
        <StyledLink $theme={Theme} to="/">
          Accueil
        </StyledLink>
        <StyledLink $theme={Theme} to="/freelances">
          Profils
        </StyledLink>
        <StyledLink to="/survey/1" $isFullLink>
          Faire le test
        </StyledLink>
      </div>
    </NavContainer>
  )
}

export default Header
