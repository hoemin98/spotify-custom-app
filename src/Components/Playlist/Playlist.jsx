import React, {useState} from 'react';
import styles from './Playlist.module.css';
import Tracklist from '../Tracklist/Tracklist';

function Playlist(props){

    function handleNameChange(e){
        props.onNameChange(e.target.value);
    }

    return(
        <div className={styles.Playlist}>
            <input defaultValue={"New Playlist"} onChange={handleNameChange}/>
            {
                <Tracklist tracks={props.userPlayListTracks} onRemove={props.onRemove} isRemoval={true}/>
            }
            <button className={styles["Playlist-save"]} onClick={props.onSave}>Save to Spotify</button>
        </div>
    );
}

export default Playlist;