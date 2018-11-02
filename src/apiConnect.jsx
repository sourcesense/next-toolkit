import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { getDisplayName } from './utils';

/**
 * HOC that connects a Component to next page architecture
 * attaching an async function as a getInitialProps
 *
 * @param {*} getInitialProps async function to be called by next
 *
 * @returns a react component that wraps the original component and
 * can be used as a page in a next application
 */
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
