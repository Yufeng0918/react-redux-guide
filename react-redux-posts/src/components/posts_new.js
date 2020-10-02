import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost} from "../actions";

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
        // this == component
        // console.log("submit")
        console.log(values);
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }

    render(){
        // function pass from redux form
        // handleSubmit exec first
        // onSubmit is callback function after handleSubmit
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
                <Field
                    label="Title"
                    name="title"
                    component={this.renderField}
                />
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />

                <Field
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn  btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}


function validate(values) {
    // console.log(values)

    const error = {};
    if (!values.title || values.title.length < 3) {
        //error.property need to map the name to field
        error.title = "Enter a title at least 3 characters!";
    }

    if (!values.categories) {
        error.categories = "Enter a categories!";
    }

    if (!values.content) {
        error.content = "Enter some content!";
    }

    return error;
}

export default reduxForm({
    validate,
    form: 'PostsNewForm'
})(connect(null, {createPost})(PostNew));