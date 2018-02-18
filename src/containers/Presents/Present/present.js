import React, { Component } from 'react';
import Wrap from '../../../hoc/wrap/wrap';
import classes from './present.css';
import NavigationItem from '../../../components/Navigation/NavigationItems/NavigationItem/NavigationItem';
import axios from '../../../axios-base';
import Spinner from '../../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

class present extends Component {

    state = {
        presentState: null,
        error: false
    }

    componentDidMount() {
        console.log(this.props.match.params.id);
        const axiosUrl = 'https://jules-app.firebaseio.com/presents/' + this.props.match.params.id + '.json';
        axios.get(axiosUrl)
            .then(response => {
                console.log(axiosUrl);
                this.setState({ presentState: response.data });
                console.log(response.data);
            })
            .catch(error => {
                this.setState({ error: true })
            })
    }

    render() {
        const backText = '<-Back to presents';

        let presentDisplay = this.state.error ? <p>cannot load present</p> : <Spinner />
        if (this.state.presentState) {
            const presentItem = this.state.presentState;

            presentDisplay = (
                <div className={classes.voucher}>
                    <h3>{presentItem.title}</h3>
                    <span>{presentItem.presentText}</span>
                </div>
            )
        }

        return (
            <Wrap>
                {presentDisplay}
                <div className={classes.back}>
                    <NavigationItem link='/presents'>{backText}</NavigationItem>
                </div>
            </Wrap>
        )
    }
}


export default withErrorHandler(present, axios);