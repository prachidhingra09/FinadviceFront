import {Redirect,Link} from 'react-router-dom';
import React , {Component} from 'react';
import {remupdate} from '../auth';
import {singleRem} from '../auth';
import {isAuthenticated} from '../auth';

class editReminder extends Component {
    constructor() {
        super()
        this.state = {
            id:'',
            bill:'',
            deadline:'',
            redirectToProfile: false,
            error:'',
          //  fileSize:0,
            loading:false
        }
    }

    init = (postId) => {
        singleRem(postId)
        .then(data => {
                console.log(data);
                this.setState({id: data._id, bill: data.bill, deadline : data.deadline, error:''})
        })
    }

    componentDidMount() {
        this.postData = new FormData()
        const postId = this.props.match.params.postId;
        this.init(postId);
    }

    isValid = () => {
        const { bill,deadline} = this.state
        if(bill.length === 0 || deadline.length === 0) {
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
            const dataToSend = JSON.stringify({ bill: this.state.bill, deadline: this.state.deadline })
            console.log(postId);
            console.log(token);
            remupdate(postId,token,dataToSend)
            .then(data => {
                if(data.errors) this.setState({error: data.errors})
                else {
                    this.setState({loading: false,bill: "",deadline:"",redirectToProfile:true})
                }
            })
        }

    }

    EditRem = (bill, deadline) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Bill</label>
                <input onChange={this.handleChange("bill")} type ="text" className="form-control" value={bill}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Deadline</label>
                <textarea onChange={this.handleChange("deadline")} type ="text" className="form-control" value={deadline}/>
            </div>
            <button onClick = {this.clickSubmit} className = "btn btn-raised btn-info" style={{float:"right"}}>
                Update Reminder
            </button>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </form>
    );

    render() {
        
        const {id,bill,deadline,redirectToProfile,error,loading} = this.state

        if(redirectToProfile) {
            return  <Redirect to={`/reminder`}/>
        }

        return (
            <div className = "container">
                <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                    {error}
                </div>
                {loading ? <div className = "jumbotron text-center">
                    <h2>Loading...</h2>
                </div> : ""}

                {this.EditRem(bill,deadline)}
            </div>
        )
    }
}

export default editReminder;