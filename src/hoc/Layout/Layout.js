import React, {Component} from 'react';
import Wrap from '../wrap/wrap'
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import home from '../../containers/Home/home';
import clues from '../../containers/Clues/clues';
import clue from '../../containers/Clues/Clue/Clue';
import vouchers from '../../containers/Vouchers/vouchers';
import voucher from '../../containers/Vouchers/voucher/voucher';
import presents from '../../containers/Presents/presents';
import present from '../../containers/Presents/Present/present';
import actions from '../../containers/actions/actions';
import action from '../../containers/actions/action/Action';
import { Route } from 'react-router-dom';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    hideSideDrawerHandler = () => {
        this.setState({showSideDrawer: false});
    }

    showSideDrawerHandler = (prevState) => {
        this.setState({showSideDrawer: !prevState.showSideDrawer});
    }

    render(){
        return (
        <Wrap>
            <Toolbar mobileNavClicked={this.showSideDrawerHandler}/>
            <SideDrawer 
                isOpen={this.state.showSideDrawer} 
                close={this.hideSideDrawerHandler} />
            <main className={classes.Content}>
                {/* {this.props.children} */}
                <Route path="/" exact component={home}/>
                <Route path="/clues" exact component={clues}/>
                <Route path="/clue/:id" component={clue}/>
                <Route path="/vouchers" exact component={vouchers}/>
                <Route path="/voucher/:id" component={voucher}/>
                <Route path="/presents" exact component={presents}/>
                <Route path="/present/:id" component={present}/>
                <Route path="/actions" exact component={actions}/>
                <Route path="/action/:id" component={action}/>
            </main>
        </Wrap>
        )
    }
}

export default Layout;