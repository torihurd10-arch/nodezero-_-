import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="halo-card">
          <h2 className="halo-title">Module error</h2>
          <p className="mt-2 text-sm text-rose-300">Something went wrong. Refresh to recover the cockpit view.</p>
        </div>
      )
    }

    return this.props.children
  }
}
