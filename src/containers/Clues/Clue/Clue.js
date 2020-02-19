import React, { Component } from 'react';
import classes from './Clue.css';
import Wrap from '../../../hoc/wrap/wrap';
import Footer from '../../../components/UI/Footer/footer';
import NavigationItem from '../../../components/Navigation/NavigationItems/NavigationItem/NavigationItem';
import axios from '../../../axios-base';
import Spinner from '../../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

class Clue extends Component {

    state = {
        clueState: null,
        error: false
    }

    onCheckAnswer = (answer, guess) => {

        const isCorrect = answer.toUpperCase() === guess.toUpperCase();

        alert(
            isCorrect
                ? 'Yay!! You got it right!! :D'
                : 'nope, that was wrong :('
        )

        if (!isCorrect) {
            this.refs.answerText.value = '';
        } else {
            //unlock stuff

            if (this.state.clueState.unlocks.riddle !== undefined) {
                let riddleUnlock = this.state.clueState.unlocks.riddle;
                console.log(riddleUnlock);
                const url = 'https://jules-app.firebaseio.com/riddles/' + riddleUnlock + '.json';

                this.unlockData(url);

                alert('New riddle available!');

            }

            if (this.state.clueState.unlocks.clue !== undefined) {
                let clueUnlock = this.state.clueState.unlocks.clue;

                alert('new clue available');
                const url = 'https://jules-app.firebaseio.com/clues/' + clueUnlock + '.json';
                this.unlockData(url);
            }

            if (this.state.actionState.unlocks.action !== undefined) {
                let actionUnlock = this.state.actionState.unlocks.action;

                const url = 'https://jules-app.firebaseio.com/actions/' + actionUnlock + '.json';
                this.unlockData(url);

                alert('NEW ACTION AVAILABLE!');
            }
            

            const updatedClue = this.state.clueState;
            updatedClue.isAnswered = true;

            const clueUrl = 'https://jules-app.firebaseio.com/clues/' + updatedClue.id + '.json';
            axios.put(clueUrl, updatedClue);
        }
    }

    unlockData(url) {
        axios.get(url)
            .then(response => {
                const updatedData = response.data;
                updatedData.isShown = true;
                console.log(updatedData);

                axios.put(url, updatedData);
            })
            .catch(error => {
                console.log(error);
            })
    }

    componentDidMount() {
        const axiosUrl = 'https://jules-app.firebaseio.com/clues/' + this.props.match.params.id + '.json';
        axios.get(axiosUrl)
            .then(response => {
                this.setState({ clueState: response.data });
            })
            .catch(error => {
                this.setState({ error: true })
            })
    }

    render() {
        const backToClueText = '<-Back to hunts';

        let clueDisplay = this.state.error ? <p>cannot load hunt</p> : <Spinner />
        if (this.state.clueState) {
            const clueItem = this.state.clueState;
            const clueDesc = 'Hunt ' + clueItem.orderNum;

            clueDisplay =
                <div className={classes.clue}>
                    <h4>{clueDesc}</h4>
                    <span>{clueItem.clueText}</span>

                    {clueItem.isAnswered &&
                        <Wrap>
                            <input className={classes.answerBoxAnswered} type='button' value={clueItem.clueAnswer} onClick={() => this.onCheckAnswer(clueItem.clueAnswer, clueItem.clueAnswer)}/>
                            <p>Done this one! :)</p>
                        </Wrap>
                    }
                    {!clueItem.isAnswered &&
                        <Wrap>
                            <input className={classes.answerBox} type='text' ref='answerText' placeholder='answer Here' />
                            <input className={classes.answerButton} type='button' value='Go' onClick={() => this.onCheckAnswer(clueItem.clueAnswer, this.refs.answerText.value)} />
                        </Wrap>
                    }
                </div>

        }

        return (
            <Wrap>
                {clueDisplay}
                <Footer>
                    <div className={classes.back}>
                        <NavigationItem link='/clues'>{backToClueText}</NavigationItem>
                    </div>
                </Footer>
            </Wrap>
        )
    }
}
export default withErrorHandler(Clue, axios);