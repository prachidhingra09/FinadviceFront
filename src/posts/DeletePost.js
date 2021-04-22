import React,{Component} from 'react';
import {remove} from './apiPosts';
import {isAuthenticated} from '../auth';
import {Redirect} from 'react-router-dom';

class DeletePost extends Component {
    constructor() {
        super()
        this.state = {
            redirectToProfile:false
        }
    }



    deletePost = () => {
        const postId = this.props.match.params.postId
        console.log(postId)
        console.log(this.state.redirectToProfile)
        const token = isAuthenticated().token
        remove(postId,token).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                this.setState({redirectToProfile: true})
            }
        })

    }

    deleteConfirmed = () => {
        let answer = window.confirm("Are you sure you want to cancel this Event?")
        if(answer) {
            this.deletePost()
        }
    }
    deletePostForm = () => (
        <div className="jumbotron">
            <h4>Hitting this button will permanently cancel the scheduled event. </h4>
            <button onClick = {this.deleteConfirmed} className = "btn btn-raised btn-info" style={{float:"left"}}>
                Cancel Event
            </button>
        </div>
    );

    render() {
        
        const {redirectToProfile} = this.state
        if(redirectToProfile) {
            return  <Redirect to={`/post/create`}/>
        }

        return (
            <div className = "container">
                {this.deletePostForm()}
            </div>
        )
    }
}

export default DeletePost