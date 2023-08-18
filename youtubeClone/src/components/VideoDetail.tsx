import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";

import { fetchFromAPI } from "../utils/FetchFromAPI";
import { CheckCircle } from "@mui/icons-material";

interface SnippetData {
  title: string;
  channelId: string | number;
  channelTitle: string | number;
}

interface StatisticsData {
  viewCount: any;
  likeCount: any;
}

interface VideoDetailData {
  snippet: SnippetData;
  statistics: StatisticsData;
}

const VideoDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [videoDetail, setVideoDetail] = useState<VideoDetailData | null>(null);

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) => {
      if (data.items && data.items.length > 0) {
        setVideoDetail(data.items[0]);
      }
    });
  }, [id]);

  if (!videoDetail?.snippet) return <div>Loading...</div>;

  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetail;

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />
            <Typography
              variant="h5"
              fontWeight="bold"
              color="#fff"
              sx={{
                mt: 2,
                typography: {
                  sm: "subtitle1",
                  md: "h6",
                },
              }}
            >
              {title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: "#fff" }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${channelId}`}>
                <Typography
                  variant="h6"
                  color="#fff"
                  sx={{
                    typography: {
                      sm: "subtitle1",
                      md: "h6",
                    },
                  }}
                >
                  {channelTitle}
                  <CheckCircle
                    sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                  />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} Görüntülenme
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} Beğeni
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
