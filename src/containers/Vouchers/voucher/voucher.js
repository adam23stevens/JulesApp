import React, { Component } from 'react';
import data from '../data';
import Wrap from '../../../hoc/wrap/wrap';
import classes from './voucher.css';
import NavigationItem from '../../../components/Navigation/NavigationItems/NavigationItem/NavigationItem';

class voucher extends Component {


    redeemVoucher = (voucher) => {
        //set voucher to isUsed = true;
        alert(voucher.title + ' has been redeemed. Enjoy!');
    }

    redeemUsedVoucher = (voucher) => {
        alert(voucher.title + ' has already been used you cheeky monkey!');
    }

    render() {
        const id = this.props.match.params.id;
        const thisData = data.filter(d => d.voucher.id === id);
        const thisVoucher = thisData[0].voucher;

        return (
            <Wrap>
                <div className={classes.voucher}>
                    <h3>{thisVoucher.title}</h3>
                    <span>This voucher entitles you to: </span>
                    <span>{thisVoucher.desc}</span>
                </div>
                <div className='voucher-accept'>
                    {!thisVoucher.isUsed &&
                        <input className={classes.redeemButton} type='button' value='Redeem' onClick={() => this.redeemVoucher(thisVoucher)} />
                    }
                    {thisVoucher.isUsed &&
                        <input className={classes.redeemButtonUsed} type='button' value='Redeemed!' onClick={() => this.redeemUsedVoucher(thisVoucher)}/>
                    }
                </div>
            </Wrap>
        )
    }
}

export default voucher;