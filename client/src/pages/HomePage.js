/* @flow */

import * as React from 'react';
import injectSheet from 'react-jss';
import ButtonGradient from '../components/ButtonGradient';

import couple_img from '../images/photos_selected/Home-Page/photo-index.jpg';
import match_img from '../images/photos_selected/Home-Page/match-msg.jpg';

type Props = {
  classes: Object,
  history: Object,
};

class HomePage extends React.Component<Props> {
  render() {
    const { classes, history } = this.props;

    return (
      <div className={classes.container}>
        <div className={classes.leftContainer}>
          <div className={classes.textLeftContainer}>
            “The best online dating site to find love!” - The New York Times
          </div>
          <div className={classes.imgLeftContainer} />
        </div>
        <div className={classes.rightContainer}>
          <div className={classes.imgRightContainer}>
            <img src={match_img} alt="" />
          </div>
          <div className={classes.registerButtonWrapper}>
            <ButtonGradient
              text="REGISTER ONLINE"
              onClick={() => history.push('/register')}
            />
          </div>
          <div className={classes.msgRegister}>
            By subscribing to our website you are agreeing to the Terms and
            Conditions.
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  '@global': {
    img: {
      height: '100%',
    },
  },
  container: {
    display: 'flex',
    height: 'calc(100vh - 161px)',
  },
  imgRightContainer: {
    width: '100%',
    '& > img': {
      width: '100%',
    },
  },
  imgLeftContainer: {
    backgroundImage: `url(${couple_img})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '100%',
  },
  msgRegister: {
    display: 'flex',
    width: '266px',
    fontSize: '12px',
    color: 'lightGrey',
    fontFamily: 'MS Serif, New York, sans-serif',
    paddingTop: '50px',
  },
  leftContainer: {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '60%',
    overflow: 'hidden',
    height: '100%',
    '& > img': {
      width: '100%',
      height: '100%',
    },
  },
  rightContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
    '& > ButtonGradient': {
      width: '100px',
    },
  },
  registerButtonWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  textLeftContainer: {
    fontSize: '30px',
    padding: '20px 0',
  },
};

export default injectSheet(styles)(HomePage);
