import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import {remlistByUser} from '../auth';
import {isAuthenticated} from '../auth';

class displayReminder extends Component {
    constructor() {
        super()
        this.state = {
            posts: []
        }
    }

    componentDidMount () {
        remlistByUser(isAuthenticated().user._id,isAuthenticated().token).then(data => {
           console.log(data);
           this.setState({posts:data})

        })
    }


    renderPosts = (posts) => {
        return (
            
        <div className="col">
            {posts.map((post, i) => {
                //const posterId = post.postedBy ? `/user/${post.postedBy._id}` : ""
                //const posterName = post.postedBy ? post.postedBy.name : "Unknown"
                return (
                   <div> 
                    <div className="card col-md-12" key = {i}>
                        <div className="card-body">

                            <h5 className="card-text">Bill : {post.bill}</h5>
                            <h5 className="card-text">Deadline : {new Date(post.deadline).toDateString()}</h5>
                            <br />
                            <p className="font-italic">
                                Created on : {new Date(post.created).toDateString()}
                            </p>
                            <Link to={`/reminder/delete/${post._id}`} className="btn btn-raised btn-dark " style={{float :"right"}}>Delete</Link>
                            <Link to={`/reminder/${post._id}`} className="btn btn-raised btn-info bt-sn" style={{float :"right"}}>Edit</Link>
                            
                        </div>
                        
                        
                    </div> 
                    <br/>
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

export default displayReminder;