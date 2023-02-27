import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const Time = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = time.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return (
    <Box>
      <Typography
        sx={{
          fontSize: 14,
          fontFamily: "DM Sans",
          fontStyle: "normal",
          fontWeight: "700",
          fontSize: "30px",
          lineHeight: "42px",
          textAlign: "center",

          color: "#000000",
        }}
        color="text.secondary"
        gutterBottom
      >
        Time Now: {formattedTime}
      </Typography>
    </Box>
  );
};

export default Time;
