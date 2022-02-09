import Button from "components/Button";
import Heading from "components/Heading";
import React from "react";

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
        <Heading.H1 size="4xl">Something went wrong on our end. 😕</Heading.H1>
        <Heading.H2 w8t="medium" size="xl" overrideCSS="my-3">
          {error && error.toString()}
        </Heading.H2>
        <details className="my-3">{info && info.componentStack}</details>
        <Button
          role="anchor"
          anchorProps={{ href: "mailto:hi@abhinrustagi.xyz", ext: true }}
        >
          Send me an email
        </Button>
      </div>
    ) : (
      children
    );
  }
}

export default ErrorBoundary;
