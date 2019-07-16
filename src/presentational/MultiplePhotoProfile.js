import React, { Component } from 'react';
import injectSheet from 'react-jss';

import addPicture from '../images/photos_selected/Profile-Page/add-picture.png';

class MultiplePhotoProfile extends Component {
  handleUpdatePicture = e => {
    const reader = new FileReader();
    const file = e.target.files[0];

    // if (numberPicture >= 5)
    // 	return alert('You already have uploaded 5 images, you can\'t load more');

    reader.onload = upload => {
      const image = new Image();

      image.onload = () => {
        if (image.width < 360 || image.height < 400)
          return alert(
            'Image too small.\nRespect résolution 360 x 400 minimum',
          );

        // dispatch(uploadPictureAction(
        // 	upload.target.result,
        // 	userInfoProfile.email,
        // ));
      };
      image.src = upload.target.result;
    };
    reader.readAsDataURL(file);
  };

  render() {
    const { classes, mainPicture, otherPictures = [] } = this.props;
    const arrOthersPictures = [];

    for (let index = 0; index < 4; index++) {
      const element =
        otherPictures[index] == null ? addPicture : otherPictures[index];

      arrOthersPictures.push(element);
    }

    return (
      <div className={classes.containerMultiplePhoto}>
        <div className={classes.secondaryPhoto}>
          {arrOthersPictures.map((picture, index) => (
            <div key={index} style={{ backgroundImage: `url(${picture})` }}>
              <input
                type="file"
                id="input-image"
                accept="image/*"
                className={classes.inputUploadFile}
                onChange={this.handleUpdatePicture}
              />
            </div>
          ))}
        </div>
        <div
          className={`${mainPicture == null ? classes.mainIcon : ''} ${
            classes.mainPhoto
          }`}
          style={{
            backgroundImage: `url(${
              mainPicture == null ? addPicture : mainPicture
            })`,
          }}
        >
          {mainPicture == null && (
            <input
              type="file"
              id="input-image"
              accept="image/*"
              className={classes.inputUploadFile}
              onChange={this.handleUpdatePicture}
            />
          )}
        </div>
      </div>
    );
  }
}

const styles = {
  containerMultiplePhoto: {
    width: '100%',
    height: '200px',
    display: 'flex',
  },
  inputUploadFile: {
    height: '100%',
    maxWidth: '100%',
    opacity: '0',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  mainIcon: {
    backgroundSize: '50%!important',
  },
  mainPhoto: {
    height: '200px',
    width: '200px',
    boxShadow: '5px 5px 30px 5px lightgrey',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    padding: '5px',
  },
  secondaryPhoto: {
    display: 'flex',
    flexWrap: 'wrap',
    width: 'calc(100% - 200px)',
    '& > div': {
      height: '90px',
      width: '90px',
      margin: '5px 10px',
      backgroundPosition: 'center',
      backgroundSize: '50%',
      backgroundRepeat: 'no-repeat',
      boxShadow: '5px 5px 30px 5px lightgrey',
    },
  },
};

export default injectSheet(styles)(MultiplePhotoProfile);
