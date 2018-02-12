import React, { Component } from 'react';
import OutfitPartBuilder from './OutfitPartBuilder/OutfitPartBuilder';
import classes from './Outfit.css';
import Wrap from '../../hoc/wrap/wrap';

class Outfit extends Component {

    onOutfitAccept = (outfitParts) => {
        alert('accepted parts: ');
        outfitParts.map(o => {
            return alert(o.type + ' ' + o.colour);
        });
    }

    onOutfitReject = () => {
        alert('rejected');
    }

    render() {

        let outfitParts = [];
        //loop through each outfit section
        //calculate chance to render based on parent chance passing Math.Random()
        //if passes
        //loop through all child objects
        //calculate chance to render based on relChance individually passing Math.Random()
        //(this makes it less relative but whatever...)
        //if passes, that's the outfitPart to pass down to outfitPartBuilder
        //continue to loop over and over until one of them passes the chance test

        //how many times to call Math.random() ? 

        //tops
        const parentChance = Math.random() * 100;

        if (parentChance <= this.props.outfitPartsData.hats.chance) {
            const childChance = Math.random() * 100;
            const topsArray = Object.keys(this.props.outfitPartsData.hats.outfitParts).map(igKey => {
                return this.props.outfitPartsData.hats.outfitParts[igKey]
            });
            for (let cnt = 0; cnt < topsArray.length; cnt++) {
                if (childChance <= topsArray[cnt].relChance) {
                    outfitParts.push(topsArray[cnt]);
                    break;
                }
            }
        }
        if (parentChance <= this.props.outfitPartsData.tops.chance) {
            const childChance = Math.random() * 100;
            const topsArray = Object.keys(this.props.outfitPartsData.tops.outfitParts).map(igKey => {
                return this.props.outfitPartsData.tops.outfitParts[igKey]
            });
            for (let cnt = 0; cnt < topsArray.length; cnt++) {
                if (childChance <= topsArray[cnt].relChance) {
                    outfitParts.push(topsArray[cnt]);
                    break;
                }
            }
        }
        if (parentChance <= this.props.outfitPartsData.belts.chance) {
            const childChance = Math.random() * 100;
            const topsArray = Object.keys(this.props.outfitPartsData.belts.outfitParts).map(igKey => {
                return this.props.outfitPartsData.belts.outfitParts[igKey]
            });
            for (let cnt = 0; cnt < topsArray.length; cnt++) {
                if (childChance <= topsArray[cnt].relChance) {
                    outfitParts.push(topsArray[cnt]);
                    break;
                }
            }
        }
        if (parentChance <= this.props.outfitPartsData.bottoms.chance) {
            const childChance = Math.random() * 100;
            const topsArray = Object.keys(this.props.outfitPartsData.bottoms.outfitParts).map(igKey => {
                return this.props.outfitPartsData.bottoms.outfitParts[igKey]
            })
            for (let cnt = 0; cnt < topsArray.length; cnt++) {
                if (childChance <= topsArray[cnt].relChance) {
                    outfitParts.push(topsArray[cnt]);
                    break;
                }
            }
        }
        if (parentChance <= this.props.outfitPartsData.shoes.chance) {
            const childChance = Math.random() * 100;
            const topsArray = Object.keys(this.props.outfitPartsData.shoes.outfitParts).map(igKey => {
                return this.props.outfitPartsData.shoes.outfitParts[igKey]
            })
            for (let cnt = 0; cnt < topsArray.length; cnt++) {
                if (childChance <= topsArray[cnt].relChance) {
                    outfitParts.push(topsArray[cnt]);
                    break;
                }
            }
        }

        return (
            <Wrap>
                <div className={classes.Outfit}>
                    {outfitParts.map(part => <OutfitPartBuilder key={part.type} type={part.type} colour={part.colour} />)}
                </div>
                <div className={classes.acceptRejectButtons}>
                <button className={classes.outfitAcceptBtn} onClick={() => this.onOutfitAccept(outfitParts)}>ACCEPT</button>
                <button className={classes.outfitRejectBtn} onClick={this.onOutfitReject}>reject</button>
                </div>
            </Wrap>
        )
    }
}


export default Outfit;