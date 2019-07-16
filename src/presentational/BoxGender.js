import React, { Component } from 'react';
import injectSheet from 'react-jss';

import femaleIcon from '../images/photos_selected/Profile-Page/female-icon.png';
import maleIcon from '../images/photos_selected/Profile-Page/male-icon.png';

class BoxGender extends Component {
  render() {
    const { classes, title, gender } = this.props;
    const iconGender = gender === 'male' ? maleIcon : femaleIcon;

    return (
      <div className={classes.container}>
        <div className={classes.title}>{title}</div>
        <div
          className={classes.containerIcon}
          style={{
            backgroundImage: `url(${iconGender})`,
          }}
        />
      </div>
    );
  }
}

const styles = {
  container: {
    fontFamily: 'sans-serif',
    position: 'relative',
    border: '1px solid rgb(230, 230, 230)',
    borderRadius: '15px',
    width: '275px',
    height: '150px',
    padding: '20px',
    marginBottom: '30px',
  },
  containerIcon: {
    height: '100%',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  title: {
    position: 'absolute',
    top: '-10px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'white',
    padding: '0 10px',
    '& > span': {
      display: 'flex',
      alignItems: 'center',
    },
    '& > span > img': {
      width: '30px',
      marginRight: '5px',
    },
  },
};

BoxGender.defaultProps = {
  title: <span>I AM</span>,
  gender: 'male',
};

export default injectSheet(styles)(BoxGender);
