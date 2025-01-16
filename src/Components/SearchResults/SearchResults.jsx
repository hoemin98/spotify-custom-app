import React, {useState} from 'react';
import styles from './SearchResults.module.css';
import Tracklist from '../Tracklist/Tracklist';

function SearchResults(props){
    return(
        <div className={styles.SearchResults}>
            <Tracklist tracks={props.userSearchResults} onAdd={props.onAdd} isRemoval={false}/>
        </div>
    );
}

export default SearchResults;