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


export default FormGroup
export { Username, Password, ConfirmedPassword }
