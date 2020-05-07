import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import { Switch, Route, Redirect } from 'react-router-dom'

import Login from './view/Login'
import Main from './view/Main'

const GET_LOAIN_STATUS = gql`
    {
        isLogin @client
    }
`

function App() {
    const {
        data: { isLogin }
    } = useQuery(GET_LOAIN_STATUS)
    return (
        <Switch>
            <Route path="/login">
                {!isLogin ? <Login /> : <Redirect to="/" />}
                <Login />
            </Route>
            <Route path="/">
                {isLogin ? <Main /> : <Redirect to="/login" />}
            </Route>
        </Switch>
    )
}

export default App
