import React, { Component } from 'react';
import classes from './actions.css';
import Action from './action/Action';
import NavigationItem from '../../components/Navigation/NavigationItems/NavigationItem/NavigationItem';
import axios from '../../axios-base';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


class Actions extends Component {

    state = {
        actionsState: null,
        error: false
    }

    componentDidMount() {
        axios.get('https://jules-app.firebaseio.com/actions.json')
            .then(response => {
                this.setState({ actionsState: response.data });
            })
            .catch(error => {
                this.setState({ error: true })
            })
    }

    render() {
        let allActions = this.state.error ? <p>actions can''t be loaded</p> : <Spinner />
        if (this.state.actionsState) {
            allActions = (Object.keys(this.state.actionsState).map(key => {
                return this.state.actionsState[key]
            }));
            
            allActions = allActions.filter(d => d.isShown)
                .sort((a, b) => { return a.orderNum - b.orderNum })
                .map((d, index) => {
                    index += 1;
                    const linkTo = '/action/' + d.id;
                    const actionId = d.id;
                    const actionListStyle = d.isAnswered ? classes.actionItemAnswered : classes.actionItem;
                    const answeredMark = (<div className={classes.answeredMark}>✓</div>);

                    return (
                        <li key={index} className={actionListStyle}>
                            <NavigationItem link={linkTo}>{actionId} {d.isAnswered && answeredMark}</NavigationItem>
                        </li>
                    )
                })
        }

        return (
            <div className='actions'>
                <h1>Your actions so far...</h1>
                <ul className='actionList'>
                    {allActions}
                </ul>
            </div>
        )
    }
}

export default withErrorHandler(Actions, axios);
