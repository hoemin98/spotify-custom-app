import React from 'react';
import styles from './Tracklist.module.css';
import Track from '../Track/Track';

function Tracklist(props){
    return(
        <div className={styles.Tracklist}>
            {
                props.tracks.map((song)=>(
                    <Track track={song} key={song.id} onAdd={props.onAdd} onRemove={props.onRemove} isRemoval={props.isRemoval}/>
                ))
            }
        </div>
    );
}

export default Tracklist;