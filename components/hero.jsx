export default (props) => (
  <>
    <div className="albert-hero d-flex flex-column justify-content-center">
      {props.children}
    </div>

    <style jsx>{`
    .albert-hero {
      background-image: ${props.backgroundImage};
      background-position: center center;
      background-size: cover;
      height: ${props.height};
    }
  `}</style>
  </>
)
