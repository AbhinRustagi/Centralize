import React from "react";
import { Button } from "../components";

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
    error: { message: "", stack: "" },
    info: { componentStack: "" },
  };

  static getDerivedStateFromError = (error) => {
    return { hasError: true };
  };

  componentDidCatch = (error, info) => {
    this.setState({ error, info });
  };

  render() {
    const { hasError, error, info } = this.state;
    const { children } = this.props;

    return hasError ? (
      <div className="container my-20">
        <h1 className="font-bold text-3xl">
          Something went wrong on our end. :(
        </h1>
        <h2 className="font-medium text-xl my-3">
          {error && error.toString()}
        </h2>
        <details className="my-3">{info && info.componentStack}</details>
        <Button href="mailto:hi@abhinrustagi.xyz" extHref type="primary">
          Send me an email
        </Button>
      </div>
    ) : (
      children
    );
  }
}

export default ErrorBoundary;
