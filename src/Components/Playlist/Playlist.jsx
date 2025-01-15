import React, {useState} from 'react';
import styles from './Playlist.module.css';
import Tracklist from '../Tracklist/Tracklist';

function Playlist(props){
    return(
        <div className={styles.Playlist}>
            <input defaultValue={"New Playlist"} />
            {
                <Tracklist tracks={props.userPlayListTracks}/>
            }
            <button className={styles["Playlist-save"]}>Save to Spotify</button>
        </div>
    );
}

export default Playlist;