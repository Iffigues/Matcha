// @flow

import React, { Component } from 'react';
import injectSheet from 'react-jss';
import axios from 'axios';

import ButtonForm from '../components/ButtonForm';
import InputForm from '../components/InputForm';

type Props = {
  classes: Object,
  onClick: Function,
};

type State = {
  disabled: boolean,
  value: string,
};

const API_KEY = 'AIzaSyDfMEOIYCjr5sC1IBCg6RNc5E7Jg1Iw9yM';

class LocationRegister extends Component<Props, State> {
  state = {
    disabled: true,
    value: '',
  };

  locationAccepted(location) {
    if (location.data.status === 'OK') {
      this.setState({
        value: location.data.results[2].formatted_address,
        disabled: false,
      });
    }
  }

  	update = (e) => {
				let r = e.target.name;
				this.props.onUpdate(r, e.target.value);
				this.setState({sval:e.target.value});
			};
  async locationDenied(getLocation) {
    const { latitude, longitude } = getLocation.data.location;
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`,
    );

    this.locationAccepted(response)
    .then(console.log('la réponse est la suivante =>' + response + '<==')).then(
    console.log('le navigator.geolocation =>' + navigator.geolocation));
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async position => {
          const { latitude, longitude } = position.coords;
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`,
          );

          this.locationAccepted(response);
        },
        async error => {
          const response = await axios.post(
            `https://www.googleapis.com/geolocation/v1/geolocate?key=${API_KEY}`,
          );

          this.locationDenied(response);
        },
      );
    }
  }

  render() {
    const { classes, onClick } = this.props;
    const { disabled, value } = this.state;
    const backgroundColor = disabled ? 'lightGray' : 'white';

    return (
      <div className={classes.container}>
        <div className={classes.inputLocation}>
          <InputForm
            type="text"
            disabled={disabled}
	   onChange={this.update} 
            style={{
              backgroundColor,
              width: '300px',
            }}
            value={value}
          />
        </div>
        <ButtonForm text="REGISTER" onClick={onClick} />
      </div>
    );
  }
}

const styles = {
  container: {
    width: '450px',
    height: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingBottom: '30px',
    marginBottom: '15px',
  },
  inputLocation: {
    display: 'flex',
    marginBottom: '30px',
  },
};

export default injectSheet(styles)(LocationRegister);
