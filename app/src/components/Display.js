import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; //connects components to redux store
import { fetchPosts } from '../actions/postActions';
import { RSA_SSLV23_PADDING } from 'constants';

class Display extends Component {

    componentWillMount() {
        this.props.fetchPosts();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.newPost) {
            this.props.posts.unshift(nextProps.newPost); //add to beginning
        }
    }
 
    render() {
        const postItems = this.props.posts.map(post => (
            <div key={post.uin}>
                <p>{post.firstName} {post.lastName}</p>
                <p>UIN: {post.uin}</p>
                <p>RSVP: {post.rsvp}</p>
                <p>Checked In: {post.checkIn}</p>
                <br></br>
            </div>
        ));

        return (
            <div>
                <h1>Display Component:</h1>
                { postItems}
            </div>
        )
    }
}

Display.propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
    newPost: PropTypes.object
}

const mapStateToProps = state => ({
    posts: state.posts.items,
    newPost: state.posts.item
})

export default connect(mapStateToProps, { fetchPosts })(Display);
