import { Component } from 'react';
import { Text, View } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import SokobanService from '../services/SokobanService.js';
import GameView from './GameView.js';

class ScanView extends Component {

	scanned( qr ) {
		const BDE = SokobanService.isThisAValidCode( qr.data );
		if( BDE != null ) {
			GameView.map = BDE;
			this.props.navigation.navigate('game');
		}
	}
  
	render() {
		return ( 
			<QRCodeScanner
				onRead={this.scanned.bind(this)} cameraStyle={{  height: 300 }}

				topContent={<View><Text>Trouvez un stand avec un QRCode !</Text></View>}
				bottomContent={<View></View>}
			/> 
		);
	}
}

export default ScanView;