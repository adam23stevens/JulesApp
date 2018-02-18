import React from 'react';
import classes from './home.css';
import Footer from '../../components/UI/Footer/footer';
import Wrap from '../../hoc/wrap/wrap';

const home = () => {
    return (
        <Wrap>
            <div className={classes.home}>
                <h1>HAPPY BIRTHDAY BUNNY!!!!!</h1>

                <span>Happy birthday my beautiful darling biscuit</span>
                <p>Yes.. this is another treasure hunt..</p>
                <p>but this time, you have an app to help you :)</p>

                <p>You best start unlocking some presents and vouchers by solving the clues.</p>
                <p>I Love you very much!!! xxxxxx</p>
                <br/>

                <p>Use the menu on the top left and we shall see how well you do :)</p>
            </div>
            <Footer>
                <span className={classes.smallText}>I am really sorry if any bugs happen :S</span>
            </Footer>
        </Wrap>

    )
}

export default home;