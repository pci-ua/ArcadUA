import { Component } from 'react';
import { Text, View, Image } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import SokobanService from '../services/SokobanService.js';
import GameView from './GameView.js';
import { Dimensions} from 'react-native'

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
				onRead={this.scanned.bind(this)}
				fadeIn={true}
				reactivateTimeout={400}
				topContent={<View><Text>Trouvez un stand avec un QRCode !</Text></View>}
				bottomContent={<View></View>}
				showMarker={true}
				customMarker={<Image source={require('../assets/QRCodeFrame.png')} style={{}} /> }
				notAuthorizedView={<View><Text style={{color: 'red'}}>Veuillez donner les droits pour la camera dans les paramètres de votre appareil.</Text></View>}

				cameraContainerStyle={{height:Dimensions.get('window').height-40}}
				cameraStyle={{height:Dimensions.get('window').height-40}}
			/> 
		);
	}
}

export default ScanView;