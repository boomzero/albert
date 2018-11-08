import Layout from "../components/layout"
import UrlShorteningForm from "../components/url-shortening"


const Index = (props) => (
  <Layout>
    <div className="jumbotron jumbotron-fluid d-flex flex-column justify-content-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-10 col-md-8 col-lg-6">
            <UrlShorteningForm />
          </div>
        </div>
      </div>
    </div>

    <style jsx>{`
      .jumbotron {
        background-attachment: fixed;
        background-image: url(../static/home-hero-background.jpg);
        background-position: center center;
        background-size: cover;
        min-height: 480px;
      }
    `}</style>
  </Layout>
)


export default Index
