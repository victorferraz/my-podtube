import { Stream } from 'stream';
import  ytdl from 'ytdl-core';
import { VideoDetails } from './type';

export default class YoutubeDownload {
  constructor(){
  }

  async getThumb(videoUrl: string){
    try {
      const res = await ytdl.getInfo(videoUrl);
      return {
        thumb: res.player_response.videoDetails.thumbnail.thumbnails.pop()
      };
    } catch(e){
      console.log(e);
    }
  }

  async getVideDetails(videoUrl: string): Promise<VideoDetails> {
    try{
      const res = await ytdl.getInfo(videoUrl);
      const formats:any =  res.player_response.streamingData.adaptiveFormats[res.player_response.streamingData.adaptiveFormats.length - 1];
      return {
        formats
      }
    } catch(e) {
      console.log(e);
    }
  }

  async getVideoSize(url: string):Promise<number> {
    try {
      const videoDetails = await this.getVideDetails(url);
      const total = videoDetails.formats.contentLength;
      return total;
    } catch (e){
      console.log(e);
    }
  }

  async getVideoRange(url:string, headerRange): Promise<{contentLength: number, end: number, start: number, total: number}> {
    const range = headerRange || 0;
    const total = await this.getVideoSize(url);
    const CHUNK_SIZE = 50485760;
    const start = range === 0 ? range : Number(range.replace(/\D/g, ''));
    const end = Math.min(start + CHUNK_SIZE, total - 1);
    const contentLength = end - start + 1;
    return { contentLength, end, start, total};
  }

  createStreams(videoUrl: string, start, end): Stream {
    return ytdl(videoUrl, { filter: "audioonly",range:{start, end} } )
  }
}
