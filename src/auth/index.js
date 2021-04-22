export const signup = (user) => {
    console.log(user);
    return fetch(`${process.env.REACT_APP_API_URL}/signup`, {
        method: "POST",
        headers: {
            Accept:"application/json",
            "content-type":"application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        
        return response.json()
    })
    .catch(err => console.log(err))
}

export const signin = (user) => {
    return fetch(`${process.env.REACT_APP_API_URL}/signin`, {
        method: "POST",
        headers: {
            Accept:"application/json",
            "content-type":"application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const authenticate =  (jwt,next) => {
    if(typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(jwt))
        next()
    }

}

export const signout = (next) => {
    if(typeof window !== "undefined") localStorage.removeItem("jwt")
    next()
    return fetch(`${process.env.REACT_APP_API_URL}/signout`, {
        method: "GET"
    })
    .then(response => {
        console.log('signout', response)
        return response.json()
    })
    .catch(err => console.log(err))
}

export const isAuthenticated = () => {
    if(typeof window == "undefined") {
        return false
    }
    if(localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"))
    } else {
        return false
    }
}

export const insertReminder = (newRem,user,token) => {
    console.log(newRem);
    console.log(user);
    return fetch(`${process.env.REACT_APP_API_URL}/reminder/add/${user}`, {
        method: "POST",
        headers: {
            Accept:"application/json",
            "content-type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newRem)
    })
    .then(response => {
        
        return response.json()
    })
    .catch(err => console.log(err))
}
export const insertExpense = (newExp,user,token) => {
    console.log(newExp);
    console.log(user);
    return fetch(`${process.env.REACT_APP_API_URL}/expense/add/${user}`, {
        method: "POST",
        headers: {
            Accept:"application/json",
            "content-type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newExp)
    })
    .then(response => {
        
        return response.json()
    })
    .catch(err => console.log(err))
}

export const goldList = () => {
    return fetch(`http://localhost:8080/gold`,{
        method: "GET",
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
}
export const mutualList = () => {
    return fetch(`http://localhost:8080/mutualf`,{
        method: "GET",
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
}
export const remlistByUser = (user, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/reminder/${user}`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
}
export const singleExpense = (postId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/expense/by/${postId}`,{
        method: "GET",
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
}

export const expupdate = (postId,token,post) => {
    console.log("prachi")
    return fetch(`${process.env.REACT_APP_API_URL}/expense/update/${postId}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body: post
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
}

export const explistByUser = (userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/expense/${userId}`,{
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
}
export const deleteExpense = (postId,token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/expense/remove/${postId}`,{
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
}
export const deleteReminder = (postId,token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/reminder/remove/${postId}`,{
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
}
export const remupdate = (postId,token,post) => {
    console.log("prachi")
    return fetch(`${process.env.REACT_APP_API_URL}/reminder/update/${postId}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body: post
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
}
export const singleRem = (postId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/reminder/by/${postId}`,{
        method: "GET",
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
}
