import React , {Component} from 'react';
import {isAuthenticated} from '../auth';
import {create} from './apiPosts';
import {Redirect} from 'react-router-dom';

class NewPost extends Component {

    constructor()  {
        super()
        this.state = {
            title: "",
            body: "",
            error:"",
            loading:false,
            redirectToProfile: false,
            user:{

            }
        }
    }

    componentDidMount() {
        this.postData = new FormData()
        this.setState({user: isAuthenticated().user})
    }

    isValid = () => {
        const { title,body } = this.state
        if(title.length === 0 || body.length === 0) {
            this.setState({error: "All fields are Required", loading: false})
            return false
        }
        return true
    }

    //changing state of variables
    handleChange = (name) => (event) => {
        this.setState({error: ""})
        const value = name === 'photo' ? event.target.files[0] :event.target.value
        this.postData.set(name,value)
        this.setState({[name]: value});
    }

    clickSubmit = event => {
        event.preventDefault()
        this.setState({loading: true})
        if(this.isValid()) {
            const userId = isAuthenticated().user._id
            const token = isAuthenticated().token
            const dataToSend = JSON.stringify({ title: this.state.title, body: this.state.body })
            create(userId,token,dataToSend)
            .then(data => {
                    this.setState({loading: false,title: "",body:"",redirectToProfile:true})
            })
        }

    }

    newPostForm = (title, body) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Event Name</label>
                <input onChange={this.handleChange("title")} type ="text" className="form-control" value={title}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Date</label>
                <textarea onChange={this.handleChange("body")} type ="text" className="form-control" value={body}/>
            </div>
            <button onClick = {this.clickSubmit} className = "btn btn-raised btn-dark" style={{float:"right"}}>
                Schedule Event
            </button>
        </form>
    );

    render() {
        const {title,body,photo,user,error,loading,redirectToProfile} = this.state

        if(redirectToProfile) {
           return  <Redirect to={`/`}/>
        }

        
        return (
            <div className = "container">
                <h2 className = "mt-5 mb-5" style={{textAlign:"center"}}>SCHEDULE NEW EVENT</h2>
                <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                    {error}
                </div>
                {loading ? <div className = "jumbotron text-center">
                    <h2>Loading...</h2>
                </div> : ""}
                
                {this.newPostForm(title,body)}
            </div>
        )
    }
}

export default NewPost;