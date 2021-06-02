import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 50px 0;
  background-color: #1d217c;
  height: 100%;
  width: 100%;
`;

const Main = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
`;

const VideoSearchWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 0 auto;
`;

const Video = styled.video`
  height: 280px;
  width: 100%;
`

const VideoContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 40px 0;
`

export {
  Main,
  Video,
  Wrapper,
  VideoSearchWrapper,
  VideoContainer
}
