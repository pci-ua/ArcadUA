import levelsData from '../assets/levels.json' /*assert {type: 'json'}*/;

import { AsyncStorage } from 'react-native';

export default class SokobanService {

    static async init() {
        await AsyncStorage.setItem( 
            'levels_completed' , 
            JSON.stringify(Object.fromEntries( Object.keys(levelsData).map( key => [key,false] ) ))
        );
    }

    static async getStatusListe() {
        return await new Promise( (resolve,reject) => {
            AsyncStorage.getItem( 'levels_completed' , (err,result) => {
                if( err ) { reject( err ); }
                else {

                    if( result == null ) {
                        SokobanService.init()
                            .then( SokobanService.getStatusListe )
                            .then( resolve )
                    } else {
                        resolve( JSON.parse( result ) )
                    }
                }
            })
        } )
    }

    

}