import { Component } from 'react'
import axios from 'axios'
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'


export default class Metrics extends Component {
  constructor(props) {
    super(props)

    this.state = { data: [] }
  }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/urls/accesses', {
        headers: { authorization: localStorage.getItem('jwt_token') },
      })
      const data = Object.entries(res.data).map(([k, v]) => {
        return { day: k, accessCount: v }
      })
      this.setState({ data })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    if (!this.state.data) return null
    return (
      <AreaChart width={600} height={400} data={this.state.data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id='areaColor' x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2e8b57" stopOpacity={1} />
            <stop offset="100%" stopColor="#3cb371" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 6" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="accessCount" stroke="#2e8b57" fillOpacity={1} fill="url(#areaColor)" />
      </AreaChart>
    )
  }
}
