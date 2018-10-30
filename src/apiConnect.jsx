import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { getDisplayName } from './utils';

export default function apiConnect(getInitialProps) {
  return (WrappedComponent) => {
    // eslint-disable-next-line react/prefer-stateless-function
    class ApiConnected extends React.Component {
      render() {
        return <WrappedComponent {...this.props} />;
      }
    }
    hoistNonReactStatic(ApiConnected, WrappedComponent);
    ApiConnected.getInitialProps = getInitialProps;
    ApiConnected.displayName = `ApiConnected(${getDisplayName(WrappedComponent)})`;
    return ApiConnected;
  };
}
