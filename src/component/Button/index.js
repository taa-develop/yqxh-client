import React from 'react'
import styled from 'styled-components'

const Container = styled.span`
    cursor: pointer;
    border: 1px solid #00a6f3;
    display: inline-block;
    padding: 12px 44px;
    font-size: 20px;
    color: #00a6f3;
    box-sizing: border-box;
    border-radius: 4px;
`

function Button({ children, onClick }) {
    return <Container onClick={onClick}>{children}</Container>
}

export default Button
