import { AppProps } from 'next/app';
import '@styles/globals.css';
import MainLayout from '@layout/MainLayout';
import { ProviderAuth } from '@hooks/useAuth';

function MyApp({ Component: App, pageProps }: AppProps) {
  return (
    <>
      <ProviderAuth>
        <MainLayout>
          <App {...pageProps} />
        </MainLayout>
      </ProviderAuth>
    </>
  );
}

export default MyApp;
