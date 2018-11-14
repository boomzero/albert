import Hero from "../components/hero"
import Layout from "../components/layout"
import UrlShortening from "../components/url-shortening"


const Index = (props) => (
  <Layout>
    <Hero backgroundImage="url(../static/home-hero-background.jpg)" height="calc(100vh - 56px)">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-10 col-sm-8">
            <UrlShortening />
          </div>
        </div>
      </div>
    </Hero>
  </Layout>
)


export default Index
