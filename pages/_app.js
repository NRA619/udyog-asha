import Layout from "../components/Layout";
import "../styles/globals.css";
import { CookiesProvider } from "react-cookie";
import { useEffect } from 'react';


export default function MyApp({ Component, pageProps, router }) {

 

  return (
    
    <Layout>
      <CookiesProvider>
      <Component {...pageProps} />
      </CookiesProvider>
    </Layout>
    
    
  );
}
