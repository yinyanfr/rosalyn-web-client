import { useState } from 'react'
import request, { Response } from "superagent"

type HTTPProtocole = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

const withParams = (uri: string, params: string[]) => {
    const tail = params.join('/')
    return `${uri}/${tail}`
}

const useReq = (type: HTTPProtocole, uri: string): [any, { loading: boolean, res: any, err: any }] => {
    const [loading, setLoading] = useState(false)
    const [res, setRes] = useState<Response | null>(null)
    const [err, setErr] = useState(null)

    const run = ({ body, query, params, token }: any = {}) => {
        if (type.toLowerCase() === "get") {
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
                (<any>request)[type.toLowerCase()](uri) // typescript sucks
                    .set("x-auth", token ? token : "")
                    .send(body ? body : {})
                    .then(setRes)
                    .catch(setErr)
            )
        }
    }

    return [run, { loading, res, err }]
}

export default useReq
