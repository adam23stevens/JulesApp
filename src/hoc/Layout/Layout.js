import React, {Component} from 'react';
import Wrap from '../wrap/wrap'
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import home from '../../containers/Home/home';
import clues from '../../containers/Clues/clues';
import clue from '../../containers/Clues/Clue/Clue';
import riddles from '../../containers/Riddles/riddles';
import riddle from '../../containers/Riddles/Riddle/riddle';
import actions from '../../containers/actions/actions';
import action from '../../containers/actions/action/Action';
import keys from '../../containers/Keys/keys';
import key from '../../containers/Keys/Key/key';
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
                <Route path="/riddles" exact component={riddles}/>
                <Route path="/riddle/:id" component={riddle}/>                
                <Route path="/actions" exact component={actions}/>
                <Route path="/action/:id" component={action}/>
                <Route path="/keys" exact component={keys}/>
                <Route path="/key/:id" component={key}/>
            </main>
        </Wrap>
        )
    }
}

export default Layout;