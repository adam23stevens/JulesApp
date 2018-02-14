import React from 'react';
import classes from './vouchers.css';
import data from './data';
import Wrap from '../../hoc/wrap/wrap';
import NavigationItem from '../../components/Navigation/NavigationItems/NavigationItem/NavigationItem';

const vouchers = () => {
    const voucherItems = data.filter(d => d.voucher.isShown).map((d, index) => {
        index += 1;
        const linkTo = 'voucher/' + d.voucher.id;
        const usedMark = (<div className={classes.usedMark}>!</div>);

        return (
            <li key={index} className={classes.voucherLink}>
                <NavigationItem key={index} link={linkTo}>{d.voucher.title} { d.voucher.isUsed && usedMark}</NavigationItem>
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