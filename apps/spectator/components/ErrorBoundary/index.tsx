import { Component, ComponentType, createElement, ReactNode } from 'react';

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

export type FallbackProps = {
  error: Error | null;
  resetErrorBoundary: () => void;
};

type ErrorBoundaryProps = {
  children: ReactNode;
  onReset: () => void;
  fallback: ComponentType<FallbackProps>;
};

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
    };

    this.resetErrorBoundary = this.resetErrorBoundary.bind(this);
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  resetErrorBoundary(): void {
    this.props.onReset();

    this.setState({
      hasError: false,
      error: null,
    });
  }

  render() {
    const { state, props, resetErrorBoundary } = this;

    const { hasError, error } = state;
    const { fallback, children } = props;

    const fallbackProps: FallbackProps = {
      error,
      resetErrorBoundary,
    };

    const fallbackComponent = createElement(fallback, fallbackProps);

    return hasError ? fallbackComponent : children;
  }
}
