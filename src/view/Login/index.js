import { gql } from 'apollo-boost'
import styled from 'styled-components'
import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useMutation, useApolloClient } from '@apollo/react-hooks'

import Input from '../../component/Input'
import Button from '../../component/Button'
import Box from '../../component/Box'

const Container = styled.div`
    background-color: #050845;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`
const LoginBox = styled(Box)`
    width: 600px;
    /* background-color: #fff; */
    padding: 50px 60px;
    box-sizing: border-box;
`
const LoginButtonWrap = styled.div`
    display: flex;
    justify-content: center;
`
const TitleWrap = styled.div`
    color: #00a6f3;
    margin-bottom: 56px;
    text-align: center;
    font-size: 30px;
`
const ForgetPasswordWrap = styled(Link)`
    text-align: center;
    margin-top: 16px;
    color: #00a6f3;
    display: block;
    text-decoration: underline;
    font-size: 14px;
`

const LOGIN = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
        }
    }
`

function Login() {
    const client = useApolloClient()
    const [username, setUsername] = useState(
        localStorage.getItem('username') || ''
    )
    const [password, setPassword] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const history = useHistory()

    const handleLoginCompleted = data => {
        localStorage.setItem('token', data.login.token)
        client.writeData({
            data: {
                isLogin: true
            }
        })
        history.push('/')
    }
    const handleLoginError = ({ graphQLErrors }) => {
        console.log(graphQLErrors)
        if (graphQLErrors[0].code === 20002) {
            setPasswordError(graphQLErrors[0].message)
        }
    }
    const [login] = useMutation(LOGIN, {
        onCompleted: handleLoginCompleted,
        onError: handleLoginError
    })

    const handleChangeUsername = value => {
        if (usernameError) {
            setUsernameError('')
        }
        if (passwordError) {
            setPasswordError('')
        }
        setUsername(value)
    }
    const handleChangePassword = value => {
        if (usernameError) {
            setUsernameError('')
        }
        if (passwordError) {
            setPasswordError('')
        }
        setPassword(value)
    }
    const handleClick = () => {
        if (!username) {
            setUsernameError('手机号码不能为空')
            return
        }
        if (!password) {
            setPasswordError('密码不能为空')
            return
        }
        localStorage.setItem('username', username)
        login({
            variables: {
                username: username,
                password: password
            }
        })
    }
    return (
        <Container>
            <LoginBox>
                <TitleWrap>双孢蘑菇工厂化生产智能管理平台</TitleWrap>
                <Input
                    title="手机号码"
                    onChange={handleChangeUsername}
                    value={username}
                    type="text"
                    message={usernameError}
                ></Input>
                <Input
                    title="密码"
                    onChange={handleChangePassword}
                    value={password}
                    type="password"
                    message={passwordError}
                ></Input>
                <LoginButtonWrap>
                    <Button onClick={handleClick}>登录</Button>
                </LoginButtonWrap>
                <ForgetPasswordWrap to="/forget=password">
                    忘记密码?
                </ForgetPasswordWrap>
            </LoginBox>
        </Container>
    )
}

export default Login
