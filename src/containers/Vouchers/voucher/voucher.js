import React, { Component } from 'react';
import Wrap from '../../../hoc/wrap/wrap';
import classes from './voucher.css';
import NavigationItem from '../../../components/Navigation/NavigationItems/NavigationItem/NavigationItem';
import axios from '../../../axios-base';
import Spinner from '../../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

class voucher extends Component {

    state = {
        voucherState: null,
        error: false
    }


    redeemVoucher = (voucher) => {
       
        const url = 'https://jules-app.firebaseio.com/vouchers/' + voucher.id + '.json';
        voucher.isUsed = true;

        axios.put(url, voucher)
        .then(response => {
            alert(voucher.title + ' has been redeemed. Enjoy!');
        })
        .catch(error => {
            console.log(error);
        })
    }

    redeemUsedVoucher = (voucher) => {
        alert(voucher.title + ' has already been used you cheeky monkey!');
    }

    componentDidMount() {
        console.log(this.props.match.params.id);
        const axiosUrl = 'https://jules-app.firebaseio.com/vouchers/' + this.props.match.params.id + '.json';
        axios.get(axiosUrl)
            .then(response => {
                this.setState({ voucherState: response.data });
            })
            .catch(error => {
                this.setState({ error: true })
            })
    }

    render() {
        const backText = '<-Back to vouchers';

        let voucherDisplay = this.state.error ? <p>cannot load voucher</p> : <Spinner />
        if (this.state.voucherState) {
            const voucherItem = this.state.voucherState;

            voucherDisplay = (
                <Wrap>
                    <div className={classes.voucher}>
                        <h3>{voucherItem.title}</h3>
                        <span>This voucher entitles you to: </span>
                        <span>{voucherItem.voucherText}</span>
                    </div>
                    <div className='voucher-accept'>
                        {!voucherItem.isUsed &&
                            <input className={classes.redeemButton} type='button' value='Redeem' onClick={() => this.redeemVoucher(voucherItem)} />
                        }
                        {voucherItem.isUsed &&
                            <input className={classes.redeemButtonUsed} type='button' value='Redeemed!' onClick={() => this.redeemUsedVoucher(voucherItem)} />
                        }
                    </div>
                </Wrap>
            )
        }

        return (
            <Wrap>
                {voucherDisplay}
                <div className={classes.back}>
                    <NavigationItem link='/vouchers'>{backText}</NavigationItem>
                </div>
            </Wrap>
        )
    }
}


export default withErrorHandler(voucher, axios);