const socketIOClient = require('socket.io-client');
const  sailsIOClient = require('sails.io.js');
import {requestConfig} from '@/settings'
const io = sailsIOClient(socketIOClient);
io.sails.url=requestConfig.baseUrl
export function get(api, params) {
    return new Promise((resolve,reject)=>{
        io.socket.get(api,params,(data,JWB)=>{
            if(!data){
                return reject(JWB)
            }
            return resolve(data)

        })
    })
}
export function post(api, params) {
    return new Promise((resolve,reject)=>{
        io.socket.post(api,params,(data,JWB)=>{
            if(!data){
                return reject(JWB)
            }
            return resolve(data)

        })
    })
}
