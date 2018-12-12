import { Component } from "react"


const OptionField = (props) => (
  <div className="form-group form-row align-items-center">
    <label className="col-md-4 col-form-label">{props.label}</label>
    <div className="col-md-8">{props.children}</div>
  </div>
)


export default class Options extends Component {
  constructor(props) {
    super(props)

    this.state = {
      lifespan: 14,
      customShortened: "",
      password: "",
      confirmedPassword: "",
      restrictionMethod: "None",
      restrictionLimit: 86400,
    }
  }

  handleChange = (event) => this.setState(
    { [event.target.name]: event.target.value },
    () => this.props.onChange(this.state)
  )

  getConfirmPassword() {
    return (
      <OptionField label="Confirm password">
        <input className="form-control" type="password" name="confirmedPassword"
          value={this.state.confirmedPassword} onChange={this.handleChange} required
        />
      </OptionField>
    )
  }

  getRestrictionLimit() {
    return (
      <OptionField label="Restriction limit">
        <div className="input-group">
          <input className="form-control" type="number" name="restrictionLimit"
            min="1" placeholder="86400" value={this.state.restrictionLimit} onChange={this.handleChange}
          />
          <div className="input-group-append">
            <div className="input-group-text">requests/day</div>
          </div>
        </div>
      </OptionField>
    )
  }

  render() {
    return (
      <>
        <button className="btn btn-outline-light mb-3" type='button' data-toggle="collapse" data-target="#url-shortening-options">
          Options
        </button>

        <div className="collapse" id="url-shortening-options">
          <div className="card card-body">
            <OptionField label="Expire in">
              <div className="input-group">
                <input className="form-control" type="number" name="lifespan"
                  min="1" max="14" placeholder="14" value={this.state.lifespan} onChange={this.handleChange}
                />
                <div className="input-group-append">
                  <div className="input-group-text">days</div>
                </div>
              </div>
            </OptionField>
            <OptionField label="Custom URL">
              <input className="form-control" type="text" name="customShortened" placeholder="my-custom-url"
                value={this.state.customShortened} onChange={this.handleChange}
              />
            </OptionField>
            <OptionField label="Password">
              <input className="form-control" type="password" name="password"
                value={this.state.password} onChange={this.handleChange}
              />
            </OptionField>
            {this.state.password ? this.getConfirmPassword() : null}
            <OptionField label="Restriction method">
              <select className="custom-select w-100" name="restrictionMethod"
                value={this.state.restrictionMethod} onChange={this.handleChange}
              >
                <option value="None">None</option>
                <option value="Timeout">Timeout (5 seconds)</option>
                <option value="CAPTCHA">CAPTCHA</option>
                <option value="Block">Block</option>
              </select>
            </OptionField>
            {this.state.restrictionMethod === "None" ? null : this.getRestrictionLimit()}
          </div>
        </div>
      </>
    )
  }
}
