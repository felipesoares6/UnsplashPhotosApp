import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ListView,
  Image
} from 'react-native';
import { getPhotos, getPhotosLinks } from './utils/unsplashPhotoHelpers';

const MK = require('react-native-material-kit');

const {
  MKButton,
  MKTextField,
  MKSpinner
} = MK;

const AccentColoredRaisedButton = MKButton.coloredButton()
  .withText('Search')
  .build();

const Textfield = MKTextField.textfield()
  .withPlaceholder('Search for a cool photo...')
  .build();

const SingleColorSpinner = MKSpinner.singleColorSpinner()
  .build();

export default class UnsplashPhotosApp extends Component {
  constructor (props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

    this.state = {
      query: '',
      photos: [],
      dataSource: ds.cloneWithRows([])
    }

    this.handleSearch = this.handleSearch.bind(this);
  }

  setSource (photos, otherState = {}) {
    this.setState({
      photos,
      dataSource: this.state.dataSource.cloneWithRows(photos),
      ...otherState
    })
  }

  handleSearch () {
    const photos = getPhotos(this.state.query);
    photos.then((response) => {
      const photosLinks = getPhotosLinks(response);

      this.setState({ photos: photosLinks })
      this.setSource(photosLinks)
    });
  }

  render() {
    return (
      <View style={styles.container}>

          <View>
            <Text style={styles.welcome}>
              Welcome to Unsplash Photo App!
            </Text>
          </View>

          <View style={{marginTop: 30}}>
            <Textfield
              style={styles.textField}
              onChangeText={ (query) => this.setState({query}) }/>
          </View>

          <View style={{marginTop: 30}}>
            <AccentColoredRaisedButton onPress={this.handleSearch}/>
          </View>

          <View style={{marginTop: 30, maxHeight: 200}}>
            <ListView
              enableEmptySections
              dataSource={this.state.dataSource}
              renderRow={(url) => {
                return (
                  <View style={{marginTop: 30}}>
                    <Image  style={{width: 300, height: 300}} source={{ uri: url }} />
                  </View>
                )
              }} />
          </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 0
  },
  textField: {
    width: 200
  }
});

AppRegistry.registerComponent('UnsplashPhotosApp', () => UnsplashPhotosApp);
