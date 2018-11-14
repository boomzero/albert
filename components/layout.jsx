import Topbar from "./topbar"
import Footer from "./footer"


const Layout = (props) => (
  <>
    <Topbar />
    <div className="topbar-avoidance">{props.children}</div>
    <Footer />

    <style jsx>{`
      .topbar-avoidance {
        margin-top: 56px;
      }
    `}</style>
  </>
)


export default Layout
