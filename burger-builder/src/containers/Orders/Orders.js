import React, { Component } from 'react';

import axios from '../../axios-orders';
import withErrorHandler from '../withErrorHandler/withErrorHandler';

import Order from '../../components/Order/Order';


class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('orders.json')
            .then(res => {
                let fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({loading: false, orders: fetchedOrders});
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        let orders = this.state.orders.map(order => (
            <Order
                key={order.id}
                ingredients={order.ingredients}
                price={order.price} />
        ));

        return (
            <div>
                {orders}
            </div>
        );
    }
}

export default withErrorHandler(Orders);