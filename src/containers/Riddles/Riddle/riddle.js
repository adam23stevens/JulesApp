import React, { Component } from 'react';
import classes from './riddle.css';
import Wrap from '../../../hoc/wrap/wrap';
import Footer from '../../../components/UI/Footer/footer';
import NavigationItem from '../../../components/Navigation/NavigationItems/NavigationItem/NavigationItem';
import axios from '../../../axios-base';
import Spinner from '../../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

class Riddle extends Component {

    state = {
        riddleState: null,
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

            if (this.state.riddleState.unlocks.riddle !== undefined) {
                let riddleUnlock = this.state.riddleState.unlocks.riddle;
                console.log(riddleUnlock);
                const url = 'https://jules-app.firebaseio.com/riddles/' + riddleUnlock + '.json';

                this.unlockData(url);

                alert('New riddle available!');

            }

            if (this.state.riddleState.unlocks.clue !== undefined) {
                let clueUnlock = this.state.riddleState.unlocks.clue;

                alert('new clue available');
                const url = 'https://jules-app.firebaseio.com/clues/' + clueUnlock + '.json';
                this.unlockData(url);
            }

            if (this.state.riddleState.unlocks.action !== undefined) {
                let actionUnlock = this.state.riddleState.unlocks.action;

                const url = 'https://jules-app.firebaseio.com/actions/' + actionUnlock + '.json';
                this.unlockData(url);

                alert('New action available');
            }
            

            const updatedriddle = this.state.riddleState;
            updatedriddle.isAnswered = true;

            const riddleUrl = 'https://jules-app.firebaseio.com/riddles/' + updatedriddle.id + '.json';
            axios.put(riddleUrl, updatedriddle);
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
        const axiosUrl = 'https://jules-app.firebaseio.com/riddles/' + this.props.match.params.id + '.json';
        axios.get(axiosUrl)
            .then(response => {
                this.setState({ riddleState: response.data });
            })
            .catch(error => {
                this.setState({ error: true })
            })
    }

    render() {
        const backToriddleText = '<-Back to Riddles';

        let riddleDisplay = this.state.error ? <p>cannot load riddle</p> : <Spinner />
        if (this.state.riddleState) {
            const riddleItem = this.state.riddleState;
            
            riddleDisplay =
                <div className={classes.riddle}>
                    <h4>{riddleItem.title}</h4>
                    <span>{riddleItem.riddleText}</span>

                    {riddleItem.isAnswered &&
                        <Wrap>
                            <input className={classes.answerBoxAnswered} type='button' value={riddleItem.riddleAnswer} onClick={() => this.onCheckAnswer(riddleItem.riddleAnswer, riddleItem.riddleAnswer)}/>
                            <p>Done this one! :)</p>
                        </Wrap>
                    }
                    {!riddleItem.isAnswered &&
                        <Wrap>
                            <input className={classes.answerBox} type='text' ref='answerText' placeholder='answer Here' />
                            <input className={classes.answerButton} type='button' value='Go' onClick={() => this.onCheckAnswer(riddleItem.riddleAnswer, this.refs.answerText.value)} />
                        </Wrap>
                    }
                </div>

        }

        return (
            <Wrap>
                {riddleDisplay}
                <Footer>
                    <div className={classes.back}>
                        <NavigationItem link='/riddles'>{backToriddleText}</NavigationItem>
                    </div>
                </Footer>
            </Wrap>
        )
    }
}
export default withErrorHandler(Riddle, axios);