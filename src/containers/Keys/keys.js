import React, { Component } from 'react';
import classes from './keys.css';
import Wrap from '../../hoc/wrap/wrap';
import NavigationItem from '../../components/Navigation/NavigationItems/NavigationItem/NavigationItem';
import axios from '../../axios-base';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';



class keys extends Component {

    state = {
        keyState: null,
        error: false
    }

    componentDidMount() {
        axios.get('https://jules-app.firebaseio.com/keys.json')
            .then(response => {
                this.setState({ keyState: response.data });
            })
            .catch(error => {
                this.setState({ error: true })
            })
    }

    render() {
        let keyItems = this.state.error ? <p>keys can''t be loaded</p> : <Spinner />
        if (this.state.keyState) {
            keyItems = (Object.keys(this.state.keyState).map(vKey => {
                return this.state.keyState[vKey]
            }));            

            keyItems = keyItems.filter(d => d.isShown).length > 0 ?
                keyItems.filter(d => d.isShown)
                    .sort((a, b) => { return a.orderNum - b.orderNum })
                    .map((d, index) => {
                        index += 1;
                        const linkTo = 'key/' + d.id;                           
                        const usedMark = (<div className={classes.usedMark}>✓</div>);
                        const listClass = d.isUsed ? classes.keyLinkUsed : classes.keyLink;

                        return (
                            <li key={index} className={listClass}>
                                <NavigationItem key={index} link={linkTo}>{d.title} {d.isUsed && usedMark}</NavigationItem>
                            </li>
                        )
                    }) : <span>You currently have no unlocked keys :(</span>
        }
        return (
            <Wrap>
                <h2 className={classes.title}>Keys</h2>
                <ul className={classes.keys}>
                    {keyItems}
                </ul>
            </Wrap>
        )

    }
}

export default withErrorHandler(keys, axios);