import React from 'react';

import axios from 'axios';

function Videos({videos = []}) {

    React.useEffect(() => {

    },[])

    return (
        <div>
            <h2>User Videos</h2>
            <div>
                {videos.map((video,idx) => <div key={idx}>{video.name}</div>)}
            </div>
        </div>
    )

}

export {
    Videos
}