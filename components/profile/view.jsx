import FormGroup from '../common/form-groups'


export default (props) => (
  <form className='form'>
    <FormGroup label='Username:' horizontal={true}>
      <input className='form-control-plaintext' value={props.data.username} readOnly={true} />
    </FormGroup>
    <FormGroup label='Full name:' horizontal={true}>
      <input className='form-control-plaintext' value={`${props.data.firstName} ${props.data.lastName}`} readOnly={true} />
    </FormGroup>
    <FormGroup label='Biography:' horizontal={true}>
      <textarea className='form-control-plaintext' value={props.data.bio} readOnly={true} />
    </FormGroup>
    <FormGroup label='Email:' horizontal={true}>
      <input className='form-control-plaintext' value={props.data.email} readOnly={true} />
    </FormGroup>
    <button className='btn btn-primary' type='button' onClick={() => props.onToggleMode()}>Edit profile</button>
  </form>
)
