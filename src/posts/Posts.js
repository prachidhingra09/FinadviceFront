import React , {Component} from 'react';
import { List } from "./apiPosts";
import {Link} from 'react-router-dom';
import {remlistByUser} from '../auth';


class Posts extends Component {
    constructor() {
        super()
        this.state = {
            posts: []
        }
    }

    componentDidMount () {
        remlistByUser().then(data => {
            console.log(data)
            console.log("hi")
           /* if(data.error) {
                console.log(data.error)
            } else {
                this.setState({posts: data})
            }*/
        })
    }


    renderPosts = (posts) => {
        return (
        <div className="row">
            {posts.map((post, i) => {
                const posterId = post.postedBy ? `/user/${post.postedBy._id}` : ""
                const posterName = post.postedBy ? post.postedBy.name : "Unknown"
                return (
                    <div className="card col-md-12" key = {i}>
                        <div className="card-body">
                            <h5 className="card-title">{post.title}</h5>
                            <p className="card-text">{post.body.substring(0,50)}</p>
                            <br />
                            <p className="font-italic">
                                Created on : {new Date(post.created).toDateString()}
                            </p>
                            <Link to={`/post/delete/${post._id}`} className="btn btn-raised btn-dark " style={{float :"right"}}>Cancel</Link>
                            <Link to={`/post/edit/${post._id}`} className="btn btn-raised btn-info bt-sn" style={{float :"right"}}>Reschedule</Link>
                            
                        </div>
                    </div>  
                )              
            } )}
        </div>
        )
    }

    render() {

        const {posts} = this.state;
        return (
            <div className = "container">
                <h2 style={{fontFamily: "Italic"}} className = "mt-5 mb-5 bg-light" >{!posts.length ? "Loading..." : "" }</h2>
                {this.renderPosts(posts)}
            </div>
        )
    }
}

export default Posts;