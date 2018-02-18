import React, { Component } from 'react';
import classes from './vouchers.css';
import data from './data';
import Wrap from '../../hoc/wrap/wrap';
import NavigationItem from '../../components/Navigation/NavigationItems/NavigationItem/NavigationItem';
import axios from '../../axios-base';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';



class vouchers extends Component {

    state = {
        voucherState: null,
        error: false
    }

    componentDidMount() {
        axios.get('https://jules-app.firebaseio.com/vouchers.json')
            .then(response => {
                this.setState({ voucherState: response.data });
            })
            .catch(error => {
                this.setState({ error: true })
            })
    }

    render() {
        let voucherItems = this.state.error ? <p>vouchers can''t be loaded</p> : <Spinner />
        if (this.state.voucherState) {
            voucherItems = (Object.keys(this.state.voucherState).map(vKey => {
                return this.state.voucherState[vKey]
            }));
            console.log(voucherItems);


            voucherItems = voucherItems.filter(d => d.isShown).map((d, index) => {
                index += 1;
                const linkTo = 'voucher/' + d.id;
                const usedMark = (<div className={classes.usedMark}>!</div>);

                return (
                    <li key={index} className={classes.voucherLink}>
                        <NavigationItem key={index} link={linkTo}>{d.title} {d.isUsed && usedMark}</NavigationItem>
                    </li>
                )
            })
        }
        return (
            <Wrap>
                <h1>vouchers</h1>
                <ul className={classes.vouchers}>
                    {voucherItems}
                </ul>
            </Wrap>
        )

    }
}

export default withErrorHandler(vouchers, axios);