import React from "react";

interface Videosprops {
  videos: any;
}
const Videos: React.FC<Videosprops> = ({ videos }) => {
  console.log(videos);
  return <div>Videos</div>;
};

export default Videos;
