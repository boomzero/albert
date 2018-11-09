import Topbar from "./topbar"
import Footer from "./footer"


const Layout = (props) => (
  <>
    {props.noTopbar ? null : <Topbar />}
    {props.children}
    <Footer />
  </>
)


export default Layout
