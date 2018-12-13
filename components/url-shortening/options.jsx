import { Component } from "react"

import FormGroup, { ConfirmedPassword, ExpireIn, RestrictionLimit, RestrictionMethod } from '../common/form-groups'


const CustomShortened = (props) => {
  const valid = !props.value || props.value.match(/^[A-Za-z0-9-]{6,}$/)
  return (
    <FormGroup label='Custom URL' horizontal={true}
      invalidFeedback='Must have at least 6 characters and contains only A-Z, a-z, 0-9, -'
    >
      <input className={`form-control ${valid ? '' : 'is-invalid'}`} name={props.name} type='text'
        value={props.value} onChange={props.onChange} required={props.required}
      />
    </FormGroup>
  )
}


export default class Options extends Component {
  constructor(props) {
    super(props)

    this.state = {
      lifespan: 14,
      customShortened: "",
      password: "",
      restrictionMethod: "None",
      restrictionLimit: 86400,
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({ [name]: value })
    this.props.onChange({ [name]: value })
  }

  handleChangePassword = (data) => {
    this.setState({ password: data.password })
    this.props.onChange({ password: data.password })
  }

  render() {
    return (
      <>
        <button className="btn btn-outline-light mb-3" type='button'
          data-toggle="collapse" data-target="#url-shortening-options"
        >
          Options
        </button>

        <div className="collapse" id="url-shortening-options">
          <div className="card card-body">
            <ExpireIn name='lifespan' value={this.state.lifespan} onChange={this.handleChange} />
            <CustomShortened name='customShortened' value={this.state.customShortened} onChange={this.handleChange} />
            <ConfirmedPassword onChange={this.handleChangePassword} autoHide={true} horizontal={true} />
            <RestrictionMethod name='restrictionMethod' value={this.state.restrictionMethod} onChange={this.handleChange} />
            {this.state.restrictionMethod === "None" ? null : (
              <RestrictionLimit name='restrictionLimit' value={this.state.restrictionLimit} onChange={this.handleChange} />
            )}
          </div>
        </div>
      </>
    )
  }
}
