import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { getDisplayName } from './utils';

export default function includeEdgeSide(WrappedComponent) {
  class EdgeSideIncluded extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        ready: false,
      };
    }

    componentDidMount() {
      const { path } = this.props;
      if (!global.window[path]) {
        this.loadData();
      } else {
        this.setState({ ...global.window[path], ready: true, serverSideRendered: false });
      }
    }

    componentDidUpdate() {
      const { serverSideRendered } = this.props;
      if (!serverSideRendered) {
        this.loadData();
      }
    }

    loadData = () => {
      const { ready } = this.state;
      const { context } = this.props;
      if (!ready) {
        WrappedComponent.getInitialProps(context).then((state) => {
          this.setState({ ...state, ready: true, serverSideRendered: false });
        });
      }
    }

    render() {
      const { path, serverSideRendered } = this.props;
      if (serverSideRendered && !global.window) {
        return React.createElement('esi:include', { src: path });
      }
      if (global.window && global.window[path]) {
        return (
          <div id={path}>
            <WrappedComponent key={path} {...global.window[path]} />
            <script type="text/javascript" dangerouslySetInnerHTML={{ __html: `window["${path}"] = ${JSON.stringify(global.window[path])};` }} />
          </div>
        );
      }
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  }

  EdgeSideIncluded.displayName = `EdgeSideIncluded(${getDisplayName(WrappedComponent)})`;
  EdgeSideIncluded.defaultProps = {
    serverSideRendered: false,
  };
  EdgeSideIncluded.propTypes = {
    path: PropTypes.string.isRequired,
    serverSideRendered: PropTypes.bool,
  };
  hoistNonReactStatic(EdgeSideIncluded, WrappedComponent);

  EdgeSideIncluded.getInitialProps = async function getEdgeInitialProps(context) {
    return WrappedComponent.then((pageProps) => ({
      ...pageProps,
      serverSideRendered: true,
      context: { ...context, res: undefined, req: undefined },
    }));
  };

  return EdgeSideIncluded;
}
