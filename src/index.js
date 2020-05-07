import React from 'react'
import { render } from 'react-dom'
import ApolloClient from 'apollo-boost'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import { createGlobalStyle } from 'styled-components'

import App from './App'
import * as serviceWorker from './serviceWorker'

const client = new ApolloClient({
    uri: 'https://api.yiquanxinhe.com/graphql',
    request: operation => {
        const token = localStorage.getItem('token')
        let headers = {}
        if (token) {
            headers = {
                authorization: `Bearer ${token}`
            }
        }
        operation.setContext({ headers })
    },
    onError: ({ graphQLErrors }) => {
        if (graphQLErrors) {
            console.log(graphQLErrors)
            switch (graphQLErrors[0].code) {
                case 30006:
                    localStorage.removeItem('token')
                case 30004:
                case 20001:
                    console.log(graphQLErrors[0].message)
                    client.writeData({
                        data: {
                            isLogin: false
                        }
                    })
                    break
                default:
                    break
            }
        }
    },
    clientState: {
        defaults: {
            isLogin: !!localStorage.getItem('token')
        },
        resolvers: {}
    }
})

const GlobalStyle = createGlobalStyle`
    html,
    body,
    #root {
        height: 100%;
    }
    body {
        margin: 0;
    }
    a {
        text-decoration: none;
    }
`

render(
    <>
        <ApolloProvider client={client}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ApolloProvider>
        <GlobalStyle />
    </>,
    document.getElementById('root')
)

serviceWorker.unregister()
