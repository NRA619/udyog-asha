import Layout from "../components/Layout";
import "../styles/globals.css";
import { CookiesProvider } from "react-cookie";

export default function MyApp({ Component, pageProps }) {
  return (
    
    <Layout>
      <CookiesProvider>
      <Component {...pageProps} />
      </CookiesProvider>
    </Layout>
    
    
  );
}
