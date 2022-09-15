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

    static isThisAValidCode( code ) {
        if(
            code.match(/^https:\/\/projetcohesion\.info\/CampusDay2022\#([a-zA-Z_]+)$/)
        ) {
            let [_,bde] = code.match(/^https:\/\/projetcohesion\.info\/CampusDay2022\#([a-zA-Z_]+)$/);
            if( levelsData[bde.replace(/_/g,' ')] ) {
                return bde.replace(/_/g,' ');
            }
        }
        return null;
    }
    
    static getGameFromID( id ) {
        // 💩 Deep copy, easy way but not most efficient
        return JSON.parse(JSON.stringify(levelsData[ id ]));
    }

    static tilesIdToName( id ) {
        switch( id ) {
            case 0: return 'floor';
            case 1: return 'player';
            case 2: return 'wall';
            case 3: return 'object';
            case 4: return 'spot';
            case 5: return 'spot_full';
            case 6: return 'spot_player';
        }
    }

    static isThisAWinGame( state ) {
        for(let x in state) {
            for(let y in state[x]) {
                if( (state[x][y] == 4) || (state[x][y] == 3) ) {
                    return false;
                }
            }
        }
        return true;
    }

    static async win( id ) {
        let statusListe = await SokobanService.getStatusListe();
        statusListe[ id ] = true;
        await AsyncStorage.setItem( 
            'levels_completed' , 
            JSON.stringify( statusListe)
        );
    }
}