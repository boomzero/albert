import { Component } from 'react'


const FormGroup = (props) => (
  <div className='form-group form-row'>
    <label className={`col-12 ${props.horizontal ? 'col-md-4' : ''}`}>{props.label}</label>
    <div className={`col-12 ${props.horizontal ? 'col-md-8' : ''}`}>
      {props.children}
      <div className='invalid-feedback'>{props.invalidFeedback}</div>
    </div>
  </div>
)

const Password = (props) => {
  const valid = !props.value || props.value.length >= 8
  return (
    <FormGroup label='Password' horizontal={props.horizontal} invalidFeedback='Must have at least 8 characters'>
      <input className={`form-control ${valid ? '' : 'is-invalid'}`} name={props.name} type='password'
        value={props.value} onChange={props.onChange} required={props.required}
      />
    </FormGroup>
  )
}

class ConfirmedPassword extends Component {
  constructor(props) {
    super(props)

    this.state = { data: '', confirmed: '' }
  }

  isValid = () => this.state.confirmed === this.state.data

  handleChangeData = (event) => this.setState({ data: event.target.value })

  handleChangeConfirmed = (event) => this.setState({ confirmed: event.target.value }, () => {
    if (this.isValid()) this.props.onChange({ password: this.state.data })
  })

  render() {
    return (
      <>
        <Password value={this.state.data} onChange={this.handleChangeData}
          required={this.props.required} horizontal={this.props.horizontal}
        />
        {this.props.autoHide && !this.state.data ? null : (
          <FormGroup label='Confirm password' horizontal={this.props.horizontal} invalidFeedback='Password not match'>
            <input className={`form-control ${this.isValid() ? '' : 'is-invalid'}`} type='password'
              value={this.state.confirmed} onChange={this.handleChangeConfirmed} required={true}
            />
          </FormGroup>
        )}
      </>
    )
  }
}

const ExpireIn = (props) => (
  <FormGroup label="Expire in" horizontal={true}>
    <div className="input-group">
      <input className="form-control" type="number" name="lifespan"
        min="1" max="14" placeholder="14" value={props.value} onChange={props.onChange} required={props.required}
      />
      <div className="input-group-append">
        <div className="input-group-text">days</div>
      </div>
    </div>
  </FormGroup>
)

const RestrictionLimit = (props) => (
  <FormGroup label="Restriction limit" horizontal={true}>
    <div className="input-group">
      <input className="form-control" name={props.name} type="number"
        min="1" placeholder="86400" value={props.value} onChange={props.onChange} required={props.required}
      />
      <div className="input-group-append">
        <div className="input-group-text">requests/day</div>
      </div>
    </div>
  </FormGroup>
)

const RestrictionMethod = (props) => (
  <FormGroup label="Restriction method" horizontal={true}>
    <select className="custom-select w-100" name={props.name}
      value={props.value} onChange={props.onChange} required={props.required}
    >
      <option value="None">None</option>
      <option value="Timeout">Timeout (5 seconds)</option>
      <option value="CAPTCHA">CAPTCHA</option>
      <option value="Block">Block</option>
    </select>
  </FormGroup>
)

const Username = (props) => {
  const valid = !props.value || props.value.match(/^[A-Za-z0-9]{6,}$/)
  return (
    <FormGroup label='Username' invalidFeedback='Must have at least 6 characters and contains only A-Z, a-z, 0-9'>
      <input className={`form-control ${valid ? '' : 'is-invalid'}`} name={props.name} type='text'
        value={props.value} onChange={props.onChange} required={props.required}
      />
    </FormGroup>
  )
}


export default FormGroup
export { Password, ConfirmedPassword, ExpireIn, RestrictionLimit, RestrictionMethod, Username }
