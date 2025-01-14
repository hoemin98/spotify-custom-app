import React, {useState} from 'react';
import styles from './Playlist.module.css';

function Playlist(){
    return(
        <div className={styles.Playlist}>
            <input defaultValue={"New Playlist"} />
            <button className={styles["Playlist-save"]}>Save to Spotify</button>
        </div>
    );
}

export default Playlist;