import React from 'react'
import styled from 'styled-components'

import Corner from '../Corner'

const Wrap = styled.div`
    position: relative;
    border: 1px solid #032875;
`
const TopLeft = styled(Corner)`
    top: -1px;
    left: -1px;
`
const TopRight = styled(Corner)`
    top: -1px;
    right: -1px;
    transform: rotate(90deg);
`
const BottomLeft = styled(Corner)`
    bottom: -1px;
    left: -1px;
    transform: rotate(-90deg);
`
const BottomRight = styled(Corner)`
    bottom: -1px;
    right: -1px;
    transform: rotate(180deg);
`

function Box({ className, children }) {
    return (
        <Wrap className={className}>
            <TopLeft></TopLeft>
            <TopRight></TopRight>
            <BottomLeft></BottomLeft>
            <BottomRight></BottomRight>
            {children}
        </Wrap>
    )
}

export default Box
