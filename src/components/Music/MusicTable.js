import React, { useState, useEffect, useContext } from 'react'
import { Table, Input, Button, Space, message, Avatar } from 'antd'
import Highlighter from 'react-highlight-words'
import { SearchOutlined, CaretRightOutlined, PlusOutlined, HeartOutlined, HeartFilled, DownloadOutlined, ProfileOutlined } from '@ant-design/icons'
import useReq from '../../services/useReq'
import moment from "moment"
import momentDurationFormatSetup from "moment-duration-format"
import note1024 from "../../assets/note1024.png"
import MainContext from '../MainContext'
import convertOne from '../../tools/convert-one'

momentDurationFormatSetup(moment)

const MusicTable = () => {
    const {
        playlist, setPlaylist, setPlaylistRaw,
        player,
    } = useContext(MainContext)

    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [searchText, setSearchText] = useState("")
    const [searchedColumn, setSearchedColumn] = useState("")

    const [getAllMusic, { loading, res: allMusic, err }] = useReq("GET", "/music/all")
    const [data, setData] = useState(allMusic?.body)

    let playNow = false

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

    // useEffect(() => {
    //     if(player && playNow){
    //         if(playlist.length > 1){
    //             player.playNext()
    //         }
    //         else {
    //             player.play()
    //         }
    //     }
    // }, [playlist])

    const start = () => {
        setTimeout(() => {
            setSelectedRowKeys([])
        }, 1000);
    }

    const onSelectChange = selectedRowKeys => {
        setSelectedRowKeys(selectedRowKeys)
    }

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }

    const hasSelected = selectedRowKeys.length > 0

    const handleChange = (pagination, filters, sorter) => {
        const { field, order } = sorter
        setData(data => {
            if (!order) {
                return allMusic?.body
            }

            let tmp = [...data]
            tmp.sort((a, b) => {
                if (order === "ascend") {
                    return String(a[field]).localeCompare(String(b[field]))
                }
                else {
                    return String(b[field]).localeCompare(String(a[field]))
                }
            })
            return tmp
        })
    }

    let searchInput = ""

    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.select());
            }
        },
        render: text =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscapemode
                    textToHighlight={text.toString()}
                />
            ) : (
                    text
                ),
    })

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0])
        setSearchedColumn(dataIndex)
    }

    const handleReset = clearFilters => {
        clearFilters();
        setSearchText("")
    }

    const columns = [
        {
            dataIndex: "picture", key: "picture",
            render: (picture) => (
                <Avatar src={
                    picture.length
                        ? `data:${picture[0].format};base64,${picture[0].data}`
                        : note1024
                } />
            )
        },
        {
            title: "Title", dataIndex: "title", key: "title",
            sorter: true,
            ...getColumnSearchProps("title")
        },
        {
            title: "Artist", dataIndex: "artist", key: "artist",
            sorter: true,
            ...getColumnSearchProps("artist"),
            responsive: ["md", "lg"]
        },
        {
            title: "Album", dataIndex: "album", key: "album",
            sorter: true,
            ...getColumnSearchProps("album"),
            responsive: ["lg"]
        },
        {
            title: "Duration", dataIndex: "duration", key: "duration",
            render: duration => moment.duration(duration, "seconds").format("mm:ss"),
            responsive: ["md", "lg"]
        },
        // {
        //     key: "play",
        //     render: () => (
        //         <CaretRightOutlined />
        //     ),
        //     onCell: record => ({
        //         onClick: () => {
        //             playNow = true
        //             player.clear()
        //             setPlaylist(playlist => ([
        //                 record,
        //                 ...playlist,
        //             ]))
        //         }
        //     })
        // },
        {
            key: "add_to_playlist",
            render: () => (
                <PlusOutlined />
            ),
            onCell: (record) => ({
                onClick: () => {
                    if(playlist.length){
                        player.appendAudio(playlist.length, [convertOne(record)])
                    }
                    else {
                        setPlaylist([record])
                    }
                }
            })
        },
        {
            key: "favor",
            render: () => (
                <HeartOutlined />
            )
        },
        {
            key: "download",
            render: () => (
                <DownloadOutlined />
            ),
            responsive: ["md", "lg"]
        },
    ]

    return (
        data
            ? (
                <>
                    <Table
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={data.map(e => ({ ...e, key: e._id }))}
                        onRow={(record, rowIndex) => {
                            // console.log({ record, rowIndex })
                        }}
                        onChange={handleChange}
                        loading={loading}
                        size="small"
                    />
                </>
            )
            : ""
    )
}



export default MusicTable