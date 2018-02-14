import React, { Component } from 'react';
import classes from './clues.css';
import data from './data';
import Clue from './Clue/Clue';
import NavigationItem from '../../components/Navigation/NavigationItems/NavigationItem/NavigationItem';


class Clues extends Component {

    render() {
        const allClues = data.filter(d => d.clue.isShown).map((d, index) => {
            index += 1;
            const linkTo = '/clue/' + d.clue.id;
            const clueName = 'Clue: ' + index;
            return (
            <li className='clueItem'>
                <NavigationItem link={linkTo}>{clueName}</NavigationItem>
            </li>
            )
        })

        return (
            <div className='clues'>
                <h1>Clues so far</h1>
                <ul className='clueList'>
                    {allClues}
                </ul>
            </div>
        )
    }
}

export default Clues;