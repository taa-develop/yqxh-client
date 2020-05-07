import React from 'react'
import styled from 'styled-components'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import { Route, Switch } from 'react-router-dom'

import Header from '../../component/Header'

import Yield from '../Yield'
import Mushroom from '../Mushroom'
import Tunnel from '../Tunnel'
import User from '../User'
import UserDetail from '../UserDetail'

const Container = styled.div`
    background-color: #050845;
    height: 100%;
`

const CURRENT_USER = gql`
    {
        currentUser {
            id
            username
        }
    }
`

function Main() {
    const { loading, error, data } = useQuery(CURRENT_USER)
    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`
    return (
        <Container>
            <Header />
            <Switch>
                <Route path="/mushroom">
                    <Mushroom />
                </Route>
                <Route path="/tunnel">
                    <Tunnel />
                </Route>
                <Route path="/user/:userId">
                    <UserDetail />
                </Route>
                <Route path="/user">
                    <User />
                </Route>
                <Route path="/">
                    <Yield />
                </Route>
            </Switch>
        </Container>
    )
}

export default Main
