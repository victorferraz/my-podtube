
export interface VideoFormat{
  mimeType: string,
  bitrate: number,
  initRange: { start: string, end: string },
  indexRange: { start: string, end: string },
  lastModified: string,
  contentLength: number,
  quality: Quality,
  projectionType: string,
  averageBitrate: number,
  audioQuality: 'AUDIO_QUALITY_LOW' | 'AUDIO_QUALITY_MEDIUM',
  approxDurationMs: string,
  audioSampleRate: string,
  audioChannels: number,
  loudnessDb: number
}

export interface VideoDetails{
  formats: VideoFormat
}

export type Quality =  'tiny' | 'small' | 'medium' | 'large' | 'hd720' | 'hd1080' | 'hd1440' | 'hd2160' | 'highres' | string;
