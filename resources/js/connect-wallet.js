const { EthereumClient, w3mConnectors, w3mProvider } = require('@web3modal/ethereum')
const { Web3Modal } = require('@web3modal/html')
const {
  configureChains,
  createConfig,
  createClient,
  fetchBalance,
  disconnect,
  getAccount,
  watchNetwork,
  watchAccount,
} = require('@wagmi/core')
const {
  goerli,
  mainnet,
  bsc,
  bscTestnet,
  polygon,
  polygonMumbai,
  avalanche,
  avalancheFuji,
} = require('@wagmi/core/chains')

const chains = [mainnet, goerli, bsc, bscTestnet, avalanche, avalancheFuji, polygonMumbai, polygon]
const projectId = '8e1011e610b1bd417119ad622982a47e' // Get yours at https://cloud.walletconnect.com/
const { publicClient } = configureChains(chains, [
  w3mProvider({
    projectId,
    
  }),
])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({
    projectId,
    version: 1,
    chains,
  }),
  publicClient,
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)
const web3Modal = new Web3Modal(
  {
    projectId,
  },
  ethereumClient
)

const unwatchAccount = watchAccount((account) => {
  console.log(`Account change ${account.address}`)
})

const unwatchNetwork = watchNetwork((network) => {
  console.log(`Network change ${network.chains}`)
})
