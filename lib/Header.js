import React from 'react';
import PropTypes from 'prop-types';
import { Text, utils, widgetCreator } from '@bpanel/bpanel-ui';

const { connectTheme } = utils;

class Header extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  static get propTypes() {
    return {
      theme: PropTypes.object,
      network: PropTypes.string,
      setCurrentClient: PropTypes.func.isRequired,
      statusIcon: PropTypes.string,
      clients: PropTypes.object
    };
  }

  onConfigChange(e) {
    const { clients: { clients }, setCurrentClient } = this.props;
    const id = e.target.value;
    if (!clients[id]) console.error(`Client with id ${id} does not exist`);
    else setCurrentClient({ id, ...clients[id] });
  }

  render() {
    const {
      theme,
      statusIcon,
      network,
      clients,
      setCurrentClient
    } = this.props;
    let nodeId = (
      <Text className={`${theme.headerbar.text}`}>
        {clients.currentClient.id}
      </Text>
    );

    // if we have more than one client, we want to show a dropdown instead of text
    const ids = Object.keys(clients.clients);
    if (ids.length)
      nodeId = (
        <select
          id="client-select"
          onChange={e => this.onConfigChange(e)}
          defaultValue={clients.currentClient.id}
        >
          {ids.map(id => (
            <option value={id} key={id}>
              {id}
            </option>
          ))}
        </select>
      );
    return (
      <div className="container">
        <div
          className={`${
            theme.headerbar.networkStatus
          } ml-md-auto text-right col`}
        >
          <div className="chain">
            <Text className={`${theme.headerbar.text} `}>
              CHAIN: {clients.currentClient.chain} | NETWORK: {network}
              <i
                className={`${theme.headerbar.icon} fa fa-${statusIcon}`}
                areahidden="true"
              />
            </Text>
          </div>
          <div className="network text-uppercase" />
          <div className="node">
            <Text
              className={`${theme.headerbar.nodeText} ${theme.headerbar.text}`}
            >
              <label htmlFor="client-select">Client:</label>{' '}
            </Text>
            {nodeId}
          </div>
        </div>
      </div>
    );
  }
}

export default widgetCreator(connectTheme(Header));
