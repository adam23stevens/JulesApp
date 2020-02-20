import React, { Component } from 'react';
import classes from './Action.css';
import Wrap from '../../../hoc/wrap/wrap';
import Footer from '../../../components/UI/Footer/footer';
import NavigationItem from '../../../components/Navigation/NavigationItems/NavigationItem/NavigationItem';
import axios from '../../../axios-base';
import Spinner from '../../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

class Action extends Component {

    state = {
        actionState: null,
        error: false
    }

    onCheckAnswer = (answer, guess) => {

        const isCorrect = answer.toUpperCase() === guess.toUpperCase();

        alert(
            isCorrect
                ? 'Well done!'
                : 'nope, that was wrong :('
        )

        if (!isCorrect) {
            this.refs.answerText.value = '';
        } else {
            //unlock stuff

            if (this.state.actionState.unlocks.riddle !== undefined) {
                let riddleUnlock = this.state.actionState.unlocks.riddle;
                
                const url = 'https://jules-app.firebaseio.com/riddles/' + riddleUnlock + '.json';

                this.unlockData(url);

                alert('New riddle available!');

            }

            if (this.state.actionState.unlocks.clue !== undefined) {
                let clueUnlock = this.state.actionState.unlocks.clue;
                const url = 'https://jules-app.firebaseio.com/clues/' + clueUnlock + '.json';
                this.unlockData(url);

                alert('New clue available');
            }           

            if (this.state.actionState.unlocks.action !== undefined) {
                let actionUnlock = this.state.actionState.unlocks.action;

                const url = 'https://jules-app.firebaseio.com/actions/' + actionUnlock + '.json';
                this.unlockData(url);

                alert('New action available!');
            }

            const updatedAction = this.state.actionState;
            updatedAction.isAnswered = true;

            const actionUrl = 'https://jules-app.firebaseio.com/actions/' + updatedAction.id + '.json';
            axios.put(actionUrl, updatedAction);
        }
    }

    unlockData(url) {
        axios.get(url)
            .then(response => {
                const updatedData = response.data;
                updatedData.isShown = true;
                axios.put(url, updatedData);
            })
            .catch(error => {
                console.log(error);
            })
    }

    componentDidMount() {
        const axiosUrl = 'https://jules-app.firebaseio.com/actions/' + this.props.match.params.id + '.json';
        axios.get(axiosUrl)
            .then(response => {
                this.setState({ actionState: response.data });
            })
            .catch(error => {
                this.setState({ error: true })
            })
    }

    render() {
        const backToActionText = 'Back';

        let actionDisplay = this.state.error ? <p>cannot load action</p> : <Spinner />
        if (this.state.actionState) {
            const actionItem = this.state.actionState;
            const actionDesc = 'Action ' + actionItem.orderNum;

            actionDisplay =
                <div className={classes.action}>
                    <h4>{actionDesc}</h4>
                    <span>{actionItem.actionText}</span>

                    {actionItem.isAnswered &&
                        <Wrap>
                            <p>Done this one! :)</p>
                        </Wrap>
                    }
                    {!actionItem.isAnswered &&
                        <Wrap>
                            <input className={classes.answerBox} type='text' ref='answerText' placeholder='answer Here' />
                            <input className={classes.answerButton} type='button' value='Go' onClick={() => this.onCheckAnswer(actionItem.actionAnswer, this.refs.answerText.value)} />
                        </Wrap>
                    }
                </div>

        }

        return (
            <Wrap>
                {actionDisplay}
                <Footer>
                    <div className={classes.back}>
                        <NavigationItem link='/actions'>{backToActionText}</NavigationItem>
                    </div>
                </Footer>
            </Wrap>
        )
    }
}
export default withErrorHandler(Action, axios);