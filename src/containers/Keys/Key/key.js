import React, { Component } from 'react';
import classes from './key.css';
import Wrap from '../../../hoc/wrap/wrap';
import Footer from '../../../components/UI/Footer/footer';
import NavigationItem from '../../../components/Navigation/NavigationItems/NavigationItem/NavigationItem';
import axios from '../../../axios-base';
import Spinner from '../../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

class Key extends Component {

    state = {
        keyState: null,
        error: false
    }

    componentDidMount() {
        const axiosUrl = 'https://jules-app.firebaseio.com/keys/' + this.props.match.params.id + '.json';
        axios.get(axiosUrl)
            .then(response => {
              
                this.setState({ keyState: response.data });
            })
            .catch(error => {
                this.setState({ error: true })
            })
    }

    render() {
        const backTokeyText = 'Back';

        let keyDisplay = this.state.error ? <p>cannot load key</p> : <Spinner />
        if (this.state.keyState) {
            const keyItem = this.state.keyState;
            
            keyDisplay =
                <div className={classes.key}>
                    <h4>{keyItem.title}</h4>
                    <span>{keyItem.keyText}</span>
                </div>

        }

        return (
            <Wrap>
                {keyDisplay}
                <Footer>
                    <div className={classes.back}>
                        <NavigationItem link='/keys'>{backTokeyText}</NavigationItem>
                    </div>
                </Footer>
            </Wrap>
        )
    }
}
export default withErrorHandler(Key, axios);