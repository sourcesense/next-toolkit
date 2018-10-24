import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatic from 'hoist-non-react-statics';

import { getDisplayName } from './utils';

const NullLoader = () => (null);

export default function withLoader(Loader = NullLoader) {
  return function addLoader(WrappedComponent) {
    class PageWithLoader extends React.Component {
      state = { readyClientSide: false };

      componentDidMount() {
        if (!this.ready()) {
          this.loadData();
        }
      }

      componentDidUpdate() {
        if (!this.ready()) {
          this.loadData();
        }
      }

      static getDerivedStateFromProps(props, state) {
        const { context } = props;
        if (context && context.asPath && state.asPath && context.asPath !== state.asPath) {
          return {
            readyClientSide: false,
          };
        }
        return null;
      }

      ready = () => {
        const { readyServerSide } = this.props;
        const { readyClientSide } = this.state;
        return readyServerSide || readyClientSide;
      };

      loadData = () => {
        if (!this.ready()) {
          const { context } = this.props;
          WrappedComponent.getInitialProps(context).then((initialProps) => {
            this.setState({
              ...initialProps,
              readyClientSide: true,
              asPath: context.asPath,
            }); // recupero le props e le pusho nello state
          });
        }
      };

      render() {
        const { readyServerSide, context, ...childProps } = this.props;
        const { readyClientSide, ...childState } = this.state;
        if (!this.ready()) {
          return <Loader />;
        }
        return <WrappedComponent {...childProps} {...childState} />;
      }
    }

    hoistNonReactStatic(PageWithLoader, WrappedComponent);

    PageWithLoader.displayName = `PageWithLoader(${getDisplayName(WrappedComponent)})`;
    PageWithLoader.defaultProps = {
      readyServerSide: false,
    };
    PageWithLoader.propTypes = {
      readyServerSide: PropTypes.bool,
      context: PropTypes.shape({
        req: PropTypes.object,
        asPath: PropTypes.string.isRequired,
        pathname: PropTypes.string.isRequired,
        query: PropTypes.object.isRequired,
        res: PropTypes.object,
        jsonPageRes: PropTypes.object,
        err: PropTypes.object,
      }).isRequired,
    };

    PageWithLoader.getInitialProps = async (context) => {
      const { req, res, ...initialContext } = context;
      if (req) {
        return WrappedComponent.getInitialProps(context).then((pageProps) => ({
          ...pageProps,
          readyServerSide: true,
          context: initialContext,
        }));
      }
      return {
        readyServerSide: false,
        context: initialContext,
      };
    };
    return PageWithLoader;
  };
}
