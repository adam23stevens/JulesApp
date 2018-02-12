import React, { Component } from 'react';
import Outfit from '../../components/Outfit/Outfit';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class OutfitBuilder extends Component {
    state = {
        outfitPartsData: {
            hats: {
                outfitParts: [
                    { type: 'Tophat', relChance: '100', colour: 'BlackLeather' },
                ],
                chance: '25',
                type: 'hat'
            },
            tops: {
                outfitParts: [
                    { type: 'Tee', relChance: '10', colour: 'Red' },
                    { type: 'Tee', relChance: '15', colour: 'Weave'},
                    { type: 'Tee', relChance: '40', colour: 'Tartan' },
                    { type: 'Shirt', relChance: '60', colour: 'DiagonalStripes' },
                    { type: 'Shirt', relChance: '100', colour: 'BlackLeather' }
                ],
                chance: '100',
                type: 'top'
            },
            bottoms: {
                outfitParts: [
                    { type: 'Chinos', relChance: '10', colour: 'Red' },
                    { type: 'Jeans', relChance: '30', colour: 'BlueDenim' },
                    { type: 'Jeans', relChance: '50', colour: 'BlackLeather' },
                    { type: 'Jeans', relChance: '90', colour: 'BlackDenim'},
                    { type: 'Chinos', relChance: '100', colour: 'BlueDenim' }
                ],
                chance: '100',
                type: 'bottom'
            },
            shoes: {
                outfitParts: [
                    { type: 'Trainers', relChance: '10', colour: 'Red'},
                    { type: 'Trainers', relChance: '50', colour: 'BlackLeather' },
                    { type: 'Boots', relChance: '100', colour: 'BlackLeather' }
                ],
                chance: '100',
                type: 'shoes'
            },
            belts: {
                outfitParts: [
                    { type: 'LeatherBelt', relChance: '100', colour: 'BlackLeather' }
                ],
                chance: '40',
                type: 'belt'
            }
        }
    }

    render() {

        return (
            this.state.outfitPartsData 
            ?  <Outfit outfitPartsData={this.state.outfitPartsData} />
            : <h3>Data could not be found</h3>
        );
    }
}

export default withErrorHandler(OutfitBuilder, axios);