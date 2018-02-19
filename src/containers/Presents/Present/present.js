import React, { Component } from 'react';
import Wrap from '../../../hoc/wrap/wrap';
import classes from './present.css';
import NavigationItem from '../../../components/Navigation/NavigationItems/NavigationItem/NavigationItem';
import axios from '../../../axios-base';
import Spinner from '../../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Footer from '../../../components/UI/Footer/footer';

class present extends Component {

    state = {
        presentState: null,
        error: false
    }

    onOrderPresent(presentItem) {
        const url = 'https://jules-app.firebaseio.com/presents/' + presentItem.id + '.json';

        presentItem.isOrdered = true;
        console.log(presentItem);

        axios.put(url, presentItem)
            .then(response => {
                console.log(response);
                alert(presentItem.title + ' has been successfully ordered! :)');
            })
            .catch(error => {
                console.log(error);
            })
    }

    onOrderOrderedPresent() {
        alert('This has already been ordered you cheeky monkey poo bum');
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

            presentDisplay =
                <div className={classes.present}>
                    <p>Please confirm the following details regarding your order for this present. When you are happy, simply click the Order button</p>

                    <table className={classes.presentTable}>
                        <tbody>
                            <tr>
                                <td>
                                    <h3>{presentItem.title}</h3>
                                </td>
                                <td>
                                    <h3>
                                        £{presentItem.cost}
                                    </h3>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {
                        presentItem.isOrdered &&
                        <input className={classes.orderButtonUsed} type='button' value='Ordered' onClick={() => this.onOrderOrderedPresent()} />
                    }
                    {
                        !presentItem.isOrdered &&
                        <input className={classes.orderButton} type='button' value='Order Now!' onClick={() => this.onOrderPresent(presentItem)} />
                    }
                    {
                        presentItem.isOrdered &&
                        <span className={present.orderedText}>
                            Thank you for using Pippin Bunny Biscuit Services ltd for your birthday present needs. We hope you have a lovely birthday! :)
                            </span>
                    }
                </div>
        }

        return (
            <Wrap>
                {presentDisplay}
                <Footer>
                    <div className={classes.back}>
                        <NavigationItem link='/presents'>{backText}</NavigationItem>
                    </div>
                </Footer>
            </Wrap>
        )
    }
}


export default withErrorHandler(present, axios);