import { useState } from 'react'
import request from "superagent"

const withParams = (uri, params) => {
    const tail = params.join('/')
    return `${uri}/${tail}`
}

const useReq = (type, uri) => {
    const [loading, setLoading] = useState(false)
    const [res, setRes] = useState(null)
    const [err, setErr] = useState(null)

    const run = ({body, query, params, token} = {}) => {
        if(type.toLowerCase() === "GET"){
            return (
                request.get(params ? withParams(uri, params) : uri)
                    .set("x-auth", token ? token : "")
                    .query(query ? query : {})
                    .then(res => {
                        setRes(res)
                        return res
                    })
                    .catch(setErr)
            )
        }
        else {
            return (
                request[type.toLowerCase()](uri)
                    .set("x-auth", token ? token : "")
                    .send(body ? body : {})
                    .then(setRes)
                    .catch(setErr)
            )
        }
    }

    return [run, {loading, res, err}]
}

export default useReq
