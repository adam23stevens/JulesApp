import React, { Component } from 'react';
import classes from './clues.css';
import data from './data';
import Clue from './Clue/Clue';
import NavigationItem from '../../components/Navigation/NavigationItems/NavigationItem/NavigationItem';
import axios from '../../axios-base';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


class Clues extends Component {

    state = {
        cluesState: null,
        error: false
    }

    componentDidMount() {
        axios.get('https://jules-app.firebaseio.com/clues.json')
            .then(response => {
                this.setState({cluesState: response.data});
            })
            .catch(error => {
                this.setState({error: true})
            })
    }

    render() {
        let allClues = this.state.error ? <p>clues can''t be loaded</p> : <Spinner/>
        if (this.state.cluesState) {
        allClues = (Object.keys(this.state.cluesState).map(clueKey => {
            return this.state.cluesState[clueKey]
        }));
        console.log(allClues);

        allClues = allClues.filter(d => d.isShown).map((d, index) => {
            index += 1;
            const linkTo = '/clue/' + d.id;
            const clueName = d.id;
            return (
            <li key={index} className='clueItem'>
                <NavigationItem link={linkTo}>{clueName}</NavigationItem>
            </li>
            )
        })
    }

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

export default withErrorHandler(Clues, axios);
