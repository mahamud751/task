import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styles from "../styles/Home.module.css";
import { Container } from "@mui/system";
import { useState, useEffect } from "react";
import { FormControl, OutlinedInput } from "@mui/material";
import { DayPicker } from "react-day-picker";
import { format, addMinutes, startOfDay } from "date-fns";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { experimentalStyled as styled } from "@mui/material/styles";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Home() {
  const [time, setTime] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setShowCalendar(true);
    }
  };

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
  };

  const timeSlots = [
    { start: "9:00 AM", end: "10:00 AM" },
    { start: "10:00 AM", end: "11:00 AM" },
    { start: "11:00 AM", end: "12:00 PM" },
    { start: "12:00 PM", end: "1:00 PM" },
    { start: "1:00 PM", end: "2:00 PM" },
    { start: "2:00 PM", end: "3:00 PM" },
    { start: "3:00 PM", end: "4:00 PM" },
    { start: "4:00 PM", end: "5:00 PM" },
  ];

  return (
    <div className={styles.container}>
      <Container>
        <Card
          sx={{
            width: { xs: "100%", md: "75%" },
            my: 10,
          }}
        >
          <CardContent>
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

              /* identical to box height, or 140% */
            >
              Time Now: {`${hours}:${minutes}`}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography
                sx={{
                  fontFamily: "DM Sans",
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: "25px",
                  lineHeight: " 42px",
                  /* or 168% */

                  color: "#000000",
                }}
              >
                Enter Meeting Duration(min)
              </Typography>
              <FormControl sx={{ width: "10ch", marginLeft: 3 }}>
                <OutlinedInput type="number" onKeyPress={handleEnter} />
              </FormControl>
            </Box>

            <Box sx={{ p: 5 }}>
              <Typography
                sx={{
                  fontFamily: "DM Sans",
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: "25px",
                  lineHeight: " 42px",
                  /* or 168% */

                  color: "#000000",
                }}
              >
                Select Date
              </Typography>

              {showCalendar && (
                <>
                  <Box sx={{ display: "flex" }}>
                    <Box sx={{ border: "1px solid black", width: "320px" }}>
                      <DayPicker
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                      />
                    </Box>
                    <Box sx={{ mx: 4 }}>
                      <Typography
                        sx={{
                          fontFamily: "DM Sans",
                          fontStyle: "normal",
                          fontWeight: "400",
                          fontSize: "25px",
                          lineHeight: " 42px",
                          /* or 168% */

                          color: "#000000",
                        }}
                      >
                        Select Time Slot
                      </Typography>
                      <Grid
                        container
                        spacing={{ xs: 2, md: 3 }}
                        columns={{ xs: 4, sm: 8, md: 12 }}
                      >
                        {timeSlots.map((slot, index) => (
                          <Grid xs={2} sm={4} md={4} key={index}>
                            {" "}
                            <button
                              key={slot.start}
                              style={{
                                width: "105px",
                                height: "40px",

                                background: " #FFFFFF",
                                border: "1px solid rgba(0, 0, 0, 0.2)",
                                borderRadius: " 32px",
                                color: "black",
                              }}
                            >
                              {slot.start}
                            </button>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </Box>
                  <Box>
                    <FormControl>
                      <OutlinedInput
                        placeholder="Additional Details"
                        sx={{
                          width: "716px",
                          height: "170px",
                          color: "black",
                          background: " #FFFFFF",
                          border: " 1px solid rgba(0, 0, 0, 0.2)",
                          borderRadius: "16px",
                          my: 10,
                        }}
                      />
                    </FormControl>
                  </Box>
                  <Button
                    sx={{
                      background: "#039800",
                      borderRadius: "32px",
                      fontFamily: "Gabriela",
                      fontStyle: "normal",
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "24px",
                      color: "#FFFFFF",
                      width: "111px",
                      textTransform: "initial",
                      float: "right",
                      mb: 10,
                    }}
                    onClick={() => handleTimeSelection(slot)}
                  >
                    Book now
                  </Button>
                </>
              )}
              {selectedTime && (
                <div>
                  <p>
                    You have selected: {selectedTime.start} - {selectedTime.end}
                  </p>
                  <button>Book Now</button>
                </div>
              )}
            </Box>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
