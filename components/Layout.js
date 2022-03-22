
import Header from "./Header"
import Footer from "./Footer"
import { useRouter } from "next/router";

export default function Layout({ children }) {

    const router = useRouter();
 
    return (
        <>
            {router.pathname == "/training/pdf_check" ? <></> :  <Header /> }
            <main>
                {children}
            </main>
            <Footer></Footer>
        </>
    
    )
}
