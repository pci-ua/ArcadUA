import { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

import SokobanService from '../services/SokobanService.js';

class ScanView extends Component {

	scanned( qr ) {
		const BDE = SokobanService.isThisAValidCode( qr.data );
		if( BDE != null ) {
			this.props.navigation.navigate('game');
		}
	}
  
	render() {
		return <View>
			<QRCodeScanner
				onRead={this.scanned}
			/>
		</View>;
	}
}

const styles = StyleSheet.create({
	centerText: {
	  flex: 1,
	  fontSize: 18,
	  padding: 32,
	  color: '#777'
	},
	textBold: {
	  fontWeight: '500',
	  color: '#000'
	},
	buttonText: {
	  fontSize: 21,
	  color: 'rgb(0,122,255)'
	},
	buttonTouchable: {
	  padding: 16
	}
  });
export default ScanView;