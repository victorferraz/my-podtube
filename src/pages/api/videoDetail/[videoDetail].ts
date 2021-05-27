import Video from '../../../lib/video';
const video = new Video();

export default async (req, res) => {
  const { videoDetail } = req.query;
  const url = `https://www.youtube.com/watch?v=${videoDetail}`;
  const formats = await video.getThumb(url);
  res.send(formats);
}
