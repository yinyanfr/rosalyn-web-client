import React from 'react'
import MusicTable from './MusicTable'
import { Layout, Breadcrumb } from 'antd'

const { Content } = Layout

const Music = () => {

    return (
        <section>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Library</Breadcrumb.Item>
            </Breadcrumb>
            <Layout className="site-layout-background">
                <Content style={{ minHeight: 280 }}>
                    <MusicTable />
                </Content>
            </Layout>
        </section>
    )
}

export default Music
