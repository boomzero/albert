import Layout from "../../layout"


export default (props) => (
  <Layout>
    <section className='container p-5'>
      <div className="row justify-content-center">
        <div className="col-10 col-md-8 col-xl-6">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">{props.title}</h5>
            </div>
            <div className="card-body">
              {props.message ? <p className='card-text'>{props.message}</p> : null}
              {props.children}
            </div>
          </div>
        </div>
      </div>
    </section>
  </Layout>
)
