import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import { getDefaultWallets, RainbowKitProvider, darkTheme, connectorsForWallets } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css'
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  baseGoerli,
  goerli
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import {
  injectedWallet,
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import GlobalProvider from '../globalContext.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    baseGoerli,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : []),
  ],
  [publicProvider()]
);

// const { connectors } = getDefaultWallets({
//   appName: 'Metro',
//   projectId: '',
//   chains,
// });
const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      injectedWallet({ chains }),
      metaMaskWallet({ projectId: "293ec0e04ef0b067e2fdbf402fcc2021", chains }),
      coinbaseWallet({ appName: "Metro", chains }),
      walletConnectWallet({ projectId: "293ec0e04ef0b067e2fdbf402fcc2021", chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        modalSize='compact'
        theme={darkTheme({
          accentColor: '#7b3fe4',
          accentColorForeground: 'white',
          borderRadius: 'medium',
        })}>
        <GlobalProvider>
          <Component {...pageProps} />
          <ToastContainer />
        </GlobalProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
