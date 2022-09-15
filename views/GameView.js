import { Component } from 'react';
import { StyleSheet, Image, View, Button, Text } from 'react-native';

import SokobanService from '../services/SokobanService.js';

import { LinearGradient } from 'expo-linear-gradient';

class GameView extends Component {

	static tiles = {};
	static gameState = null;

	static map = 'PCi';

	static notATile = require('../assets/tiles/empty.png');

	static tiles = [
		require('../assets/tiles/floor.png'),
		require('../assets/tiles/player.png'),
		require('../assets/tiles/wall.png'),
		require('../assets/tiles/object.png'),
		require('../assets/tiles/spot.png'),		
		require('../assets/tiles/spot_full.png'),	
		require('../assets/tiles/spot_player.png'),	
	];

	state = {
		map: null,
		grid: null,
		grille: null,
	};

	// Init graphique
	componentDidMount() { 
		let caarte = SokobanService.getGameFromID(GameView.map);
		let cool = [... new Array(10)].map( (_,x) => [... new Array(10)].map( (_,y) => <Image style={{width:32,height:32}} source={ ((caarte[x]!==undefined)&&(caarte[x][y]!==undefined)) ? GameView.tiles[ caarte[x][y] ] : GameView.notATile} />) )
		let temp = [... new Array(10)].map( (_,i) => {
			return <View style={styles.grid_row} key={`game_row_${i}`}>{
				[... new Array(10)].map( (_,j) => {
					return <View style={{flex: 1}}>{cool[i][j]}</View>;
				})
			}</View>
		})
		this.setState( {grid: temp,grille: cool} )
		GameView.gameState = caarte;
	}

	render() {
		return (
			<LinearGradient
				colors={['#ffffff','#7fa881']}
				style={{flex: 1, alignItems: 'center' }}
				>
				
				<View 
					style={{
						marginHorizontal: "auto",
						width: 320,
						height: 325,
						marginBottom: 20,
					}} >
					{ this.state.grid }
				</View>

				<View 
					style={{
						marginHorizontal: "auto",
						width: 210,
						height: 210,
					}} >
						<View style={styles.grid_row} >
							<View style={{flex: 1,margin:5}}><Button color={"white"} title=" "/></View>
							<View style={{flex: 1,margin:5}}><Button color={"white"} title="⬆️" onPress={this.move_up.bind(this)} /></View>
							<View style={{flex: 1,margin:5}}><Button color={"white"} title=" "/></View>
						</View>
						<View style={styles.grid_row} >
							<View style={{flex: 1,margin:5}}><Button color={"white"} title="⬅️" onPress={this.move_left.bind(this)} /></View>
							<View style={{flex: 1,margin:5}}><Button color={"white"} title="🔄" onPress={this.reinitialise.bind(this)} /></View>
							<View style={{flex: 1,margin:5}}><Button color={"white"} title="➡️" onPress={this.move_right.bind(this)} /></View>
						</View>
						<View style={styles.grid_row} >
							<View style={{flex: 1,margin:5}}><Button color={"white"} title=" "/></View>
							<View style={{flex: 1,margin:5}}><Button color={"white"} title="⬇️" onPress={this.move_down.bind(this)} /></View>
							<View style={{flex: 1,margin:5}}><Button color={"white"} title=" "/></View>
						</View>
				</View>
			</LinearGradient>
		);
	}

	move_up() { this.update.bind(this)('⬆️'); this.draw.bind(this)(); }
	move_left() { this.update.bind(this)('⬅️'); this.draw.bind(this)(); }
	move_down() { this.update.bind(this)('➡️'); this.draw.bind(this)(); }
	move_right() { this.update.bind(this)('⬇️'); this.draw.bind(this)(); }
	
	// Moteur de rendu
	draw() {
		let cool = [... new Array(10)].map( (_,x) => [... new Array(10)].map( (_,y) => (
			<Image style={{width:32,height:32}} source={ ((GameView.gameState[x]!==undefined)&&(GameView.gameState[x][y]!==undefined)) ? GameView.tiles[ GameView.gameState[x][y] ] : GameView.notATile} />
		) ) )
		let temp = [... new Array(10)].map( (_,i) => {
			return (
				<View style={styles.grid_row} key={`game_row_${i}`}>
					{
					[... new Array(10)].map( (_,j) => ( <View style={{flex: 1}}  key={`game_cell_${i}_${j}`}>{cool[i][j]}</View> ) )
					}
				</View>
			);
		})
		this.setState( {grid: temp,grille: cool} );

	}

	end() {
		if( SokobanService.isThisAWinGame( GameView.gameState ) ) {
			SokobanService.win( GameView.map ).then( () => {;
				this.props.navigation.navigate('menu');
			});
		}
	}

	// Moteur de jeu
	update(move) {
		console.log({move})
		let px,py;

		for(let i=0;i<10;i++) {
			let j = GameView.gameState[i].indexOf(1);
			if( j != -1) {
				px = i;
				py = j;
				break;
			}

			let jj = GameView.gameState[i].indexOf(6);
			if( jj != -1) {
				px = i;
				py = jj;
				break;
			}
		}
		
		if( px == undefined ) return;

		let me = (GameView.gameState[px][py] == 1) ? 0 : 4;
		let dx,dy;

		switch( move ) {
			case '⬆️':
				dx = -1;
				dy = 0;
				break;
			case '⬅️':
				dx = 0;
				dy = -1;
				break;
			case '⬇️':
				dx = 0;
				dy = 1;
				break;
			case '➡️':
				dx = 1;
				dy = 0;
				break;
		}

		if( dx == undefined ) return;

		let tx = px + dx ; let ty = py + dy;
		let ttx = tx + dx ; let tty = ty + dy;

		switch( GameView.gameState[tx][ty] ) {
			case 0: 
				/* 'floor' */
				GameView.gameState[px][py] = me;
				GameView.gameState[tx][ty] = 1;
				this.end();
				return;

			case 2: 
				/* 'wall' */
				this.end();
				return;

			case 4: 
				/* 'spot' */
				GameView.gameState[px][py] = me;
				GameView.gameState[tx][ty] = 6;
				this.end();
				return;

			case 3: 
				/* 'object' */
				if(
					GameView.gameState[ttx][tty] == 0
				) {
					GameView.gameState[ttx][tty] = 3;
					GameView.gameState[tx][ty] = 1;
					GameView.gameState[px][py] = me;
				}

				if(
					GameView.gameState[ttx][tty] == 4
				) {
					GameView.gameState[ttx][tty] = 5;
					GameView.gameState[tx][ty] = 1;
					GameView.gameState[px][py] = me;
				}
				this.end();
				return;

			case 5: 
				/* 'spot_full' */
				if(
					GameView.gameState[ttx][tty] == 0
				) {
					GameView.gameState[ttx][tty] = 3;
					GameView.gameState[tx][ty] = 6;
					GameView.gameState[px][py] = me;
				}

				if(
					GameView.gameState[ttx][tty] == 4
				) {
					GameView.gameState[ttx][tty] = 5;
					GameView.gameState[tx][ty] = 6;
					GameView.gameState[px][py] = me;
				}
				this.end();
				return;

		}
	}

	// Reinitialisation
	reinitialise() {		
		GameView.gameState = SokobanService.getGameFromID(GameView.map);
		this.draw.bind(this)();
	}

}
  
const styles = StyleSheet.create({
	app: {
		flex: 1,
		backgroundColor: '#000',
		paddingTop: 80,
		
	},

	grid_row: {
		flexDirection: 'row'
	}
});

export default GameView;