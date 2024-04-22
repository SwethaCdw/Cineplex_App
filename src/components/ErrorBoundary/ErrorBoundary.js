import React from 'react';

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    console.log(props)
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });
  }


  render() {
    if (this.state.hasError) {
        return (
            <>
            {this.state.error && <h1> {this.state.error.message}</h1>}
            </>
        )
    }

    return this.props.children;
  }
}

export default ErrorBoundary;