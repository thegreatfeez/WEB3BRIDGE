// Web3Auth configuration using the new @web3auth/modal package
import { type Web3AuthContextConfig } from '@web3auth/modal/react'
import { WEB3AUTH_NETWORK, type Web3AuthOptions } from '@web3auth/modal'

const clientId = import.meta.env.VITE_WEB3AUTH_CLIENT_ID || ''
const environment = import.meta.env.VITE_WEB3AUTH_ENVIRONMENT || 'devnet'

const web3AuthOptions: Web3AuthOptions = {
	clientId,
	web3AuthNetwork: environment === 'mainnet' ? WEB3AUTH_NETWORK.SAPPHIRE_MAINNET : WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
}

export const web3AuthContextConfig: Web3AuthContextConfig = {
	web3AuthOptions,
}
