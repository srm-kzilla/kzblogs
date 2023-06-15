import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import LandingPage from './LandingPage'

function MyApp({ Component, pageProps }: AppProps) {
   return (
   <LandingPage/>);
}

export default MyApp
