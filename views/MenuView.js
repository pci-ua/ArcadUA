import { Component } from 'react';
import { StyleSheet, Text, View, Button, PermissionsAndroid, Image } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import SokobanService from '../services/SokobanService.js';

class MenuView extends Component {

	state = {
		liste: null,
		count: 0,
		total: 999,
	}

	componentDidMount () {

		const LookupTable = {
			"AEBVA" : require('../assets/associations/AEBVA.png'),
			"AIDOC" : require('../assets/associations/AIDOC.png'),
			"BDE HISTOIRE" : require('../assets/associations/BDE_HISTOIRE.png'),
			"BDE LETTRES" : require('../assets/associations/BDE_LETTRES.png'),
			"CORPO SCIENCES" : require('../assets/associations/CORPO_SCIENCES.png'),
			"EXPECTO PATRIMOINE" : require('../assets/associations/EXPECTO_PATRIMOINE.png'),
			"HOZ" : require('../assets/associations/HOZ.png'),
			"JUNIOR" : require('../assets/associations/JUNIOR.png'),
			"PCi" : require('../assets/associations/PCi.png'),
			"PEGAZH" : require('../assets/associations/PEGAZH.png'),
			"UACMI" : require('../assets/associations/UACMI.png'),
			"APA" : require('../assets/associations/APA.png'),
		};
		PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);

		SokobanService.getStatusListe()
			.then( obj => Object.entries(obj) )
			.then( (data) => this.setState(
				{ 
					liste : data.map( ([Name,Done],i) => (
						<Text style={{color: 'black'}} key={`${i}`}> 
							
						<Image
							source={LookupTable[Name]} 
							style={{width: 30, height: 30}}
							/>
							{ '    '}
							{ Done ? (<Text style={{color:'#016b22'}}>✓</Text>) : (<Text style={{color:'red', marginRight: 10}}>✗</Text>) } 
							{ '    '}
							{Name} 
						</Text>
					) ),
					total: data.length,
					count: data.reduce( (acc,cur) => acc+(cur[1]?1:0) , 0 )
				}
			) )
		
		this.props.navigation.addListener( 'focus', (function() {
			SokobanService.getStatusListe()
				.then( obj => Object.entries(obj) )
				.then( ( function (data) { this.setState(
					{ 
						liste : data.map( ([Name,Done],i) => (
							<Text style={{color: 'black'}} key={`${i}`}> 
								
							<Image
								source={LookupTable[Name]} 
								style={{width: 30, height: 30}}
								/>
								{ '    '}
								{ Done ? (<Text style={{color:'#016b22'}}>✓</Text>) : (<Text style={{color:'red', marginRight: 10}}>✗</Text>) } 
								{ '    '}
								{Name} 
							</Text>
						) ),
						total: data.length,
						count: data.reduce( (acc,cur) => acc+(cur[1]?1:0) , 0 )
					}
				) } ).bind(this) )
		}).bind(this) )
	}
	scanner() {
		this.props.navigation.navigate('scan');
	}
	
	render() {
		return (
			<LinearGradient
				colors={['#ffffff','#7fa881']}
				style={styles.app}>
				<View style={{ alignItems: 'center'}}>
					<Text style={{fontWeight: 'bold'}}> Aide chaque BDE, en allant sur leurs stands! </Text>
				</View>
				<View>
					<Text style={{ color: 'black', textAlign: 'center', fontSize: 30, fontWeight: 'bold'}}>
						{ this.state.count} / {this.state.total}
					</Text>
				</View>
				<View style={{paddingHorizontal: 30,}}>
					{ this.state.liste }
				</View>
				<View style={{ alignItems: 'center', justifyContent: 'center',marginTop: 40}}>
					<Button style={{ padding: 10}}
  						title=" ▶️   Jouer    📸 "
  						color="teal"
  						accessibilityLabel="Scan a quest QR Code"
						  onPress={this.scanner.bind(this)}
						/>

				</View>
			</LinearGradient>
		);
	}

}
  
const styles = StyleSheet.create({
	app: {
		flex: 1,
		paddingTop: 80,
		
	},
});

export default MenuView;