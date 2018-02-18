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
                ? 'you got it right'
                : 'nope, that was wrong'
        )

        if (!isCorrect) {
            this.refs.answerText.value = '';
        } else {
            //unlock stuff

            if (this.state.clueState.unlocks.voucher != undefined) {
                let voucherUnlock = this.state.clueState.unlocks.voucher;
                console.log(voucherUnlock);
                const url = 'https://jules-app.firebaseio.com/vouchers/' + voucherUnlock + '.json';

                this.unlockData(url);

                alert('NEW VOUCHER AVAILABLE!');

            }

            if (this.state.clueState.unlocks.clue != undefined) {
                let clueUnlock = this.state.clueState.unlocks.clue;
                console.log(clueUnlock);

                const url = 'https://jules-app.firebaseio.com/clues/' + clueUnlock + '.json';
                this.unlockData(url);
            }

            if (this.state.clueState.unlocks.present != undefined) {
                let presentUnlock = this.state.clueState.unlocks.present;
                console.log(presentUnlock);

                const url = 'https://jules-app.firebaseio.com/presents/' + presentUnlock + '.json';
                this.unlockData(url);

                alert('NEW PRESENT AVAILABLE!');
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
        const backToClueText = '<-Back to clues';

        let clueDisplay = this.state.error ? <p>cannot load clue</p> : <Spinner />
        if (this.state.clueState) {
            const clueItem = this.state.clueState;
            const clueDesc = 'Clue ' + clueItem.orderNum;

            clueDisplay =
                <div className={classes.clue}>
                    <h4>{clueDesc}</h4>
                    <span>{clueItem.clueText}</span>

                    {clueItem.isAnswered &&
                        <Wrap>
                            <input className={classes.answerBox} type='text' value={clueItem.clueAnswer} disabled />
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