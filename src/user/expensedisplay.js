import {Redirect,Link} from 'react-router-dom';
import React , {Component} from 'react';
import {expupdate} from '../auth';
import {singleExpense} from '../auth';
import {isAuthenticated} from '../auth';

class expensedisplay extends Component {
    constructor() {
        super()
        this.state = {
            id:'',
            expenditure:'',
            income:'',
            redirectToProfile: false,
            error:'',
          //  fileSize:0,
            loading:false
        }
    }

    init = (postId) => {
        singleExpense(postId)
        .then(data => {
                console.log(data);
                this.setState({id: data._id, expenditure: data.expenditure, income: data.income, error:''})
        })
    }

    componentDidMount() {
        this.postData = new FormData()
        const postId = this.props.match.params.postId;
        this.init(postId);
    }

    isValid = () => {
        const { expenditure,income} = this.state
        if(expenditure.length === 0 || income.length === 0) {
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
            const dataToSend = JSON.stringify({ expenditure: this.state.expenditure, income: this.state.income })
            console.log(postId);
            console.log(token);
            expupdate(postId,token,dataToSend)
            .then(data => {
                if(data.errors) this.setState({error: data.errors})
                else {
                    this.setState({loading: false,expenditure: "",income:"",redirectToProfile:true})
                }
            })
        }

    }

    EditExpense = (expenditure, income) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Expenditure</label>
                <input onChange={this.handleChange("expenditure")} type ="text" className="form-control" value={expenditure}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Income</label>
                <textarea onChange={this.handleChange("income")} type ="text" className="form-control" value={income}/>
            </div>
            <button onClick = {this.clickSubmit} className = "btn btn-raised btn-info" style={{float:"right"}}>
                Update Expense
            </button>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </form>
    );

    render() {
        
        const {id,expenditure,income,redirectToProfile,error,loading} = this.state

        if(redirectToProfile) {
            return  <Redirect to={`/`}/>
        }

        return (
            <div className = "container">
    

                <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                    {error}
                </div>
                {loading ? <div className = "jumbotron text-center">
                    <h2>Loading...</h2>
                </div> : ""}

                {this.EditExpense(expenditure,income)}
            </div>
        )
    }
}

export default expensedisplay;