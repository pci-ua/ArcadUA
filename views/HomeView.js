import { Component } from 'react';
import { StyleSheet, Image, View, Animated } from 'react-native';

class HomeView extends Component {

	state = {
		fadeAnim: new Animated.Value(0)
	};

	fadeIn = () => {
		Animated.timing(this.state.fadeAnim, {
			toValue: 1,
			duration: 2000,
		}).start();
	};
	
	fadeOut = () => {
		Animated.timing(this.state.fadeAnim, {
			toValue: 0,
			duration: 1500,
		}).start();
	};

	componentDidMount() {
		this.fadeIn();
		setTimeout( (this.fadeOut).bind(this) , 3000 );
		setTimeout( () => this.props.navigation.navigate('menu') , 5000 );
	}

	render() {
		return (
				<View style={styles.app}>
					<Animated.Image
						source={require('../assets/logo.png')} 
						style={{ width: 200, height: 200 , opacity: this.state.fadeAnim}}/>
					<Animated.View style={{...styles.partenaire, opacity: this.state.fadeAnim}}>
						<Image
							source={require('../assets/partenaires/ua.png')} 
							style={styles.partenaireLogo}/>
						<Image
							source={require('../assets/partenaires/pci.png')} 
							style={styles.partenaireLogo}/>
						<Image
							source={require('../assets/partenaires/campus_day.png')} 
							style={styles.partenaireLogo}/>
						<Image
							source={require('../assets/partenaires/cvec.png')} 
							style={styles.partenaireLogo}/>
					</Animated.View>
				</View>
		);
	}
}

const styles = StyleSheet.create({
	app: {
		backgroundColor: '#0A0A0A',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 80,
	},
	partenaire: {
		flexDirection: 'row',marginTop: 80
	},
	partenaireLogo: {
		margin: 10,
		width: 80, height: 80 

	}
});

export default HomeView;