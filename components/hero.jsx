const Hero = (props) => (
  <>
    <div className="albert-hero d-flex flex-column justify-content-center">
      {props.children}
    </div>

    <style jsx>{`
    .albert-hero {
      background-color: ${props.backgroundColor || "transparent"};
      background-image: ${props.backgroundImage};
      background-position: center center;
      background-size: cover;
      height: ${props.height};
    }
  `}</style>
  </>
)


export default Hero
