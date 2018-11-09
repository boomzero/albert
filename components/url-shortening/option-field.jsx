const OptionField = (props) => (
  <div className="form-group form-row align-items-center">
    <label className="col-sm-4 col-form-label">{props.labelText}</label>
    <div className="col-sm-8">{props.children}</div>
  </div>
)


export default OptionField
