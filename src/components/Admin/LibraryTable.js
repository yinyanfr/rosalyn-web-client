import React, { useState, useEffect } from 'react'
import { Table, Button, Spin, message, Empty, Checkbox, Modal } from 'antd'
import useReq from '../../services/useReq'
import moment from "moment"

const token = localStorage.getItem("token")

const columns = (update, setModal) => ([
    {
        title: "Path", dataIndex: "path", key: "path",
    },
    {
        title: "Name", dataIndex: "name", key: "name",
    },
    {
        title: "Rec", dataIndex: "rec", key: "rec",
        render: value => <Checkbox checked={value} disabled />
    },
    {
        title: "Count", dataIndex: "count", key: "count",
    },
    {
        title: "Last Modified", dataIndex: "lastModified", key: "lastModified",
        render: value => moment(value).format("lll")
    },
    {
        title: "Actions", dataIndex: "actions", key: "actions",
        render: (text, record, index) => (
            <>
                <Button
                    type="primary"
                    onClick={() => {
                        update({ body: { path: record.path }, token })
                    }}
                >
                    Update
                </Button>

                <Button
                    danger
                    onClick={() => {
                        setModal(record._id)
                    }}
                >
                    Remove
                </Button>
            </>
        )
    }
])

const LibraryTable = () => {
    const [getlibs, { res }] = useReq('GET', "/library/all")
    const [update, updateReq] = useReq("POST", "/library/add")
    const [remove, removeReq] = useReq("DELETE", "/library/remove")
    const [modal, setModal] = useState(false)

    console.log(res)

    useEffect(() => {
        const token = localStorage.getItem("token")
        getlibs({ token })
    }, [])

    useEffect(() => {
        if (updateReq.res) message.success("Successfully updated your library.")
        if (removeReq.res) message.success("Successfully removed your library.")
        if (updateReq.err) message.error("Failed to update your library.")
        if (removeReq.err) message.error("Failed to remove your library.")
    }, [updateReq, removeReq])

    return (
        <>
            <Spin spinning={updateReq?.loading || removeReq?.loading}>
                <Table
                    // title="Libraries"
                    columns={columns(update, setModal)}
                    dataSource={res?.body.map(e => ({ ...e, key: e._id }))}
                />
            </Spin>
            <Modal
                title="confirm"
                visible={modal}
                onCancel={() => {
                    setModal(false)
                }}
                confirmLoading={removeReq.loading}
                onOk={() => {
                    remove({ body: { libraryId: modal }, token })
                }}
                okButtonProps={{ danger: true }}
            >
                <p>This operation is irreversable and is going to remove all music added with this repo.</p>
            </Modal>
        </>
    )
}

export default LibraryTable
