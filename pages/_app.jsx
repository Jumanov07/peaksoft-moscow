/* eslint-disable @next/next/inline-script-id */
/* eslint-disable import/no-unresolved */
import '../styles/globals.css'
import Head from 'next/head'
import Script from 'next/script'
import { Provider } from 'react-redux'
import { store } from '../store'
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/controller'
import 'swiper/css/keyboard'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-coverflow'
import 'swiper/css/thumbs'

function MyApp({ Component, pageProps }) {
   const getLayout = Component.getLayout || ((page) => page)

   return getLayout(
      <>
         <Head>
            <title>PeakSoft House</title>
            <meta
               name="description"
               content="PeakSoft House - бул PeakSoft IT компаниясынын онлайн жана офлайн
               окутуу курстары. Биз талап кылынган Back-end (Java) жана Front-end
               (JavaScript),IT адистерин online - offline даярдайбыз. Нольдон баштап
               биринчи жумуш күнүнө чейин."
            />
            <link rel="shortcut icon" href="/favicon.ico" />
            <link rel="apple-touch-icon" href="/favicon.ico" />
         </Head>
         <Provider store={store}>
            <Script
               strategy="lazyOnload"
               src="https://www.googletagmanager.com/gtag/js?id=G-VQ7TCKBXRR"
            />
            <Script strategy="lazyOnload">
               {`window.dataLayer = window.dataLayer || []
               function gtag(){window.dataLayer.push(arguments)}
               gtag('js', new Date());
             
               gtag('config', 'G-VQ7TCKBXRR');
              `}
            </Script>
            <Component {...pageProps} />
         </Provider>
      </>
   )
}

export default MyApp
