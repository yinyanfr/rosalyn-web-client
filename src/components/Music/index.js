import React, { useState, useEffect } from 'react'
import MusicTable from './MusicTable'
import { Layout, Breadcrumb, message } from 'antd'
import useReq from '../../services/useReq'

const { Content } = Layout

const Music = () => {

    const [getAllMusic, { loading, res: allMusic, err }] = useReq("GET", "/music/all")
    const [data, setData] = useState(allMusic?.body)

    useEffect(() => {
        const token = localStorage.getItem("token")
        getAllMusic({ token })
    }, [])

    useEffect(() => {
        if (allMusic) setData(allMusic.body)
        if (err) {
            console.log(err)
            message.error("Failed to load music.")
        }
    }, [allMusic, err])

    return (
        <section>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Library</Breadcrumb.Item>
            </Breadcrumb>
            <Layout className="site-layout-background">
                <Content style={{ minHeight: 280 }}>
                    <MusicTable
                        data={data}
                        setData={setData}
                        allMusic={allMusic}
                        loading={loading}
                    />
                </Content>
            </Layout>
        </section>
    )
}

export default Music
