import '@styles/globals.css'

function MyApp({ Component: App, pageProps }) {
  return <App {...pageProps} />;
}

export default MyApp;
