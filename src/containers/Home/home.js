import React from 'react';
import classes from './home.css';
import Footer from '../../components/UI/Footer/footer';
import Wrap from '../../hoc/wrap/wrap';
import banner from '../../assets/images/gatsby-banner.jpg';

const home = () => {
    return (
        <Wrap>
            <div className={classes.home}>

                <img className={classes.bannerLogo} src={banner} alt='banner'/>

                <div className={classes.homeText}>
                    <h1>HAPPY 30th BIRTHDAY BUNNY!!!!!</h1>

                    <span>Did you think you weren't getting a treasure hunt?</span>
                    <p>Of course you're getting a treasure hunt. Silly monkey.</p>

                    <p>You know what to do! Go start solving stuff. I'll be around to help. Maybe</p>
                    <p>I Love you very much!!! xxxxxx</p>
                    <br/>
                </div>
                
            </div>
            <Footer>
               
            </Footer>
        </Wrap>

    )
}

export default home;