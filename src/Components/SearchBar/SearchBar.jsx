import React, {useState} from 'react';
import styles from './SearchBar.module.css';

function SearchBar(props){

    const [term, setTerm] = useState("");

    function passTerm(){
        props.onSearch(term);
    }

    function handleTermChange(e){
        setTerm(e.target.value)
    }

    /*
    function handleTermChange({ target }) {
        setTerm(target.value);
    }
    */

    return(
        <div className={styles.SearchBar}>
            <input placeholder="Enter a Song, Album, or Artist" onChange={handleTermChange}/>
            <button className={styles.SearchButton} onClick={passTerm}>Search</button>
        </div>
    );
}

export default SearchBar;