import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyBx_nkh_AR4-IWPLAYSawZrDOXWtBHQqBY'

class App extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            selectedVideo: null
        };


        this.videoSearch('surfboards');
    }


    videoSearch(term){
        let _this = this
        YTSearch({key: API_KEY, term: term}, function (data) {
            // this = _this;
            _this.setState({
                videos: data,
                selectedVideo: data[0]
            });
        });
    }

    render(){

        const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);

        return (
        <div>
            <SearchBar onSearchTermChange={videoSearch}/>
            <VideoDetail video={this.state.selectedVideo} />
            <VideoList
                onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                videos = {this.state.videos} />
        </div>
        );
    }

}

ReactDOM.render(<App />, document.querySelector('.container'));
