import React,{Component} from 'react';
import {deleteReminder} from '../auth';
import {isAuthenticated} from '../auth';
import {Redirect} from 'react-router-dom';

class DeleteReminder extends Component {
    constructor() {
        super()
        this.state = {
            redirectToProfile:false
        }
    }

    deleteRem = () => {
        const postId = this.props.match.params.postId
        console.log(postId)
        console.log(this.state.redirectToProfile)
        const token = isAuthenticated().token
        deleteReminder(postId,token).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                this.setState({redirectToProfile: true})
            }
        })

    }

    deleteConfirmed = () => {
        let answer = window.confirm("Are you sure you want to remove the reminder?")
        if(answer) {
            this.deleteRem()
        }
    }
    deletePostForm = () => (
        <div className="jumbotron">
            <h4>Hitting this button will permanently delete the Reminder. </h4>
            <button onClick = {this.deleteConfirmed} className = "btn btn-raised btn-info" style={{float:"left"}}>
                Delete Reminder
            </button>
        </div>
    );

    render() {
        
        const {redirectToProfile} = this.state
        if(redirectToProfile) {
            return  <Redirect to={`/reminder`}/>
        }

        return (
            <div className = "container">
                {this.deletePostForm()}
            </div>
        )
    }
}

export default DeleteReminder;