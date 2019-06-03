import React, { Component } from 'react';

// Externals
import classNames from 'classnames';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel
} from '@material-ui/core';

// Shared services
import { getOrders } from 'services/order';

// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent
} from 'components';

// Component styles
import styles from './styles';
import axios from 'axios';

class OrdersTable extends Component {
  signal = false;

  state = {
    isLoading: false,
    limit: 10,
    orders: []
  };

  async getOrders(limit) {
    try {
      this.setState({ isLoading: true });

      const { orders } = await getOrders(limit);

      if (this.signal) {
        this.setState({
          isLoading: false,
          orders
        });
      }
    } catch (error) {
      if (this.signal) {
        this.setState({
          isLoading: false,
          error
        });
      }
    }
  }

  componentDidMount() {
    axios
      .get('https://backend.saadabot.com/api/bot')
      .then(response => {
        this.setState({ orders: response.data });
      })
      .catch(error => {
        // handle error
        console.log(error);
      });

    this.signal = true;
  }

  componentWillUnmount() {
    this.signal = false;
  }

  render() {
    const { classes, className } = this.props;
    const { isLoading, orders } = this.state;

    const rootClassName = classNames(classes.root, className);
    const showOrders = !isLoading && orders.length > 0;

    return (
      <Portlet className={rootClassName}>
        <PortletHeader noDivider>
          <PortletLabel title="RECEIPTS" />
        </PortletHeader>
        <PerfectScrollbar>
          <PortletContent className={classes.portletContent} noPadding>
            {isLoading && (
              <div className={classes.progressWrapper}>
                <CircularProgress />
              </div>
            )}
            {showOrders && (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="left">From</TableCell>
                    <TableCell align="left">To</TableCell>
                    <TableCell align="left" sortDirection="desc">
                      <Tooltip enterDelay={300} title="Sort">
                        <TableSortLabel active direction="desc">
                          Date
                        </TableSortLabel>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map(order => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={order.Name}>
                      <TableCell>{order.Name}</TableCell>
                      <TableCell className={classes.customerCell}>
                        {order.From}
                      </TableCell>
                      <TableCell>
                        <div className={classes.statusWrapper}>{order.To}</div>
                      </TableCell>
                      <TableCell>
                        {moment(order.date).format('DD/MM/YYYY')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </PortletContent>
        </PerfectScrollbar>
      </Portlet>
    );
  }
}

OrdersTable.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(OrdersTable);
