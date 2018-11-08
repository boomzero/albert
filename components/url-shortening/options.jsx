import { Component } from "react"

import OptionField from "./option-field"


class Options extends Component {
  constructor(props) {
    super(props)

    this.state = {
      lifespan: 14,
      customShortened: "",
      password: "",
      confirmedPassword: "",
      restrictionMethod: "none",
      restrictionLimit: 86400,
    }
  }

  handleChange = (event) => this.setState(
    { [event.target.name]: event.target.value },
    () => this.props.onChange(this.state)
  )

  getConfirmPassword() {
    return (
      <OptionField labelText="Confirm password">
        <input className="form-control" type="password" name="confirmedPassword"
          value={this.state.confirmedPassword} onChange={this.handleChange}
          required
        />
      </OptionField>
    )
  }

  getRestrictionLimit() {
    return (
      <OptionField labelText="Restriction limit">
        <div className="input-group">
          <input className="form-control" type="number" name="restrictionLimit"
            min="1" placeholder="86400"
            value={this.state.restrictionLimit} onChange={this.handleChange}
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
        <button className="btn btn-outline-light mb-3" type="button"
          data-toggle="collapse" data-target="#url-shortening-options"
        >
          Options
        </button>

        <div className="collapse" id="url-shortening-options">
          <div className="card card-body">
            <OptionField labelText="Expire in">
              <div className="input-group">
                <input className="form-control" type="number" name="lifespan"
                  min="1" max="14" placeholder="14"
                  value={this.state.lifespan} onChange={this.handleChange}
                />
                <div className="input-group-append">
                  <div className="input-group-text">days</div>
                </div>
              </div>
            </OptionField>
            <OptionField labelText="Custom URL">
              <input className="form-control" type="text" name="customShortened" placeholder="my-custom-url"
                value={this.state.customShortened} onChange={this.handleChange}
              />
            </OptionField>
            <OptionField labelText="Password">
              <input className="form-control" type="password" name="password"
                value={this.state.password} onChange={this.handleChange}
              />
            </OptionField>
            {this.state.password ? this.getConfirmPassword() : null}
            <OptionField labelText="Restriction method">
              <select className="w-100" name="restrictionMethod"
                value={this.state.restrictionMethod} onChange={this.handleChange}
              >
                <option value="none">None</option>
                <option value="timeout">Timeout (5 seconds)</option>
                <option value="captcha">CAPTCHA</option>
                <option value="block">Block</option>
              </select>
            </OptionField>
            {this.state.restrictionMethod !== "none" ? this.getRestrictionLimit() : null}
          </div>
        </div>
      </>
    )
  }
}


export default Options
