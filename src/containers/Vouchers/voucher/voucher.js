import React, { component } from 'react';
import data from '../data';
import NavigationItem from '../../../components/Navigation/NavigationItems/NavigationItem/NavigationItem';

class voucher extends Component {

    render() {
        const id = this.props.match.params.id;
        const thisData = data.filter(d => d.clue.id === id);
        const thisVoucher = thisData[0].voucher;

        return (
            <div className='voucher'>
                <h3>{thisVoucher.title}</h3>
            </div>
        )
    }
    
}