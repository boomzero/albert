const Hero = (props) => (
  <>
    <div className="jumbotron jumbotron-fluid d-flex flex-column justify-content-center">
      {props.children}
    </div>

    <style jsx>{`
    .jumbotron {
      background-attachment: ${props.backgroundAttachment || "scroll"};
      background-color: ${props.backgroundColor || "transparent"};
      background-image: ${props.backgroundImage};
      background-position: ${props.backgroundPosition || "center center"};
      background-size: ${props.backgroundSize || "cover"};
      height: ${props.height};
    }
  `}</style>
  </>
)


export default Hero
