import React from 'react';
import ReactDOM from 'react-dom';
import VideoListItem from './video_list_item'


const VideoList = (props) => {

    const videoItems = props.videos.map((video) => {

        console.log(props.onVideoSelect)
        return (
            <VideoListItem
                onVideoSelect={props.onVideoSelect}
                video = {video}
                key = {video.etag}
            />);
    })

    return (
        <ul className="col-md-4 list-group">
            {videoItems}
        </ul>
    );
}



export default VideoList;