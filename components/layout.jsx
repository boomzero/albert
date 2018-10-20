import Topbar from "./topbar"
import Footer from "./footer"


const Layout = (props) => (
  <>
    <Topbar />
    {props.children}
    <Footer />
  </>
)


export default Layout
