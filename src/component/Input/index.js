import React, { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width: 100%;
    border: 1px solid #00a6f3;
    border-radius: 4px;
    height: 60px;
    position: relative;
    margin-bottom: 45px;
    display: flex;
    padding: 5px 15px;
    box-sizing: border-box;
`
const Content = styled.input`
    flex-grow: 1;
    outline: none;
    border: none;
    font-size: 16px;
    background-color: transparent;
    color: #00a6f3;
`
const Title = styled.div`
    font-size: ${props => (props.isLift ? '12px' : '16px')};
    position: absolute;
    background-color: #050845;
    color: #00a6f3;
    top: ${props => (props.isLift ? '-10px' : '18px')};
    padding-left: 6px;
    padding-right: 6px;
    transition: all 0.1s ease;
`
const Helper = styled.div`
    position: absolute;
    top: 65px;
    color: red;
    font-size: 14px;
`

function Input({ title, onChange, value, type = 'text', message }) {
    const [titleLift, setTitleLift] = useState(!!value)
    const handleFocus = () => {
        setTitleLift(true)
    }
    const handleBlur = () => {
        if (!value) {
            setTitleLift(false)
        }
    }
    return (
        <Container>
            <Title isLift={titleLift}>{title}</Title>
            <Content
                type={type}
                onChange={event => onChange(event.target.value)}
                value={value}
                onFocus={handleFocus}
                onBlur={handleBlur}
            ></Content>
            <Helper>{message}</Helper>
        </Container>
    )
}

export default Input
