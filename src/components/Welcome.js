import React from 'react'

const Welcome = () => {

    return (
        <div>
            <p>This is a preview version of Rosalyn WebClient.</p>
            <p>In short,</p>
            <h1>What works :</h1>
            <dl>
                <dd>User system</dd>
                <dd>Basic music player</dd>
                <dd>Radio (random play)</dd>
            </dl>
            <h1>What doesn't work yet:</h1>
            <dl>
                <dd>Memorized playlist</dd>
                <dd>Favor and playlist</dd>
                <dd>Comment</dd>
                <dd>Preference</dd>
                <dd>Upload your own music</dd>
                <dd>etc.</dd>
            </dl>

            <p>You may also encounter random bugs, please report them to me if you feel like doing it.</p>
            <p>You know how to contact me.</p>

            <p>There is a ghost bug when adding new songs to playlist, while url is correct, il does not load the audio file.</p>
        </div>
    )
}

export default Welcome
