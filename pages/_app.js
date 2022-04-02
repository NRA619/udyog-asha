import Layout from "../components/Layout";
import "../styles/globals.css";
import { CookiesProvider } from "react-cookie";
import { useEffect } from 'react';
import { pageview } from  './gtag'

export default function MyApp({ Component, pageProps, router }) {

  useEffect(() => {
    const handleRouteChange = url => {
      pageview(url, document.title);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return (
    
    <Layout>
      <CookiesProvider>
      <Component {...pageProps} />
      </CookiesProvider>
    </Layout>
    
    
  );
}
