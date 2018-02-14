import React, { Component } from 'react';
import classes from './Clue.css';
import data from '../data';
import Wrap from '../../../hoc/wrap/wrap';
import NavigationItem from '../../../components/Navigation/NavigationItems/NavigationItem/NavigationItem';

class Clue extends Component {

    onCheckAnswer = (answer, guess) => {
        
        alert(
            answer === guess
                ? 'you got it right'
                : 'nope, that was wrong'
        )

        if (answer !== guess) {
            this.refs.answerText.value = '';
        }

        //set isAnswered to true here
        //Mark any vouchers or presents as unlocked here
        //Mark the next clue as unlocked
    }

    render() {
        const id = this.props.match.params.id;
        const thisData = data.filter(d => d.clue.id === id);
        const thisClue = thisData[0].clue;
        const backToClueText = '<-Back to clues';

        const clueDesc = 'Clue ' + thisClue.clueNum;
        return (
            <Wrap>
            <div className={classes.clue}>
                <h4>{clueDesc}</h4>
                <span>{thisClue.clueText}</span>
                <input className={classes.answerBox} type='text' ref='answerText' placeholder='answer Here'/>
                <input className={classes.answerButton} type='button' value='Go' onClick={() => this.onCheckAnswer(thisClue.answer, this.refs.answerText.value)} />
            </div>
            <div className={classes.back}>
                <NavigationItem link='/clues'>{backToClueText}</NavigationItem>
            </div>
            </Wrap>
        )
    }
}
export default Clue;