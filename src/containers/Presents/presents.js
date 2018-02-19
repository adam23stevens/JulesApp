import React, { Component } from 'react';
import classes from './presents.css';
import Wrap from '../../hoc/wrap/wrap';
import NavigationItem from '../../components/Navigation/NavigationItems/NavigationItem/NavigationItem';
import axios from '../../axios-base';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';



class presents extends Component {

    state = {
        presentState: null,
        error: false
    }

    componentDidMount() {
        axios.get('https://jules-app.firebaseio.com/presents.json')
            .then(response => {
                this.setState({ presentState: response.data });
            })
            .catch(error => {
                this.setState({ error: true })
            })
    }

    render() {
        let presentItems = this.state.error ? <p>Presents can''t be loaded</p> : <Spinner />
        if (this.state.presentState) {
            presentItems = (Object.keys(this.state.presentState).map(vKey => {
                return this.state.presentState[vKey]
            }));
            console.log(presentItems);


            presentItems = presentItems.filter(d => d.isShown).length > 0 ?
                presentItems.filter(d => d.isShown)
                    .sort((a, b) => { return a.orderNum - b.orderNum })
                    .map((d, index) => {
                        index += 1;
                        const linkTo = 'present/' + d.id;
                        const usedMark = (<div className={classes.usedMark}>✓</div>);
                        const listClass = d.isOrdered ? classes.presentLinkOrdered : classes.presentLink

                        return (
                            <li key={index} className={listClass}>
                                <NavigationItem key={index} link={linkTo}>{d.title} {d.isOrdered && usedMark}</NavigationItem>
                            </li>
                        )
                    }) : <span>You currently have no unlocked presents :(</span>
        }
        return (
            <Wrap>
                <h1>OMG PRESENTS!!!</h1>
                <ul className={classes.presents}>
                    {presentItems}
                </ul>
            </Wrap>
        )

    }
}

export default withErrorHandler(presents, axios);