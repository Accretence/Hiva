import { CoinbaseWallet } from '@web3-react/coinbase-wallet'
import { GnosisSafe } from '@web3-react/gnosis-safe'
import { MetaMask } from '@web3-react/metamask'
import { Network } from '@web3-react/network'
import { WalletConnect } from '@web3-react/walletconnect'
import type { Connector, AddEthereumChainParameter } from '@web3-react/types'

export function getName(connector: Connector) {
    if (connector instanceof MetaMask) return 'MetaMask'
    if (connector instanceof WalletConnect) return 'WalletConnect'
    if (connector instanceof CoinbaseWallet) return 'Coinbase Wallet'
    if (connector instanceof Network) return 'Network'
    if (connector instanceof GnosisSafe) return 'Gnosis Safe'
    return 'Unknown'
}

const ETH: AddEthereumChainParameter['nativeCurrency'] = {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
}

const MATIC: AddEthereumChainParameter['nativeCurrency'] = {
    name: 'Matic',
    symbol: 'MATIC',
    decimals: 18,
}

const CELO: AddEthereumChainParameter['nativeCurrency'] = {
    name: 'Celo',
    symbol: 'CELO',
    decimals: 18,
}

interface BasicChainInformation {
    urls: string[]
    name: string
}

interface ExtendedChainInformation extends BasicChainInformation {
    nativeCurrency: AddEthereumChainParameter['nativeCurrency']
    blockExplorerUrls: AddEthereumChainParameter['blockExplorerUrls']
}

function isExtendedChainInformation(
    chainInformation: BasicChainInformation | ExtendedChainInformation
): chainInformation is ExtendedChainInformation {
    return !!(chainInformation as ExtendedChainInformation).nativeCurrency
}

export function getAddChainParameters(
    chainId: number
): AddEthereumChainParameter | number {
    const chainInformation = CHAINS[chainId]
    if (isExtendedChainInformation(chainInformation)) {
        return {
            chainId,
            chainName: chainInformation.name,
            nativeCurrency: chainInformation.nativeCurrency,
            rpcUrls: chainInformation.urls,
            blockExplorerUrls: chainInformation.blockExplorerUrls,
        }
    } else {
        return chainId
    }
}

export const CHAINS: {
    [chainId: number]: BasicChainInformation | ExtendedChainInformation
} = {
    1: {
        urls: [
            process.env.INFURA_MAINNET_KEY
                ? `https://mainnet.infura.io/v3/${process.env.INFURA_MAINNET_KEY}`
                : '',
            process.env.ALCHEM_MAINNET_KEY
                ? `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEM_MAINNET_KEY}`
                : '',
            'https://cloudflare-eth.com',
        ].filter((url) => url !== ''),
        name: 'Mainnet',
    },
    3: {
        urls: [
            process.env.INFURA_MAINNET_KEY
                ? `https://ropsten.infura.io/v3/${process.env.INFURA_MAINNET_KEY}`
                : '',
        ].filter((url) => url !== ''),
        name: 'Ropsten',
    },
    4: {
        urls: [
            process.env.INFURA_MAINNET_KEY
                ? `https://rinkeby.infura.io/v3/${process.env.INFURA_MAINNET_KEY}`
                : '',
        ].filter((url) => url !== ''),
        name: 'Rinkeby',
    },
    5: {
        urls: [
            process.env.INFURA_MAINNET_KEY
                ? `https://goerli.infura.io/v3/${process.env.INFURA_MAINNET_KEY}`
                : '',
        ].filter((url) => url !== ''),
        name: 'Görli',
    },
    42: {
        urls: [
            process.env.INFURA_MAINNET_KEY
                ? `https://kovan.infura.io/v3/${process.env.INFURA_MAINNET_KEY}`
                : '',
        ].filter((url) => url !== ''),
        name: 'Kovan',
    },
    // Optimism
    10: {
        urls: [
            process.env.INFURA_MAINNET_KEY
                ? `https://optimism-mainnet.infura.io/v3/${process.env.INFURA_MAINNET_KEY}`
                : '',
            'https://mainnet.optimism.io',
        ].filter((url) => url !== ''),
        name: 'Optimism',
        nativeCurrency: ETH,
        blockExplorerUrls: ['https://optimistic.etherscan.io'],
    },
    69: {
        urls: [
            process.env.INFURA_MAINNET_KEY
                ? `https://optimism-kovan.infura.io/v3/${process.env.INFURA_MAINNET_KEY}`
                : '',
            'https://kovan.optimism.io',
        ].filter((url) => url !== ''),
        name: 'Optimism Kovan',
        nativeCurrency: ETH,
        blockExplorerUrls: ['https://kovan-optimistic.etherscan.io'],
    },
    // Arbitrum
    42161: {
        urls: [
            process.env.INFURA_MAINNET_KEY
                ? `https://arbitrum-mainnet.infura.io/v3/${process.env.INFURA_MAINNET_KEY}`
                : '',
            'https://arb1.arbitrum.io/rpc',
        ].filter((url) => url !== ''),
        name: 'Arbitrum One',
        nativeCurrency: ETH,
        blockExplorerUrls: ['https://arbiscan.io'],
    },
    421611: {
        urls: [
            process.env.INFURA_MAINNET_KEY
                ? `https://arbitrum-rinkeby.infura.io/v3/${process.env.INFURA_MAINNET_KEY}`
                : '',
            'https://rinkeby.arbitrum.io/rpc',
        ].filter((url) => url !== ''),
        name: 'Arbitrum Testnet',
        nativeCurrency: ETH,
        blockExplorerUrls: ['https://testnet.arbiscan.io'],
    },
    // Polygon
    137: {
        urls: [
            process.env.INFURA_MAINNET_KEY
                ? `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_MAINNET_KEY}`
                : '',
            'https://polygon-rpc.com',
        ].filter((url) => url !== ''),
        name: 'Polygon Mainnet',
        nativeCurrency: MATIC,
        blockExplorerUrls: ['https://polygonscan.com'],
    },
    80001: {
        urls: [
            process.env.INFURA_MAINNET_KEY
                ? `https://polygon-mumbai.infura.io/v3/${process.env.INFURA_MAINNET_KEY}`
                : '',
        ].filter((url) => url !== ''),
        name: 'Polygon Mumbai',
        nativeCurrency: MATIC,
        blockExplorerUrls: ['https://mumbai.polygonscan.com'],
    },
    // Celo
    42220: {
        urls: ['https://forno.celo.org'],
        name: 'Celo',
        nativeCurrency: CELO,
        blockExplorerUrls: ['https://explorer.celo.org'],
    },
    44787: {
        urls: ['https://alfajores-forno.celo-testnet.org'],
        name: 'Celo Alfajores',
        nativeCurrency: CELO,
        blockExplorerUrls: ['https://alfajores-blockscout.celo-testnet.org'],
    },
}

export const URLS: { [chainId: number]: string[] } = Object.keys(
    CHAINS
).reduce<{ [chainId: number]: string[] }>((accumulator, chainId) => {
    const validURLs: string[] = CHAINS[Number(chainId)].urls

    if (validURLs.length) {
        accumulator[Number(chainId)] = validURLs
    }

    return accumulator
}, {})