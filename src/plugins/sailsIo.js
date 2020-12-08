const socketIOClient = require('socket.io-client')
const sailsIOClient = require('sails.io.js')
const io = sailsIOClient(socketIOClient)
import { Loading,Message  } from 'element-ui';
import {requestConfig} from '../../config/settings'

io.sails.url = requestConfig.baseUrl

export default {
    get(url, query = {}) {
        let loadingInstance = Loading.service({ fullscreen: true });
        return new Promise((resolve, reject) => {
            loadingInstance.close();
            io.socket.get(`/${url}`, query, (resData, jwres) => {
                if (!resData) {
                    Message.error({message:'服务操作错误'})
                    return reject(jwres)

                } else {
                    return resolve(resData)
                }
            })
        })
    },
    post(url, data) {
        return new Promise((resolve, reject) => {
            io.socket.post(`/${url}`, data, (resData, jwres) => {
                if (resData) {
                    return resolve(resData)
                } else {
                    Message.error({message:'服务操作错误'})
                    reject(jwres)
                }
            })
        })
    },
    update(url, data) {
        let loadingInstance = Loading.service({ fullscreen: true });
        return new Promise((resolve, reject) => {
            loadingInstance.close();
            io.socket.patch(`/${url}/${data.id}`, data, (resData, jwres) => {

                if (jwres.statusCode === 200) {
                    resolve(resData)
                } else {
                    Message.error({message:'服务操作错误'})
                    return reject(jwres.body)
                }
            })
        })
    },
    del(url, id) {
        let loadingInstance = Loading.service({ fullscreen: true });
        return new Promise((resolve, reject) => {
            loadingInstance.close();
            io.socket.delete(`/${url}/${id}`, (resData, jwres) => {
                if (jwres.statusCode === 200) {
                    return resolve(resData)
                } else {
                    Message.error({message:'服务操作错误'})
                    return reject(jwres.body)
                }
            })
        })
    }
}

export function on(eventName, cb) {
    io.socket.on(eventName, cb);
}


