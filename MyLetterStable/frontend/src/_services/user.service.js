import { apiUrl } from 'config';
import { fetchWrapper } from 'src/_helpers';
import { BehaviorSubject } from 'rxjs';



let ar_json = require('../../data/profile_ar.json');
let en_json = require('../../data/profile_en.json');

const userSubject =   new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('data')))



export const userService = {
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value },
  
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

const baseUrl = `${apiUrl}/users`;

function getAll(lang) {
    console.log("lang is down");
console.log(lang);
console.log("lang is up");

    if(lang =="en"){
        if(localStorage.getItem('data_'+lang) == null){ localStorage.setItem('data_'+lang, JSON.stringify(en_json))}
        const data = localStorage.getItem('data_'+lang);
        return   JSON.parse(data);
    }else{
        if(localStorage.getItem('data_'+lang) == null){ localStorage.setItem('data_'+lang, JSON.stringify(ar_json))}
        const data = localStorage.getItem('data_'+lang);
        return  JSON.parse(data);
    }
  
  //  const data = localStorage.getItem("data");

   // return fetchWrapper.get(`${baseUrl}/${id}`);
    
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function create(params) {
    return fetchWrapper.post(baseUrl, params);
}

function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}
