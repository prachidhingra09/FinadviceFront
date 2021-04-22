import React , {Component} from 'react';
import {singlePost,remove} from './apiPosts';
import {Link,Redirect} from 'react-router-dom';
import {isAuthenticated} from '../auth';


class SinglePost extends Component {
    state = {
        post:'',
        redirecttohome: false,
        redirecttosignin: false,
    }

    componentDidMount = () => {
        const postId = this.props.match.params.postId
        singlePost(postId).then(data => {
                console.log(data)
                this.setState({post: data})
        })
    }


    deletePost = () => {
        const postId = this.props.match.params.postId
        const token = isAuthenticated().token
        remove(postId,token).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                this.setState({redirecttohome: true})
            }
        })

    }

    deleteConfirmed = () => {
        let answer = window.confirm("Are you sure you want to delete this Event?")
        if(answer) {
            this.deletePost()
        }
    }

    renderPost = (post) => {
        const posterId = post.postedBy ? `/user/${post.postedBy._id}` : ""
        const posterName = post.postedBy ? post.postedBy.name : "Unknown"
        return (
                <div className="card-body">

                        <p className="card-text">{post.body}</p>
                        <br />
                        <p className="font-italic mark">
                            posted by <Link to={`${posterId}`}>{posterName}</Link>{" "}
                            on {new Date(post.created).toDateString()}
                        </p>
                        <div className="d-inline-block">
                            <Link to={`/`} className="btn btn-raised btn-dark btn-sm mr-5">Back to Events</Link>
                            {isAuthenticated().user && 
                            isAuthenticated().user._id === post.postedBy._id && 
                            (
                            <>
                                <Link to={`/post/edit/${post._id}`} className="btn btn-raised btn-success btn-sm mr-5">Update Event</Link>
                                <button onClick={this.deleteConfirmed} className="btn btn-raised btn-danger">Delete Event</button>
                            </>
                            )
                            }
                        </div>
                </div> 
        )
    }

    render() {

        const {post,redirecttosignin,redirecttohome} = this.state

        if(redirecttohome) {
            return  <Redirect to={`/`}/>
        } else if(redirecttosignin){
            return  <Redirect to={`/signin`}/>
        }


        return (
            <div className = "container">
                <h2 className = "mt-5 mb-5">{post}</h2>
                {!post ? <div className = "jumbotron text-center">
                    <h2>Loading...</h2>
                </div> : this.renderPost(post)}
            </div>
        )
    }
}

export default SinglePost;