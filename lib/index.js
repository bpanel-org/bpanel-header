// Entry point for your plugin
// This should expose your plugin's modules
/* START IMPORTS */
import HeaderPlugin from './Header';
/* END IMPORTS */

/* START EXPORTS */

export const metadata = {
  name: '@bpanel/bpanel-header',
  pathName: '',
  displayName: 'bPanel Header',
  author: 'bcoin-org',
  description: 'Default header for bpanel',
  version: require('../package.json').version
};

export const mapComponentState = {
  Header: (state, map) =>
    Object.assign(map, {
      bcoinUri: state.node.serverInfo.bcoinUri,
      loading: state.node.loading,
      network: state.node.node.network,
      clients: state.clients
    })
};

export const decorateHeader = (Header, { React, PropTypes }) => {
  const clientPropTypes = {
    chain: PropTypes.string,
    services: PropTypes.shape({
      node: PropTypes.bool,
      wallet: PropTypes.bool,
      multisig: PropTypes.bool
    })
  };
  return class extends React.PureComponent {
    static displayName() {
      return 'bPanelHeader';
    }

    static get propTypes() {
      return {
        theme: PropTypes.object,
        network: PropTypes.string,
        clients: PropTypes.shape({
          clients: PropTypes.objectOf(
            (obj, key, componentName, location, propFullName) => {
              if (!obj[key].chain)
                return new Error(
                  'Invalid prop `' +
                    propFullName +
                    '` supplied to' +
                    ' `' +
                    componentName +
                    '`. Expected `id` property'
                );
              if(!obj[key].services) {
                return new Error(
                  'Invalid prop `' +
                    propFullName +
                    '` supplied to' +
                    ' `' +
                    componentName +
                    '`. Expected `services` property'
                );
              }
              if (
                typeof obj[key].chain !== 'string'
              )
                return new Error(
                  'Invalid prop `' +
                    propFullName +
                    '` supplied to' +
                    ' `' +
                    componentName +
                    '`. Validation failed.'
                );
            }
          ),
          currentClient: PropTypes.shape(clientPropTypes)
        }),
        loading: PropTypes.bool,
        bcoinUri: PropTypes.string
      };
    }

    componentWillMount() {
      const { network, bcoinUri, clients } = this.props;
      this.header = HeaderPlugin({
        statusIcon: 'ellipsis-h',
        clients,
        bcoinUri,
        network
      });
    }

    componentWillUpdate(nextProps) {
      const statusIcon = nextProps.loading ? 'ellipsis-h' : 'check-circle';
      const headerProps = Object.assign({ statusIcon }, nextProps);
      this.header = HeaderPlugin(headerProps);
    }

    render() {
      return <Header {...this.props} headerWidgets={this.header} />;
    }
  };
};
