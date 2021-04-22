import React,{Component} from 'react';
import {singlePost,update} from './apiPosts';
import {isAuthenticated} from '../auth';
import {Redirect} from 'react-router-dom';

class EditPost extends Component {
    constructor() {
        super()
        this.state = {
            id:'',
            title:'',
            body:'',
            redirectToProfile: false,
            error:'',
            fileSize:0,
            loading:false
        }
    }

    init = (postId) => {
        singlePost(postId)
        .then(data => {
                this.setState({id: data._id, title: data.title, body: data.body, error:''})
        })
    }

    componentDidMount() {
        this.postData = new FormData()
        const postId = this.props.match.params.postId;
        this.init(postId);
        
    }

    isValid = () => {
        const { title,body } = this.state
        if(title.length === 0 || body.length === 0) {
            this.setState({error: "All fields are Required", loading: false})
            return false
        }
        return true
    }

    handleChange = (name) => (event) => {
        this.setState({error: ""})
        const value = name === 'photo' ? event.target.files[0] :event.target.value
        const fileSize = name === 'photo' ? event.target.files[0].size :0
        this.postData.set(name,value)
        this.setState({[name]: value, fileSize});
    }

    clickSubmit = event => {
        event.preventDefault()
        this.setState({loading: true})
        if(this.isValid()) {
            const postId = this.state.id
            const token = isAuthenticated().token
            const dataToSend = JSON.stringify({ title: this.state.title, body: this.state.body })
            update(postId,token,dataToSend)
            .then(data => {
                if(data.errors) this.setState({error: data.errors})
                else {
                    this.setState({loading: false,title: "",body:"",photo:"",redirectToProfile:true})
                }
            })
        }

    }

    EditPostForm = (title, body) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Event</label>
                <input onChange={this.handleChange("title")} type ="text" className="form-control" value={title}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Date</label>
                <textarea onChange={this.handleChange("body")} type ="text" className="form-control" value={body}/>
            </div>
            <button onClick = {this.clickSubmit} className = "btn btn-raised btn-info" style={{float:"right"}}>
                Update Event
            </button>
        </form>
    );

    render() {
        
        const {id,title,body,redirectToProfile,error,loading} = this.state

        if(redirectToProfile) {
            return  <Redirect to={`/`}/>
        }

        return (
            <div className = "container">
                <h2 className="mt-5 mb-5" style={{textAlign:"center",fontStyle:"oblique"}}>{title}</h2>

                <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                    {error}
                </div>
                {loading ? <div className = "jumbotron text-center">
                    <h2>Loading...</h2>
                </div> : ""}

                {this.EditPostForm(title,body)}
            </div>
        )
    }
}

export default EditPost