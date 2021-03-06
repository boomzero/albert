import Page from './page'
import PasswordPage from './password-page'
import { Captcha, Timeout } from '../restrictions'


const ExpiredPage = (props) => (
  <Page redirected={false} title="URL Expired"
    message={`This URL has been expired since ${props.since.format("MMM DD, YYYY HH:mm:ss")}.`}
  />
)

const DeactivatedPage = (props) => (
  <Page redirected={false} title="URL Deactivated" message='This URL has been deactivated by the owner.' />
)

const TimeoutPage = (props) => (
  <Page redirected={true} title='URL Restricted'>
    <Timeout duration={props.duration} redirectTo={props.redirectTo} />
  </Page>
)

const CaptchaPage = (props) => (
  <Page redirected={true} title='URL Restricted'>
    <Captcha redirectTo={props.redirectTo} />
  </Page>
)

const BlockedPage = (props) => (
  <Page redirected={false} title='URL Blocked' message='The number of accesses has exceeded the limit of this URL.' />
)


export default Page
export { ExpiredPage, DeactivatedPage, TimeoutPage, CaptchaPage, BlockedPage, PasswordPage }
