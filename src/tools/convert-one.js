import note1024 from "../assets/note1024.png"

const convertOne = (music) => {
    const token = localStorage.getItem("token")
    const {
        title: name,
        artist: singer,
        duration, picture,
        _id,
        album,
        musicSrc
    } = music
    return {
        name, singer, duration,
        cover: picture[0] ? `data:${picture[0].format};base64,${picture[0].data}` : note1024,
        musicSrc: `/music/download/${token}/${_id}`,
        album,
        _id,
    }
}

export default convertOne
