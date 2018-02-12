import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import OutfitPartBuilder from '../../components/Outfit/OutfitPartBuilder/OutfitPartBuilder';
import classes from './AddOutfitPart.css';

const allAvailableItems = [
    {type: 'hat', outfitPart: 'Tophat'},
    {type: 'top', outfitPart: 'Tee'},
    {type: 'top', outfitPart: 'Shirt'},
    {type: 'belt', outfitPart: 'LeatherBelt'},
    {type: 'bottom', outfitPart: 'Jeans'},
    {type: 'bottom', outfitPart: 'Chinos'},
    {type: 'shoes', outfitPart: 'Trainers'},
    {type: 'shoes', outfitPart: 'Boots'}
]
const allAvailableColours = [
    'Default',
    'Green',
    'Red',
    'Blue',
    'Navy',
    'Grey',
    'BlackLeather',
    'Tartan',
    'Weave',
    'DiagonalStripes',
    'BlueDenim',
    'BlackDenim'
]

class AddOutfitPart extends Component {

    state = {
        displayIndex: 0,
        colourIndex: 0
    }

    prevColour = (prevState) => {
        const prevIndex = (this.state.colourIndex -1 < 0) 
                        ? allAvailableColours.length -1
                        : this.state.colourIndex -1;

        this.setState({
            colourIndex: prevIndex
        });
    }

    nextColour = (prevState) => {
        const nextIndex = (this.state.colourIndex + 1 >= allAvailableColours.length)
                        ? 0
                        : this.state.colourIndex + 1;
                
        this.setState({
            colourIndex: nextIndex
        });
    }

    prevSelItem = (prevState) => {
        const prevIndex = (this.state.displayIndex - 1 < 0) 
                        ? allAvailableItems.length -1
                        : this.state.displayIndex - 1;

        this.setState({
            displayIndex: prevIndex
        });
    }

    nextSelItem = (prevState) => {
        //TODO Why is prevState.displayIndex undefined?
        const nextIndex = (this.state.displayIndex + 1 >= allAvailableItems.length)
                        ? 0
                        : this.state.displayIndex + 1; 

        this.setState({
            displayIndex: nextIndex
        });
    }

    continueAdding = (outfitPart) => {
        const newOutfitPart = {
            type: outfitPart.outfitPart,
            relChance: '100',
            colour: outfitPart.colour
        };
    
        alert('New outfit part added: ' + newOutfitPart.colour + ' ' +  newOutfitPart.type);

        //do an axios put here
    }
    
    render() {
        const selOutfitPart = allAvailableItems[this.state.displayIndex];
        const selColour = allAvailableColours[this.state.colourIndex];

        return (
            <div className={classes.addOutfitPart}>
                <h3>Add new outfit part</h3>
                <p><i>{selOutfitPart.outfitPart}</i></p>
                <div className={classes.outfitPartPickerWrap}>
                    <button className={[classes.prev, classes.buttonLeft].join(' ')} onClick={this.prevSelItem}/>
                    <button className={[classes.prevColour, classes.buttonLeft].join(' ')} onClick={this.prevColour}/>
                    <div className={classes.outfitPartPicker}>
                    <OutfitPartBuilder 
                        colour={selColour} 
                        type={selOutfitPart.outfitPart} 
                        style={{zIndex: '100'}}
                        display='add'/>
                    </div>
                    <button className={[classes.next, classes.buttonRight].join(' ')} onClick={this.nextSelItem}/>
                    <button className={[classes.nextColour, classes.buttonRight].join(' ')} onClick={this.nextColour}/>
                </div>
                <Button 
                    clicked={() => this.continueAdding({type: selOutfitPart.type, outfitPart: selOutfitPart.outfitPart, colour: selColour})} 
                    btnType='Success'>Add</Button>
            </div>
        )
    }
}

export default AddOutfitPart;