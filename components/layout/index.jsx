import Topbar from "./topbar"
import Footer from "./footer"


export default (props) => (
  <>
    <Topbar />
    <div className="albert-topbar-avoidance" />
    {props.children}
    <Footer />
    <style jsx>{`
      .albert-topbar-avoidance {
        margin-top: 56px;
      }
    `}</style>
  </>
)
