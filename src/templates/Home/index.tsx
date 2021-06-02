import * as Ui from './ui';
import Heading from '../../components/Heading';
import Input from '../../components/Input';
import React, { useState, useEffect } from 'react';
import YoutubeDownload from '../../lib/video/';
import  ytdl, { thumbnail } from 'ytdl-core';

const Home = () => {

  const youtubeDownload = new YoutubeDownload();
  const [video, setVideo] = useState('');
  const [videoDetail, setVideoDetail] = useState<{ thumb: thumbnail }>();

  async function requestVideoDetail() {
    try {
      const videoId =  video.replace('https://www.youtube.com/watch?v=', '');
      setVideo(videoId)
      if (videoId){
        const resp = await fetch(`/api/videoDetail/${videoId}`);
        const videoData = await resp.json();
        setVideoDetail(videoData);
      }
    } catch(e){
      console.log(e);
    }
  }

  useEffect(() => {
    requestVideoDetail();
  }, [video]);

  const videoUpdate = (e:React.ChangeEvent<HTMLInputElement>) => {
    setVideo(e.target.value)
  }

  return (
    <Ui.Wrapper>
      <Ui.Main>
        <Heading>
          Listen your youtube videos without ads
        </Heading>
        <form>
          <Ui.VideoSearchWrapper>
            <Input onChange={videoUpdate} placeholder="https://www.youtube.com/watch?v=bUE3e..." />
          </Ui.VideoSearchWrapper>
        </form>
        <Ui.VideoContainer>
          {
            video && videoDetail &&
              <div>
                <Ui.Video poster={`${videoDetail.thumb.url}`} id="videoPlayer" width="650" controls preload="true">
                  <source src={`/api/video/${video}`} type="video/mp4" />
                </Ui.Video>
              </div>
          }
        </Ui.VideoContainer>
      </Ui.Main>
    </Ui.Wrapper>
  );
}


export default Home;
