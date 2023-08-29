import { useRouter } from "next/router"
import { AppPropsWithLayout } from "../types"
import { Hydrate, QueryClientProvider } from "@tanstack/react-query"
import { RootLayout } from "src/layouts"
import { queryClient } from "src/libs/react-query"
import { language } from "src/locales"
import { IntlProvider } from "react-intl"

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page)
  const { locale } = useRouter() as any
  const mesg = language.find((lang: any) => lang.code === locale)

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
      <IntlProvider locale={locale} messages={mesg?.file}>
        <div dir={mesg?.dir}>
          <RootLayout>{getLayout(<Component {...pageProps} />)}</RootLayout>
        </div>
      </IntlProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default App
