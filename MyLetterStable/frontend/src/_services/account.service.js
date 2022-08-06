import { BehaviorSubject, Subject } from 'rxjs';
import Router from 'next/router';
import { authHeader, option, method, handleResponse } from '../_helpers';
import { initFacebookSdk } from '../_helpers'
import getConfig from 'next/config';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { take } from 'rxjs/operators';
import { alertService } from '../../src/_services';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';

const { publicRuntimeConfig } = getConfig();

//const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
const baseUrl = `${publicRuntimeConfig.apiUrl}`;
const baseImgUrl = `${publicRuntimeConfig.imgUrl}`;

const { t } = useTranslation
const hubUrl = `${publicRuntimeConfig.hubUrl}`;
let hubConnection = HubConnection;



const onlineUsersSource = new BehaviorSubject([]);

const accountSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

export const accountService = {
    login,
    loginFB,
    loginFacebook,
    loginGoogle,
    apiAuthenticate,
    deleteMyAccount,
    edit,
    editOptions,
    profile,
    getById,
    logout,
    answerQuestion,
    getAll,
    likeUser,
    getNotification,
    getAllMsg,
    stopHubConnection,
    sendMessage,
    sendPublicMessage,
    sendAsk,
    getMessagesById,
    getAsks,
    getChat,
    getStamps,
    getFilter,
    openMessage,
    update,
    upload,

    getToken,
    redis,
    createHubConnection,
    updateAccount,
    delete: _delete,
    account: accountSubject.asObservable(),
    get accountValue() { return accountSubject.value; },
    onlineUsers: onlineUsersSource.asObservable(),
    get onlineUserstValue() { return onlineUsersSource.value; }

};
function createHubConnection(token) {
    console.log("hubConnection");
    hubConnection = new HubConnectionBuilder()
        .withUrl(`${hubUrl}/presence`, {
            accessTokenFactory: () => token
        })
        .withAutomaticReconnect()
        .build()

    hubConnection.start()
        .catch(error => console.log(error));
    hubConnection.on('UserIsOnline', username => {
        console.log("now he is open")
        this.onlineUsers.pipe(take(1)).subscribe(usernames => {
            console.log("now he is open inside")
            onlineUsersSource.next([...usernames, username])
        })
    })

    hubConnection.on('UserIsOffline', username => {
        console.log("now he is offline")
        this.onlineUsers.pipe(take(1)).subscribe(usernames => {
            onlineUsersSource.next([...usernames.filter(x => x !== username)])
        })
    })

    hubConnection.on('GetOnlineUsers', (usernames) => {
        onlineUsersSource.next(usernames);
    })

    hubConnection.on('NewMessageReceived', (data, name) => {
        //alertService.success(data.username + ' New Msg ' + data.name, { keepAfterRouteChange: true });
        const uSession = JSON.parse(localStorage.getItem('user'));

        if (data.name == "message") {
            uSession.messages = uSession.messages + 1;

        }
        uSession.likes = uSession.likes + 1;


        updateAccount(uSession)
        toast.success("You have new Notification.")

    })
}

function updateAccount(uSession) {
    localStorage.setItem('user', JSON.stringify(uSession));
    accountSubject.next(uSession)
}
function stopHubConnection() {

    hubConnection.stop().catch(error => console.log(error));
}

function getToken() {

    const token = localStorage.getItem('user');

    return token;
}
function loginGoogle(accessToken) {

    const requestOptions = option(method.POST, accessToken, false)

    return fetch(`${baseUrl}/Auth/googleAuth`, requestOptions)
        .then(handleResponse)
        .then(result => {
            if (result) {
                if (result.image != null) {
                    result.image = baseImgUrl + "/" + result.image;
                }
                localStorage.setItem('user', JSON.stringify(result));
                accountSubject.next(result);
            }

            Router.push('/');
        }).catch(error => console.log('Error! ' + error.message));
}
function loginFB(nextUser) {

    const requestOptions = option(method.POST, nextUser, false)

    return fetchWithError(`${baseUrl}/Auth/fbAuth`, requestOptions)
        .then(handleResponse)
}
function loginFacebook(accessToken) {

    const requestOptions = option(method.POST, accessToken, false)

    return fetchWithError(`${baseUrl}/Auth/facebookAuth`, requestOptions)
        .then(handleResponse)
        .then(result => {
            console.log("result log", result)
            if (result) {
                localStorage.setItem('user', JSON.stringify(result));
                accountSubject.next(result);
                if (result.gender == null)
                    Router.push('/complete', null, { shallow: true })
                else
                    Router.push('/', null, { shallow: true })
            } else {
                Router.push('/', null, { shallow: true })
            }
            //Router.push('/users');

        });
}

function fetchWithError(url, reqOpt) {
    return fetch(`${url}`, reqOpt)
        .catch(error => {

            alert('Error! ' + error.message)
            logout()
        });
}

function sendMessage(data, id) {

    const requestOptions = {
        method: 'POST',
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    return fetch(`${baseUrl}/User/chat/${id}`, requestOptions).then(handleResponse);
}
function sendPublicMessage(data) {
    const requestOptions = {
        method: 'POST',
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    return fetch(`${baseUrl}/User/chat/public`, requestOptions).then(handleResponse);
}
function sendAsk(data, id) {

    const requestOptions = {
        method: 'POST',
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    return fetch(`${baseUrl}/User/chat/ask/${id}`, requestOptions).then(handleResponse);
}


function answerQuestion(data, id) {

    const requestOptions = {
        method: 'POST',
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    return fetch(`${baseUrl}/User/chat/answer/${id}`, requestOptions).then(handleResponse);
}

function openMessage(data) {

    const requestOptions = {
        method: 'POST',
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    return fetch(`${baseUrl}/User/open`, requestOptions).then(handleResponse);
}

function edit(data) {

    const requestOptions = {
        method: 'POST',
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    return fetch(`${baseUrl}/User/edit`, requestOptions).then(handleResponse);
}
function editOptions(data) {

    const requestOptions = {
        method: 'POST',
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    return fetch(`${baseUrl}/User/edit_options`, requestOptions).then(handleResponse);
}
function deleteMyAccount() {

    const requestOptions = {
        method: 'POST',
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        },
    };
    return fetch(`${baseUrl}/Auth/delete`, requestOptions).then({ handleResponse }).then(p => {
        logout();
    });
}

function upload(data) {
    const requestOptions = {
        method: 'POST',
        headers: {
            ...authHeader()
        },
        body: data
    };
    return fetch(`${baseUrl}/User/upload`, requestOptions).then(handleResponse);
}


function getAllMsg() {
    const requestOptions = {
        method: 'GET'
        //headers: authHeader(),
    };
    return fetch(`${baseUrl}/User/allmsg`, requestOptions).then(handleResponse).catch((error) => {
        console.log("error", error)
    });
}
function getNotification() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${baseUrl}/User/notification`, requestOptions).then(handleResponse).catch((error) => {
        console.log("error", error)
    });
}

function redis() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${baseUrl}/User/redis`, requestOptions).then(handleResponse).catch((error) => {
        console.log("error", error)
    });
}


function likeUser(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };
    return fetch(`${baseUrl}/User/like/${id}`, requestOptions).then(handleResponse).catch((error) => {
        console.log("error", error)
    });

}

function getMessagesById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };
    return fetch(`${baseUrl}/User/chat/${id}`, requestOptions).then(handleResponse).catch((error) => {
        console.log("error", error)
    });
}

function getAsks(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };
    return fetch(`${baseUrl}/User/chat/asks/${id}`, requestOptions).then(handleResponse).catch((error) => {
        console.log("error", error)
    });
}


function getById(id) {
    const requestOptions = {
        method: 'GET',
    };
    return fetch(`${baseUrl}/User/profile/${id}`, requestOptions).then(handleResponse);
}

function profile() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };
    return fetchWithError(`${baseUrl}/User/profile`, requestOptions).then(handleResponse).catch((error) => {
        logout();
    });
}

async function login() {
    //  login with facebook then authenticate with the API to get a JWT auth token
    const { authResponse } = await new Promise(window.FB.login);
    if (!authResponse) return;
    console.log("if (!authResponse) return;"); console.log(authResponse.accessToken)

    await loginFacebook(authResponse.accessToken);

}

async function apiAuthenticate(accessToken) {
    // authenticate with the api using a facebook access token,
    // on success the api returns an account object with a JWT auth token
    console.log("JWT auth token")
    console.log(accessToken)
    const response = await axios.post(`${baseUrl}/Auth/facebookAuth`, { "userName": accessToken });
    const account = response.data;
    accountSubject.next(account);
    startAuthenticateTimer();
    return account;
}

function logout() {
    // revoke app permissions to logout completely because FB.logout() doesn't remove FB cookie
    // window.FB.api('/me/permissions', 'delete', null, () => window.FB.logout());
    // stopAuthenticateTimer();
    console.log("Logout Fire By Profile")
    accountSubject.next(null);
    localStorage.removeItem('user');
    //  window.location("/")
    Router.push('/login');
}

function getAll(education, sector, page,) {
    const requestOptions = {
        method: 'GET'
    };
    return fetch(`${baseUrl}/User/users?education=${education}&sector=${sector}&page=${page}`, requestOptions).then(handleResponse).catch((error) => {

        console.log("Error F", error)
        logout();
    });;
}

function getStamps() {
    const requestOptions = {
        method: 'GET'
    };
    return fetch(`${baseUrl}/User/stamps`, requestOptions).then(handleResponse);
}


function getChat() {

    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };
    return fetch(`${baseUrl}/Auth/chats`, requestOptions).then(handleResponse);
}


function getFilter() {

    const requestOptions = {
        method: 'GET',

    };
    return fetch(`${baseUrl}/Auth/filter`, requestOptions).then(handleResponse).catch(r => {

    });;
}

async function update(id, params) {
    const response = await axios.put(`${baseUrl}/${id}`, params);
    let account = response.data;
    // update the current account if it was updated
    if (account.id === accountSubject.value?.id) {
        // publish updated account to subscribers
        account = { ...accountSubject.value, ...account };
        accountSubject.next(account);
    }
    return account;
}

async function _delete(id) {
    await axios.delete(`${baseUrl}/${id}`);
    if (id === accountSubject.value?.id) {
        // auto logout if the logged in account was deleted
        logout();
    }
}

// helper methods

let authenticateTimeout;

function startAuthenticateTimer() {
    // parse json object from base64 encoded jwt token
    const jwtToken = JSON.parse(atob(accountSubject.value.token.split('.')[1]));

    // set a timeout to re-authenticate with the api one minute before the token expires
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000);
    const { accessToken } = window.FB.getAuthResponse();
    authenticateTimeout = setTimeout(() => apiAuthenticate(accessToken), timeout);
}

function stopAuthenticateTimer() {
    // cancel timer for re-authenticating with the api
    clearTimeout(authenticateTimeout);
}