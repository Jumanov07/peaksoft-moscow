import Head from 'next/head'
import Wrapper from '../components/admin/wrapper/Wrapper'
import Header from '../components/admin/header/Header'
import Main from '../components/admin/main/Main'
import WithAuth from '../components/admin/protectedRoutes/ProtectedRoutes'
import { AdminContextProvider } from '../store/bannerContext'
import 'react-toastify/dist/ReactToastify.css'

function Admin({ children }) {
   return (
      <AdminContextProvider>
         <WithAuth>
            <div>
               <Head>
                  <title>Admin page</title>
                  <meta name="description" content="Peaksoft House Admin" />
                  <link rel="icon" href="/favicon.ico" />
               </Head>
               <main>
                  <div id="modal" />
                  <Wrapper>
                     <Header />
                  </Wrapper>
                  <Main>{children}</Main>
               </main>
            </div>
         </WithAuth>
      </AdminContextProvider>
   )
}

export default Admin
