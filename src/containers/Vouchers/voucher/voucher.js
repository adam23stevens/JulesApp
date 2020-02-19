import React, { Component } from 'react';
import classes from './voucher.css';
import Wrap from '../../../hoc/wrap/wrap';
import Footer from '../../../components/UI/Footer/footer';
import NavigationItem from '../../../components/Navigation/NavigationItems/NavigationItem/NavigationItem';
import axios from '../../../axios-base';
import Spinner from '../../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

class Voucher extends Component {

    state = {
        voucherState: null,
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

            if (this.state.voucherState.unlocks.voucher != undefined) {
                let voucherUnlock = this.state.voucherState.unlocks.voucher;
                
                const url = 'https://jules-app.firebaseio.com/vouchers/' + voucherUnlock + '.json';

                this.unlockData(url);

                alert('New Riddle available!');

            }

            if (this.state.voucherState.unlocks.clue != undefined) {
                let clueUnlock = this.state.voucherState.unlocks.clue;

                alert('New hunt available!');
                const url = 'https://jules-app.firebaseio.com/clues/' + clueUnlock + '.json';
                this.unlockData(url);
            }

            if (this.state.voucherState.unlocks.action != undefined) {
                let actionUnlock = this.state.voucherState.unlocks.action;                

                const url = 'https://jules-app.firebaseio.com/actions/' + actionUnlock + '.json';
                this.unlockData(url);

                alert('New Action Available!');
            }

            const updatedVoucher = this.state.voucherState;
            updatedVoucher.isAnswered = true;

            const voucherUrl = 'https://jules-app.firebaseio.com/vouchers/' + updatedVoucher.id + '.json';
            axios.put(voucherUrl, updatedVoucher);
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
        const axiosUrl = 'https://jules-app.firebaseio.com/vouchers/' + this.props.match.params.id + '.json';
        axios.get(axiosUrl)
            .then(response => {
                this.setState({ voucherState: response.data });
            })
            .catch(error => {
                this.setState({ error: true })
            })
    }

    render() {
        const backText = '<-Back to Riddles';

        let display = this.state.error ? <p>cannot load Riddle</p> : <Spinner />
        if (this.state.voucherState) {
            const item = this.state.voucherState;
            const desc = 'Riddle ' + item.orderNum;

            display =
                <div className={classes.voucher}>
                    <h4>{desc}</h4>
                    <span>{item.voucherText}</span>

                    {voucher.isAnswered &&
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