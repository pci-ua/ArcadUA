import { Component } from 'react';
import { StyleSheet, Text, View, Button, PermissionsAndroid } from 'react-native';

import SokobanService from '../services/SokobanService.js';

class GameView extends Component {

	render() {
		return (
			<View>
			</View>
		);
	}

}
  
const styles = StyleSheet.create({
	app: {
		flex: 1,
		backgroundColor: '#000',
		paddingTop: 80,
		
	},
});

export default GameView;