import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; //connects components to redux store
import { fetchPosts } from '../actions/postActions';


class Display extends Component {

    componentWillMount() {
        
            this.props.fetchPosts();
        
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.newPost) {
            this.props.students.unshift(nextProps.newPost); //add to beginning
        }
    }
 
    render() {
        
        const postItems = this.props.students.map(post => (
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
    students: PropTypes.array.isRequired,
    newPost: PropTypes.object
}

const mapStateToProps = state => ({
    students: state.posts.items,
    newPost: state.posts.item
})

export default connect(mapStateToProps, { fetchPosts })(Display);
