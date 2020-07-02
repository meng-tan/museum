import { config } from '../config'

export default class UserService {
    static instance = null;
    static getInstance() {
        if (UserService.instance === null) {
            UserService.instance = new UserService()
        }
        return this.instance
    }

    isLoggedIn = () => {
        return (typeof window.sessionStorage.token) == "undefined" ? false : true
    }

    logout = () => {
        window.sessionStorage.removeItem('token')
        window.sessionStorage.removeItem('username')
        window.location.href = '/auth'
    }

    updateToken = data => {
        if (data && data.token) {
            window.sessionStorage.token = data.token
        }
    }

    register = newUser => {
        return fetch(config.api + '/register', {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: { 'content-type': 'application/json' },
        }).then(res => res.json())
    }

    login = user => {
        return fetch(config.api + '/login', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { 'content-type': 'application/json' },
        }).then(res => res.json())
            .then(data => {
                console.log("logged in data:")
                console.log(data)
                if (data.token) {
                    window.sessionStorage.username = data.username
                    window.sessionStorage.token = data.token
                }
                return data
            })
    }

    googleLogin = response => {
        return fetch(config.api + '/google-login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': response.tokenId
            },
        }).then(res => res.json())
            .then(data => {
                console.log("logged in data:")
                console.log(data)

                if (data.token) {
                    window.sessionStorage.username = data.username
                    window.sessionStorage.token = data.token
                }
            })
    }

    findPaymentById = id => {
        return fetch(config.api + '/payments/id/' + id, {
            headers: {
                'Authorization': 'Bearer ' + window.sessionStorage.token
            },
        }).then(res => res.json())
            .then(data => {
                console.log("one payment")
                console.log(data)
                this.updateToken(data.token)
                return data
            })
    }

    listPayments = () => {
        return fetch(config.api + '/payments', {
            headers: {
                'Authorization': 'Bearer ' + window.sessionStorage.token
            },
        }).then(res => res.json())
            .then(data => {
                console.log("user get payments")
                console.log(data)
                this.updateToken(data.token)

                return data
            })
    }

    buyTickets = exhibitionOrder => {
        return fetch(config.api + '/exhibitions/buy-tickets', {
            method: 'POST',
            body: JSON.stringify(exhibitionOrder),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + window.sessionStorage.token
            },
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                this.updateToken(data.token)
                return data
            })
    }

    listExhibitionOrders = page => {
        return fetch(config.api + '/exhibition-orders/page/' + page, {
            headers: {
                'Authorization': 'Bearer ' + window.sessionStorage.token
            }
        }).then(res => res.json())
            .then(data => {
                this.updateToken(data.token)
                return data
            })
    }



}
