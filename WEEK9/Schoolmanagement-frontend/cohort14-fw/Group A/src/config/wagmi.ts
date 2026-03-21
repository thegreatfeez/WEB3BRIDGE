import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { mainnet, sepolia, polygon, optimism, arbitrum } from 'wagmi/chains'

export const wagmiConfig = getDefaultConfig({
	appName: import.meta.env.VITE_APP_NAME || 'ExcelSchool',
	projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'demo_excelschool_project',
	chains: [mainnet, sepolia, polygon, optimism, arbitrum],
	ssr: false,
})
