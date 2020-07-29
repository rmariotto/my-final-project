const {google} = require('googleapis');

let secrets;
if (process.env.NODE_ENV == 'production') {
    secrets = process.env;
} else {
    secrets = require('../secrets.json');
}

exports.getVideos = async function(query){
    const yt = google.youtube({
        version: 'v3',
        auth: secrets.youtube_key,
     });
     
     const res = await yt.search.list({
         part: 'snippet',
         q: query,
         maxResults: 10
       });

    if (res.data) {
        // console.log(res.data.items);
        return res.data.items.map((item) => {
            return item.id.videoId;
        });
    } else {
        console.log('error: ', res);
    }

    return [];
};



