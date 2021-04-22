import React from 'react';
import {Link,withRouter} from 'react-router-dom';
import {signout,isAuthenticated} from '../auth';

const isActive = (history,path) => {
    if(history.location.pathname === path) return {color: "#000000"}
    else return {color: "#ffffff"}
}


const Menu = ({history}) => (
    <div>
        <ul className="nav nav-tabs" style={{backgroundColor:"lightblue"}}>
            <li className="nav-item">
                <Link className = "nav-link"  style = {isActive(history,"/")} to = "/">Home</Link>
            </li>
           
            
            {!isAuthenticated() && (
                <>
                    
                    <li className="nav-item">
                        <Link className = "nav-link" style = {isActive(history,"/signup")} to = "/signup">Sign Up</Link>  
                    </li>
                    <li className="nav-item">
                        <Link className = "nav-link" style = {isActive(history,"/signin")} to = "/signin">Sign In</Link> 
                    </li>
                </>
            )}


            {isAuthenticated() && (
                <> 
                    <li className="nav-item">
                        <span className = "nav-link" style = {(isActive(history,"/signout"),
                        {cursor: "pointer",color: "#ffffff"})}
                        onClick={() => signout(()=> history.push('/'))}>Sign Out
                        </span> 
                    </li>
                    <li className="nav-item">
                        <Link className = "nav-link" style = {isActive(history,"/chat")} to = "/chat">Chat</Link>  
                    </li>
                    <li className="nav-item">
                        <Link className = "nav-link" style = {isActive(history,"/showexpense")} to = "/showexpense">Expense</Link>  
                    </li>
                    <li className="nav-item">
                        <Link className = "nav-link" style = {isActive(history,"/gold")} to = "/gold">Gold</Link>  
                    </li>
                    <li className="nav-item">
                        <Link className = "nav-link" style = {isActive(history,"/reminder")} to = "/reminder">Reminders</Link>  
                    </li>
    
                </>
            )}
            
            
        </ul>
    </div>
)

export default withRouter(Menu);