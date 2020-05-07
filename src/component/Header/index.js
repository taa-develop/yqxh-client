import React from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'

import SkewButton from '../SkewButton'

const Wrap = styled.div`
    height: 100px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`

function Header() {
    const location = useLocation()
    return (
        <Wrap>
            <SkewButton
                to="/"
                active={location.pathname === '/'}
                direction="left"
            >
                产量
            </SkewButton>
            <SkewButton
                to="/mushroom"
                active={location.pathname === '/mushroom'}
                direction="left"
            >
                菇房
            </SkewButton>
            <SkewButton
                to="/tunnel"
                active={location.pathname === '/tunnel'}
                direction="right"
            >
                隧道
            </SkewButton>
            <SkewButton
                to="/user"
                active={location.pathname === '/user'}
                direction="right"
            >
                人员
            </SkewButton>
        </Wrap>
    )
}

export default Header
