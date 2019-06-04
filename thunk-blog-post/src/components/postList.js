import React from 'react';
import { connect } from 'react-redux';
import { fetchPostsAndUsers } from '../actions';
import UserHeader from './userHeader';

class PostList extends React.Component {
    componentDidMount() {
        this.props.fetchPostsAndUsers();
    }

    rednerList() {
        return this.props.posts.map(post => {
            return (
                <div className='item' key={post.id}>
                    <i className='large middle aligned icon user'></i>
                    <div className='content'>
                        <div className='description'>
                            <h2>{post.title}</h2>
                            <p>{post.body}</p>
                        </div>
                        <UserHeader userId={post.userId}/>
                    </div>
                </div>
            )
        })
    }

    render() {
        console.log('props: ', this.props)
        return <div className='ui relaxed divided list'>{this.rednerList()}</div>
    }
}

const mapStateToProps = state => {
    return { posts: state.posts };
}
export default connect(mapStateToProps, {
    fetchPostsAndUsers
})(PostList);