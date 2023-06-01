const Swal = require('sweetalert2')
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
    enableAccountView: true,
    themeMode: 'light',
    defaultChain: polygon,
  },
  ethereumClient
)

const unwatchAccount = watchAccount((account) => {
  console.log(`Account change ${account.address}`)
})

const unwatchNetwork = watchNetwork((network) => {
  // console.log(`Network change ${network.chain.name} - ${network.chain.id}`)
})

async function doWalletConnect() {
  console.log('Do wallet connect')
  web3Modal.openModal()

  const unwatchNetwork = watchAccount((account) => {
    //fire SWAL
    console.log(`Account changed in doWalletConnect ${account.address}`)
    setTimeout(() => {
      showGetStartedAsPrompt()
    }, 2000)
  })
}

function showGetStartedAsPrompt() {
  Swal.fire({
    title: 'Get Started As',
    text: 'You have connected your wallet, please choose how you want to proceed as',
    icon: 'info',
    showCancelButton: true,
    showDenyButton: true,
    allowEscapeKey: false,
    allowOutsideClick: false,
    confirmButtonColor: '#0712e4',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Student',
    denyButtonText: 'Tutor',
    denyButtonColor: '#0712e4',
  }).then((result) => {
    if (result.isConfirmed) {
      //proceed as student
      window.location.replace('/student/dashboard')
    }

    if (result.isDenied) {
      //proceed as tutor
      window.location.replace('/tutor/dashboard')
    }
  })
}

function showConnectWalletPrompt() {
  Swal.fire({
    title: 'Connect Wallet',
    text: "You haven't connected your wallet, do connect to ensure maximum utilization of our patform",
    icon: 'info',
    showCancelButton: true,
    confirmButtonColor: '#0712e4',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Connect',
    allowEscapeKey: false,
    allowOutsideClick: false,
  }).then((result) => {
    if (result.isConfirmed) {
      //try to connect wallet over here

      doWalletConnect().then((result) => {
        // console.log(`Is Wallet Connected: ${window.getAccount.address}`)
        // if(isWalletConnected())
        // {
        //   showGetStartedAsPrompt()
        // }
      })
    }
  })
}

window.doWalletConnect = doWalletConnect
window.showGetStartedAsPrompt = showGetStartedAsPrompt
window.showConnectWalletPrompt = showConnectWalletPrompt
