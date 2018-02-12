import React, {Component} from 'react';
import Wrap from '../wrap/wrap'
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import OutfitBuilder from '../../containers/OutfitBuilder/OutfitBuilder';
import AddOutfitPart from '../../containers/AddOutfitPart/AddOutfitPart';
import Stats from '../../containers/Stats/Stats';
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
                <Route path="/" exact component={OutfitBuilder}/>
                <Route path="/stats" exact component={Stats}/>
                <Route path="/add" exact component={AddOutfitPart}/>
            </main>
        </Wrap>
        )
    }
}

export default Layout;