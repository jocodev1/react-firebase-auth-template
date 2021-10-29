import React from 'react'
import ReactDOM from 'react-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { initializeApp } from 'firebase/app'
import App from './App'
import reportWebVitals from './reportWebVitals'
import theme from './theme'
import './index.css'

const firebaseConfig = {}

initializeApp(firebaseConfig)

// if (process.env.NODE_ENV === 'development') {
//   const db = getFirestore()
//   connectFirestoreEmulator(db, 'localhost', 7001)
// }

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

export const appName = 'Firebase Auth Template'
