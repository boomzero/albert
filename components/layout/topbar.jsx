import Link from "next/link"
import { withRouter } from 'next/router'


const Topbar = (props) => (
  <nav className="navbar navbar-expand-md navbar-dark bg-primary fixed-top shadow">
    <Link prefetch href="/">
      <a className="navbar-brand h1 mb-0">
        <strong>ALBERT</strong>
      </a>
    </Link>

    <button className="navbar-toggler" data-toggle="collapse" data-target="#navbar-nav">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbar-nav">
      <div className="navbar-nav mr-auto">
        <Link prefetch href="/">
          <a className={`nav-item nav-link ${props.router.pathname === "/" ? "active" : ""}`}>Home</a>
        </Link>
        <Link prefetch href="/about">
          <a className={`nav-item nav-link ${props.router.pathname === "/about" ? "active" : ""}`}>About</a>
        </Link>
      </div>
      <Link prefetch href="/signin">
        <a className="btn btn-outline-light">Sign In</a>
      </Link>
    </div>
  </nav>
)


export default withRouter(Topbar)