import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MenuView from './views/MenuView.js';
import HomeView from './views/HomeView.js';
import ScanView from './views/ScanView.js';
import GameView from './views/GameView.js';

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer >
			<Stack.Navigator>
				<Stack.Screen name="home" component={HomeView} options={{headerShown: false}}/>
				<Stack.Screen name="menu" component={MenuView} options={{headerShown: false}}/>
				<Stack.Screen name="scan" component={ScanView} options={{headerShown: false}}/>
				<Stack.Screen name="game" component={GameView} options={{headerShown: false}}/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}