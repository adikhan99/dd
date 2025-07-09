// ** Next Imports
import Head from 'next/head'
import { Router } from 'next/router'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

// ** Footer Import

import Footer from '@components/Footer'

// ** Store Imports
import { store } from 'src/store'
import { Provider } from 'react-redux'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'
import type { EmotionCache } from '@emotion/cache'

// ** Config Imports
import { msalConfig } from '../configuration/config';
import themeConfig from 'src/configs/themeConfig'

// ** Fake-DB Import
import 'src/@fake-db'

// ** Third Party Import
import { Toaster } from 'react-hot-toast'

// ** Component Imports
import ThemeComponent from 'src/@core/theme/ThemeComponent'


// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Styled Components
import ReactHotToast from 'src/@core/styles/libs/react-hot-toast'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** MSAL Imports
import { MsalProvider } from '@azure/msal-react'
import { PublicClientApplication, EventType, EventMessage } from '@azure/msal-browser'

// ** Global css styles
import '../../styles/globals.css'
import AdminLayout from '@layouts/admin-layout'
import SetAuth from '@components/auth/auth-guard/set-auth'
import AuthGuard from '@components/auth/auth-guard/auth-guard'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ManagedModal from '@components/common-components/modal/managed-modal'

type ExtendedAppProps = AppProps & {
  Component: NextPage
  emotionCache: EmotionCache
}

const clientSideEmotionCache = createEmotionCache()

// Initialize MSAL instance
const msalInstance = new PublicClientApplication(msalConfig)

// Set active account if needed
if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
  msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0])
}

// Add event callback for MSAL events
msalInstance.addEventCallback((event: EventMessage) => {
  if (event.eventType === EventType.LOGIN_SUCCESS) {
    const account = (event.payload as { account?: any })?.account;
    if (account) {
      msalInstance.setActiveAccount(account);
    }
  }
})

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const App = (props: ExtendedAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const contentHeightFixed = Component.contentHeightFixed ?? false

  const getLayout =
    Component.getLayout ?? (page => <AdminLayout contentHeightFixed={contentHeightFixed}>{page}</AdminLayout>)

  const setConfig = Component.setConfig ?? undefined

  const authProps = (Component as any).authProps

  return (
    <MsalProvider instance={msalInstance}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <CacheProvider value={emotionCache}>
            <Head>
              <title>{`${themeConfig.templateName}`}</title>
              <meta
                name="description"
                content={`${themeConfig.templateName}`}
              />
              <meta name="keywords" content="Material Design, MUI, Admin Template, React Admin Template" />
              <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>


            <SettingsProvider {...(setConfig ? { pageSettings: setConfig() } : {})}>
              <SettingsConsumer>
                {({ settings }) => {
                  return (
                    <ThemeComponent settings={settings}>

                      {authProps ? (
                        <SetAuth>
                          <AuthGuard authProps={authProps}>{getLayout(<Component {...pageProps} />)}</AuthGuard>
                        </SetAuth>
                      ) : (
                        getLayout(<Component {...pageProps} />)
                      )}

                      <ReactHotToast>
                        <Toaster position={settings.toastPosition} toastOptions={{ className: 'react-hot-toast toast-custom-class', style: { zIndex: 9999, } }} containerStyle={{ zIndex: 999 }} />
                      </ReactHotToast>
                      <ManagedModal />
                      {/* Footer Component */}
                      {/* <Footer user={{ role: 'admin' }} /> */}
                      <Footer />
                    </ThemeComponent>
                  )
                }}
              </SettingsConsumer>
            </SettingsProvider>

          </CacheProvider>
        </Provider>
      </QueryClientProvider>
    </MsalProvider>
  )
}

export default App
