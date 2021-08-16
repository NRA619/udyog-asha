import Layout from '../components/layout'
import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}