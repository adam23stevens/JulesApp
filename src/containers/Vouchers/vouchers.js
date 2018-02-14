import React from 'react';
import classes from './vouchers.css';
import data from './data';
import Wrap from '../../hoc/wrap/wrap';
import NavigationItem from '../../components/Navigation/NavigationItems/NavigationItem/NavigationItem';

const vouchers = () => {
    const voucherItems = data.filter(d => d.voucher.isShown).map((d, index) => {
        index += 1;
        return (
            <li key={index}>
                <NavigationItem key={index} link={d.voucher.id}>{d.voucher.title}</NavigationItem>
            </li>
        )
    })
    return (
        <Wrap>
            <h1>vouchers</h1>
            <ul className={classes.vouchers}>
                {voucherItems}
            </ul>
        </Wrap>
    )
}

export default vouchers;