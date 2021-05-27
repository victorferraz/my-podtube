import * as Ui from './ui';
import Heading from '../../components/Heading';
import Input from '../../components/Input';
import Button from '../../components/Button';
import React, { useState, useEffect } from 'react';
import YoutubeDownload from '../../lib/video/';

import { VideoDetails } from '../../lib/video/type';

const Home = () => {

  const youtubeDownload = new YoutubeDownload();
  const [video, setVideo] = useState('');
  const [videoDetail, setVideoDetail] = useState<any>();

  async function requestVideoDetail() {
    try {
      const urlParams = new URLSearchParams(video);
      const videoId =  video.replace('https://www.youtube.com/watch?v=', '');
      const resp = await fetch(`/api/videoDetail/${videoId}`);
      const videoData = await resp.json();
      setVideoDetail(videoData);
    } catch(e){
      console.log(e);
    }
  }

  const videoUpdate = (e:React.ChangeEvent<HTMLInputElement>) => {
    requestVideoDetail();
    setVideo(e.target.value)
  }

  return (
    <Ui.Wrapper>
      <Ui.Main>
        <Heading>
          Informe aqui a Url <br />do seu Video
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
