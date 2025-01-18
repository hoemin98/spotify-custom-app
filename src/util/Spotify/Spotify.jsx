let accessToken = "";
const clientID = "9246791aae6746f2b739ca83c6b7ccbc";
const redirectURI = "http://localhost:5173/spotify-custom-app";

const Spotify = {
   
    getAccessToken(){
         // First check for the access token
        if(accessToken){
            return accessToken;            
        }

        const tokenInURL = window.location.href.match(/access_token=([^&]*)/);
        const expiryTime = window.location.href.match(/expires_in=([^&]*)/);

        // Second check for the access token
        if(tokenInURL && expiryTime){
            // setting access token and expiry time variables
            // we take the second part of the array because of the match function above
            accessToken = tokenInURL[1];
            const expiresIn = Number(expiryTime[1]);

            // Setting the access token to expire at the value for expiration time
            window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
            // clearing the url after the access token expires
            window.history.pushState("Access token", null, "/");

            return accessToken;
        }

        // Third check for the access token if the first and second check are both false
        const redirect = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        window.location = redirect;
    },

    searchTerm(term){
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => {
            return response.json();
        })
        .then((jsonResponse) => {
            if(!jsonResponse){
                console.error("Response error");
            }
            return jsonResponse.tracks.items.map((t) => ({
                        id: t.id,
                        name: t.name,
                        artist: t.artists[0].name,
                        album: t.album.name,
                        uri: t.uri
                })
            );
        })
    },

    savePlaylistName(name, trackURIs){
        if(!name || !trackURIs){
            return;
        }
        let aToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${aToken}` };

        let userId = "";
        return fetch(`https://api.spotify.com/v1/me`, {
            headers: headers,
        })
        .then((response) => {
            return response.json();
        })
        .then((jsonResponse) => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers: headers,
                method: "POST",
                body: JSON.stringify({name: name})
            });
        })
        .then((response) => {
            return response.json();
        })
        .then((jsonResponse) => {
            const playlistID = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
                headers: headers,
                method: "POST",
                body: JSON.stringify({uris: trackURIs})
            });
        })
    }

};

export {Spotify};