import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ArweaveWalletKit } from 'arweave-wallet-kit'
ReactDOM.createRoot(document.getElementById('root')).render(
  <ArweaveWalletKit>
    <App />
  </ArweaveWalletKit>
)