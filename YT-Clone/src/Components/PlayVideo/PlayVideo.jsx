import React, { useEffect, useState } from 'react'
import './playVideo.css'
import video1 from '../../assets/video.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'
import { API_KEY } from '../../data'
import moment from 'moment'
import { value_converter } from '../../data'
import { useParams } from 'react-router-dom'
const PlayVideo = () => {

    const [apiData, setApiData] = useState(null);
    const [channelData, setChannelData] = useState(null);
    const [commentData, setCommentData] = useState([])
    const {videoId}=useParams();
    

    const fetchvideoData = async () => {
        // fetching video data
        
    }
    

    const fetchOtherData = async () => {
        //fetching subcribers and logo data
        const channelDataUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`
        await fetch(channelDataUrl).then(res => res.json()).then(data => setChannelData(data.items[0]))
        //fetching comment data
        const commentUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}`
        await fetch(commentUrl).then(res => res.json()).then(data => setCommentData(data.items))
    }

    

    useEffect(() => {
        fetchOtherData();

    }, [apiData])


    return (
        <div className='play-video'>

            <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            <h3>{apiData ? apiData.snippet.title : "Title Here"}</h3>
            <div className="play-video-info">
                <p>{apiData ? apiData.statistics.viewCount : "Likes"} &bull; {moment(apiData ? apiData.snippet.publishedAt : '').fromNow()}</p>
                <div>
                    <span><img src={like} alt="" />{apiData ? value_converter(apiData.statistics.likeCount) : "Likes"}</span>
                    <span><img src={dislike} alt="" /></span>
                    <span><img src={share} alt="" />Share</span>
                    <span><img src={save} alt="" />Save</span>
                </div>
            </div>
            <hr />
            <div className="publisher">
                <img src={channelData ? channelData.snippet.thumbnails.medium.url : ''} alt="" />
                <div>
                    <p>{apiData ? apiData.snippet.channelTitle : ""}</p>
                    <span>{value_converter(channelData ? channelData.statistics.subscriberCount : '')} Subscribers</span>
                </div>
                <button>Subcribe</button>
            </div>
            <div className="vid-description">
                <p>{apiData ? apiData.snippet.title : "Title Here"}</p>
                <p>{apiData ? apiData.snippet.description : "description"}</p>
                <hr />
                <h4>{apiData ? apiData.statistics.commentCount : ""} Comments</h4>
                {commentData.map((item, index) => {
                    return (
                        <div key={index} className="comment">
                            <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                            <div>
                                <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>{moment(item.snippet.updatedAt).fromNow()}</span></h3>
                                <p>{item.snippet.topLevelComment.snippet.textOriginal}</p>
                                <div className="comment-action">
                                    <img src={like} alt="" />
                                    <span>{item.snippet.topLevelComment.snippet.likeCount}</span>
                                    <img src={dislike} alt="" />
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default PlayVideo