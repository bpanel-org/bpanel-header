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
      statusIcon: PropTypes.string,
      clients: PropTypes.object
    };
  }

  render() {
    const { theme, statusIcon, network, clients } = this.props;
    let nodeId = (
      <Text className={`${theme.headerbar.text}`}>
        {clients.currentClient.id}
      </Text>
    );

    // if we have more than one client, we want to show a dropdown instead of text
    const ids = Object.keys(clients.clients);
    if (ids.length)
      nodeId = (
        <select id="client-select" onChange={e => console.log(e.target.value)} defaultValue={clients.currentClient.id}>
          {ids.map(id => (
            <option
              value={id}
              key={id}
            >
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
          <div className="network text-uppercase">
            <Text className={theme.headerbar.text}>
              Status: {network}
              <i
                className={`${theme.headerbar.icon} fa fa-${statusIcon}`}
                areahidden="true"
              />
            </Text>
          </div>
          <div className="node">
            <Text
              className={`${theme.headerbar.nodeText} ${theme.headerbar.text}`}
            >
              <label htmlFor="client-select">Node:</label>{' '}
            </Text>
            {nodeId}
          </div>
        </div>
      </div>
    );
  }
}

export default widgetCreator(connectTheme(Header));
