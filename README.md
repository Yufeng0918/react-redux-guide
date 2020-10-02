# React


## 01. Intro
#### Feature
- Declarative: painless to create interactive UIs
- Component-Based: build encapsulated components that manage their own state
- LearnOnce, Write Anywhere: render on the server using Node and power mobile apps using React Native.
#### Enviroment
- nvm and npm
- javascript - webpack -> application
#### Tools
- ide: webstorm, visual studio code
#### NPM command
- npm install --save <packagename>: --save to save package into package.json



## 02. JSX
#### Function
- compile JSX to javascript
#### Import
- React: core
- ReactDOM: html DOM
- path
    + node_modules: library name
    + owe: relative path
#### Implementation
- create react component
    + component is function or extend from React.Component
    + export component
- ReactDOM render the react component
```
import React from 'react';
import ReactDOM from 'react-dom'
import SearchBar from 'components/search_bar';

const App = function() {
    return <div>Hi!</div>
}
//render App component in .container div
ReactDOM.render(<App />, document.querySelector('.container'));


const SearchBar = () => {
    return <input type="text"/>
}


class SearchBar extends React.Component{
    render() {
        return <input type="text"/>
    }
}
export default SearchBar;
```


## 03. Event
#### Overview
- create the function handle event and pass event as argument
- bind the event function in JSX components
```
onInputChange(event) {
    this.setState({
        term: event.target.value
    })
}
render() {
    return (
        <div>
            <input onChange={e => this.onInputChange(e)} />
            <br /> value of input: {this.state.term}
        </div>
    );
}
```
#### Rebinding event
- onChange is point to onInputChange function
- onInputChange function is bind to current components to replace existing function
```
<input
    placeholder="Get a five-day forecast in your favorite city"
    className="form-control"
    value={this.state.term}
    onChange={this.onInputChange}
/>

constructor(props){
    super(props);
    this.onInputChange =  this.onInputChange.bind(this);
}
onInputChange(event) {
    this.setState({...})
}
```




## 04. State
#### Function
- each class based components has its owe state
- if state changes, component and child components will be re-render
#### Constructor
- call super(props)
- initial state
```
super(props)
this.state = {term: ''}
```
#### setState
- only change state attribute via setState
- setState will notify the React to re-render components
```
W: this.setState({term: event.target.value})
R: this.state.term
```
#### passState to child via closure
- parent
    + define closure to setState
    + pass closure to child as props
- child
    + call the closure and passing parameters 
```
//Parent: defind the closure and pass down
render(){
    return (
    <div>
        <SearchBar />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
            onVideoSelect={selectedVideo => this.setState({selectedVideo})}
            videos = {this.state.videos} />
    </div>
    );
}

//Child: pass down future to item
render(){
    return (
    <div>
        <SearchBar />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
            onVideoSelect={selectedVideo => this.setState({selectedVideo})}
            videos = {this.state.videos} />
    </div>
    );
}

//Child: execute function/clourse with argument from child
const VideoListItem = ({video, onVideoSelect}) => {
    const imageUrl = video.snippet.thumbnails.default.url;
    return (
        <li className="list-group-item" onClick={() => {onVideoSelect(video)}}>
        </li>
    );
}

```
#### Control the event trigger period via lodash
- wrapper the videoSearch function via lodash
- pass the videoSearch into function
```
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
```



## 05. Props
- pass the properties from parent
- read the properties from children
```
<VideoList videos = {this.state.videos} />
const VideoList = (props) => {
    return (
        <ul className="col-md-4 list-group">
            {props.videos.length}
        </ul>
    );
}
```
#### Collection
- create variable container JSX with data
- pass argument in collection to parent JSX
- key property is required for re-render
```
const videoItems = props.videos.map((video) => {
    return <VideoListItem video = {video} key = {video.prop}/>
})
<ul className="col-md-4 list-group">
    {videoItems}
</ul>
```


## 06. Redux
#### Overview
- predicate state container for javascript apps
- manage the state
#### Reducer
- create the function to return object
- add reducer to combineReducers to link the reducer to global state
```
export default function() {
    return [
        {title: 'java script: the good parts'},
        {title: 'algorithm'}
    ]
}
const rootReducer = combineReducers({
  books: BooksReducer
});
export default rootReducer;
```
- mapStateToProps will map the global state to BookList props
- connect container via connect(mapStateToProps)(BookList);
```
import React, { Component } from 'react';
import { connect } from 'react-redux';
class BookList extends Component {
    renderList(){
        return this.props.books.map((book) => {
           return (
               <li key={book.title} className="list-group-item">{book.title}</li>
           );
        });
    }
    render(){
        return (
            <ul className="list-group col-sm-4">
                {this.renderList()}
            </ul>
        );
    }
}


function mapStateToProps(state) {
    return {
        books: state.books
    }
}
export default connect(mapStateToProps)(BookList);
```
#### Action
- bind the properties to ActionCreator
- ActionCreator return action{type, payload}
- event trigger will dispatch to all the reducers
- reducer refresh the state to render the page
```
// component
class BookList extends Component {
    renderList(){
        return this.props.books.map((book) => {
           return (
               <li
                   onClick={() => this.props.selectBook(book)}
                   key={book.title}
                   className="list-group-item">
                   {book.title}
               </li>
           );
        });
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({selectBook: selectBook}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(BookList);


// Aactioncreator to return action
export function selectBook(book){
    return {
        type: 'BOOK_SELECTED',
        payload: book
    };
}

//reducer
export default function(state = null, action){
    switch (action.type) {
        case 'BOOK_SELECTED':
            return action.payload;
    }
    return state;
}
```
#### Middleware
- control action to reducer
- ajax + promise
- Step 1 - Bind ActionCreator
    + apply the promise as middleware
    + bindActionCreator for props.fetchWether
```
const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
  , document.querySelector('.container'));
   
class SearchBar {
    onFormSubmit(event){
        event.preventDefault();
        this.props.fetchWeather(this.state.term);
        this.setState({term : ''});
    }
    render(){
        return (
            <form onSubmit={this.onFormSubmit} className="input-group">
                <input onChange={this.onInputChange}/>
                <span className="input-group-btn">
                    <button type="submit" className="btn btn-secondary">Submit</button>
                </span>
            </form>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchWeather}, dispatch);
}
export default connect(null, mapDispatchToProps)(SearchBar);
```
- Step 2 - Create ActionCreator
    + define the actionCreator to return the action
    + get the payload from axios ajax call
    + payload is promise does not container any data
    + till ajax callback to assign the data to payload, middleware will send action to reducer
```
export function fetchWeather(city){
    const url = `${ROOT_URL}&q=${city},us`
    const request = axios.get(url);
    return {
        type: FETCH_WEATHER,
        payload: request
    }
}
```
- Step 3 - Reducer
    + reducer handle the action
    + mainupulate the action.payload into state
```
import {FETCH_WEATHER} from '../actions/index'
export default function (state = [], action) {
    switch (action.type) {
        case FETCH_WEATHER:
            return [action.payload.data, ...state];
    }
    return state;
}
```


## 07. Router
#### Overview
- single page application
- navigation
#### Route Implementation
- import the react components
- BrowserRouter->Swith->Route will map to first URL match pattern
```
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/posts/new" component={PostsNew} />
                    <Route path="/" component={PostsIndex} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
  , document.querySelector('.container'));
``` 
#### Link
- Link's to indicate the path
```
<Link className = "btn btn-primary" to="/posts/new">
```


## 08. Redux Form
#### Form
- Export: export the redux form given the form name
- Field: create the field and render the field via component
    + function render the field 
    + {...field.input} will link the event handle from form to render component
-  Validation
    + validate the properties for enter
    + show the error only field.meta.touched (focus and left) and field.meta.error
    + error.<property_name> must match to Field's name so field will only link to field error 
- Submission
    + handleSubmit will called once form is valid to submit
    + this.onSubmit is callback function invoked by handleSubmit
    + call the createPost action and pass the callback function
```
import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';

class PostNew extends Component {
    renderField(field) {
        const { meta: {touched, error } } = field;
        const className = `form-group ${ touched && error ? 'has-danger': ''}`;
        return (
            <div className= {className} >
                <label> {field.label} </label>
                <input
                    className="form-control"
                    {...field.input}
                    type="text"
                />
                <div className="text-help">
                    {touched ? error: ''}
                </div>
            </div>
        );
    }
    onSubmit(values){
        this.props.createPost(values, () => {
            this.props.history.push('/');
    });

    render(){
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
                <Field
                    label="Title"
                    name="title"
                    component={this.renderField}
                />
                <button type="submit" className="btn  btn-primary">Submit</button>
            </form>
        );
    }
}

function validate(values) {
    const error = {};
    if (!values.title || values.title.length < 3) {
        error.title = "Enter a title at least 3 characters!";
    }
    if (!values.content) {
        error.content = "Enter some content!";
    }
    return error;
}

export default reduxForm({
    validate,
    form: 'PostsNewForm'
})(PostNew);

export function createPost(values, callback) {
    const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values).then(() => callback());
    return {
        type: CREATE_POSTS,
        payload: request
    }
}
```