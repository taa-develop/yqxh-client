import React from 'react'
import styled from 'styled-components'

const Wrap = styled.div`
    position: absolute;
`
const ItemA = styled.div`
    background-color: #00a6f3;
    width: 16px;
    height: 1px;
    position: absolute;
    top: 0;
    left: 0;
`
const ItemB = styled.div`
    background-color: #00a6f3;
    width: 1px;
    height: 16px;
    position: absolute;
    top: 0;
    left: 0;
`

function Corner({ className }) {
    return (
        <Wrap className={className}>
            <ItemA></ItemA>
            <ItemB></ItemB>
        </Wrap>
    )
}

export default Corner
