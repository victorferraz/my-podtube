import Video from '../../../lib/video';
const video = new Video();

export default async (req, res) => {
  const { videoId } = req.query;
  const url = `https://www.youtube.com/watch?v=${videoId}`;
  const range = req.headers.range || 0;
  try{
    const { start, end, total, contentLength} = await video.getVideoRange(url, range);
    const headers = {
      'Content-Range': `bytes ${start}-${end}/${total}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': contentLength,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(206, headers);
    const data = video.createStreams(url, start, end)
    data.pipe(res);
  } catch(e){
    console.log(e);
  }
}
