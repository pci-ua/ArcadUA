import { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

import SokobanService from '../services/SokobanService.js';

class ScanView extends Component {

        render() {
            return <View>
                <QRCodeScanner
                    onRead={this.onSuccess}
                    flashMode={RNCamera.Constants.FlashMode.torch}
                    topContent={
                        <Text style={styles.centerText}>
                            Go to{' '}
                            <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
                            your computer and scan the QR code.
                        </Text>
                    }
                    bottomContent={
                        <TouchableOpacity style={styles.buttonTouchable}>
                            <Text style={styles.buttonText}>OK. Got it!</Text>
                        </TouchableOpacity>
                    }
                />
            </View>;
        }
}

export default ScanView;