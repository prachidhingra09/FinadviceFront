import React , {Component} from 'react';
import {signup} from '../auth'
import {Link} from 'react-router-dom'

class Signup extends Component {
    constructor() {
        super()
        this.state = {
            name: "",
            phoneNumber:"",
            email:"",
            password:"",
            error:"",
            open: false
        }
    }
    //changing state of variables
    handleChange = (name) => (event) => {
        this.setState({error: ""})
        this.setState({[name]: event.target.value});
    }

    clickSubmit = event => {
        event.preventDefault()
        const {name,phoneNumber,email,password} = this.state;
        const user = {
            name,
            phoneNumber,
            email,
            password,
        };
        //console.log(user)
        signup(user)
        .then(data => {
            if(data.error) this.setState({error: data.error})
                else this.setState({
                    error: "",
                    name: "",
                    phoneNumber:"",
                    email: "",
                    password: "",
                    open: true
                })
        })

    }


    signupForm = (name,phoneNumber, email, password) => (
                <form>
                    <div className="form-group">
                        <label className="text-muted">Name</label>
                        <input onChange={this.handleChange("name")} type ="text" className="form-control" value={name}/>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Phone Number</label>
                        <input onChange={this.handleChange("phoneNumber")} type ="number" className="form-control" value={phoneNumber}/>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input onChange={this.handleChange("email")} type ="email" className="form-control" value={email}/>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input onChange={this.handleChange("password")} type ="password" className="form-control" value={password}/>
                    </div>
                    <button onClick = {this.clickSubmit} className = "btn btn-raised btn-dark" style={{float:"right"}}>
                        submit
                    </button>
                </form>
    )

    render() {
        const {name, phoneNumber,email, password,error,open} = this.state
        return(
            
            <div className = "container">

                <h2 className = "mt-5 mb-5" style={{textAlign:"Center",fontStyle:"oblique",color:"white"}}>SIGN UP</h2>

                <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                    {error}
                </div>

                <div className="alert alert-info" style={{ display: open ? "" : "none" }}>
                    New account is successfully created. Please <Link to ="/signin">Signin</Link>
                </div>
                {this.signupForm(name,phoneNumber, email, password)}
                <div><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/></div>
            </div>
        )
    }
}

export default Signup;