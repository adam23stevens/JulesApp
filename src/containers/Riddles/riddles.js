import React, { Component } from 'react';
import classes from './riddles.css';
import Wrap from '../../hoc/wrap/wrap';
import NavigationItem from '../../components/Navigation/NavigationItems/NavigationItem/NavigationItem';
import axios from '../../axios-base';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';



class riddles extends Component {

    state = {
        riddleState: null,
        error: false
    }

    componentDidMount() {
        axios.get('https://jules-app.firebaseio.com/riddles.json')
            .then(response => {
                this.setState({ riddleState: response.data });
            })
            .catch(error => {
                this.setState({ error: true })
            })
    }

    render() {
        let riddleItems = this.state.error ? <p>Riddles can''t be loaded</p> : <Spinner />
        if (this.state.riddleState) {
            riddleItems = (Object.keys(this.state.riddleState).map(vKey => {
                return this.state.riddleState[vKey]
            }));            

            riddleItems = riddleItems.filter(d => d.isShown).length > 0 ?
                riddleItems.filter(d => d.isShown)
                    .sort((a, b) => { return a.orderNum - b.orderNum })
                    .map((d, index) => {
                        index += 1;
                        const linkTo = 'riddle/' + d.id;                           
                        const usedMark = (<div className={classes.usedMark}>✓</div>);
                        const listClass = d.isUsed ? classes.riddleLinkUsed : classes.riddleLink;

                        return (
                            <li key={index} className={listClass}>
                                <NavigationItem key={index} link={linkTo}>{d.title} {d.isUsed && usedMark}</NavigationItem>
                            </li>
                        )
                    }) : <span>You currently have no unlocked riddles :(</span>
        }
        return (
            <Wrap>
                <h1>Your available riddles</h1>
                <ul className={classes.riddles}>
                    {riddleItems}
                </ul>
            </Wrap>
        )

    }
}

export default withErrorHandler(riddles, axios);