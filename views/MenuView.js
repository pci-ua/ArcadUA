import { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import SokobanService from '../services/SokobanService.js';

class MenuView extends Component {

	state = {
		liste: null,
		count: 0,
		total: 999,
	}

	componentDidMount () {
		SokobanService.getStatusListe()
			.then( obj => Object.entries(obj) )
			.then( (data) => this.setState(
				{ 
					liste : data.map( ([Name,Done]) => (
						<Text style={{color: 'white', padding: 4}}> 
							{ Done ? (<Text style={{color:'red', marginRight: 10}}>✓</Text>) : (<Text style={{color:'red', marginRight: 10}}>✗</Text>) } 
							{Name} 
						</Text>
					) ),
					total: data.length,
					count: data.reduce( (acc,cur) => acc+(cur[1]?1:0) , 0 )
				}
			) )
	}

	scanner() {
		this.props.navigation.navigate('scan');
	}
	
	render() {
		return (
			<View style={styles.app}>
				<View style={{ alignItems: 'center', justifyContent: 'center',marginBottom: 20}}>
					<Button style={{ padding: 10}}
  						title=" 📸 "
  						color="teal"
  						accessibilityLabel="Scan a quest QR Code"
						  onPress={this.scanner.bind(this)}
						/>

				</View>
				<View>
					<Text style={{ color: 'gold', textAlign: 'center'}}>
						{ this.state.count} / {this.state.total}
					</Text>
				</View>
				<View style={{paddingHorizontal: 30,}}>
					{ this.state.liste }
				</View>
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

export default MenuView;