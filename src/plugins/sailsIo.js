const socketIOClient = require('socket.io-client')
const sailsIOClient = require('sails.io.js')
const io = sailsIOClient(socketIOClient)

import {requestConfig} from '@/settings'
io.sails.url = requestConfig.baseUrl
export function get(url) {
    return new Promise((resolve, reject) => {
        io.socket.get(`/${url}`, (resData, jwres) => {
            if (!resData) {
               return  reject(jwres)
            } else {
                return  resolve(resData)
            }
        })
    })
}
export function on(mb) {
    return new Promise(resolve => {
        io.socket.on(mb, data => {
            return resolve(data)
        })
    })
}
export function post(url, data) {
    return new Promise((resolve, reject) => {
        io.socket.post(url, data, (resData, jwres) => {
            if (resData) {
                resolve()
            } else {
                reject(jwres)
            }
        })
    })
}

