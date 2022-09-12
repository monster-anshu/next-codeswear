import Footer from 'components/Footer'
import Navbar from 'components/Navbar'
import { Provider } from 'context'
import type { AppProps } from 'next/app'
import 'styles/global.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  )
}

export default MyApp
