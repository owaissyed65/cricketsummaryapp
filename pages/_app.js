import Header from '@/components/Header'
import Store from '@/store/Store'
import '@/styles/globals.css'
import Head from 'next/head'
import { Provider } from 'react-redux'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Cricket Summary App</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link href="https://fonts.googleapis.com/css2?family=Poppins&family=Public+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <Provider store={Store}>
        <Header />
        <Component {...pageProps} />
      </Provider>
    </>
  )
}
