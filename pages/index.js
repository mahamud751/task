import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styles from "../styles/Home.module.css";
import { Container } from "@mui/system";
import { useState } from "react";
import { FormControl, Modal, OutlinedInput } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { format, addMinutes } from "date-fns";
import Image from "next/image";
import Time from "../components/home/time";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
  border: "none",
  borderRadius: 5,
};
const jsonData = {
  schedule: [
    {
      start: "2023-02-26T02:00:00.020Z",
      end: "2023-02-26T13:00:00.020Z",
    },
    {
      start: "2023-02-27T05:00:00.020Z",
      end: "2023-02-27T16:00:00.020Z",
    },
    {
      start: "2023-02-28T02:00:00.020Z",
      end: "2023-02-28T09:00:00.020Z",
    },
    {
      start: "2023-03-02T02:00:00.020Z",
      end: "2023-03-02T09:00:00.020Z",
    },
  ],
};

export default function Home() {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setShowCalendar(true);
    }
  };

  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const today = new Date();
  const disabledBefore = {
    startDate: today,
  };
  let footer = <p>Please pick a day.</p>;
  if (selectedDate) {
    footer = <p>Date:{format(selectedDate, "PP")},</p>;
  }

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [duration, setDuration] = useState(0);

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
  };

  const handleDurationChange = (e) => {
    setDuration(parseInt(e.target.value));
  };

  const handleBookNowClick = () => {
    setOpen(true);
  };

  const getTimeSlots = (start, end, duration) => {
    const timeSlots = [];

    let currentTime = new Date(start);

    while (currentTime < new Date(end)) {
      timeSlots.push({
        start: format(currentTime, "HH:mm"),
        end: format(addMinutes(currentTime, duration), "HH:mm"),
      });
      currentTime = addMinutes(currentTime, duration);
    }

    return timeSlots;
  };

  return (
    <div className={styles.container}>
      <Container maxWidth="lg">
        <Card
          sx={{
            width: { xs: "100%", md: "75%" },
            my: 10,
          }}
        >
          <CardContent>
            <Time />
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography
                sx={{
                  fontFamily: "DM Sans",
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: "25px",
                  lineHeight: " 42px",
                  color: "#000000",
                }}
              >
                Enter Meeting Duration(min)
              </Typography>
              <FormControl sx={{ width: "10ch", marginLeft: 3 }}>
                <OutlinedInput
                  type="number"
                  onKeyPress={handleEnter}
                  min="1"
                  value={duration}
                  onChange={handleDurationChange}
                />
              </FormControl>
            </Box>

            <Box>
              {showCalendar && (
                <>
                  <Typography
                    sx={{
                      fontFamily: "DM Sans",
                      fontStyle: "normal",
                      fontWeight: "400",
                      fontSize: "25px",
                      lineHeight: " 42px",
                      color: "#000000",
                    }}
                  >
                    Select Date
                  </Typography>
                  <Box sx={{ display: { md: "flex", sm: "inline" } }}>
                    <Box
                      sx={{
                        width: "320px",
                        height: "fit-content",
                      }}
                    >
                      <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        minDate={today}
                        disabled={false}
                        excludeDates={[disabledBefore]}
                        inline
                      />
                      {/* <DayPicker
                        mode="single"
                        disabledDays={(day) => day > new Date()}
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        styles={{
                          caption: { textAlign: "center" },
                          head: {
                            background: "#F25A2C",
                            color: "white",
                            borderRadius: "10px",
                          },
                        }}
                      /> */}
                    </Box>
                    <Box sx={{ mx: 4 }}>
                      <Typography
                        sx={{
                          fontFamily: "DM Sans",
                          fontStyle: "normal",
                          fontWeight: "400",
                          fontSize: "25px",
                          lineHeight: " 42px",
                          color: "#000000",
                        }}
                      >
                        Select Time Slot
                      </Typography>
                      <Box>
                        {jsonData.schedule.map((day, index) => (
                          <>
                            <h3>{`Day ${index + 1}`}</h3>{" "}
                            <Grid container spacing={2} key={index}>
                              {getTimeSlots(day.start, day.end, duration).map(
                                (slot, i) => (
                                  <>
                                    <Grid container spacing={2} key={i}>
                                      <Grid xs={6} md={8}>
                                        <button
                                          key={i}
                                          onClick={() => handleSlotClick(slot)}
                                          className={
                                            selectedSlot === slot
                                              ? "selected"
                                              : ""
                                          }
                                          style={{
                                            width: "105px",
                                            height: "40px",

                                            background: " #FFFFFF",
                                            border:
                                              "1px solid rgba(0, 0, 0, 0.2)",
                                            borderRadius: " 32px",
                                            color: "black",
                                            cursor: "pointer",
                                          }}
                                        >
                                          {slot.start}
                                        </button>
                                      </Grid>
                                    </Grid>
                                  </>
                                )
                              )}
                            </Grid>
                          </>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                  <Box>
                    <FormControl>
                      <OutlinedInput
                        placeholder="Additional Details"
                        sx={{
                          height: "170px",
                          color: "black",
                          background: " #FFFFFF",
                          border: " 1px solid rgba(0, 0, 0, 0.2)",
                          borderRadius: "16px",
                          my: 10,
                          width: { md: "750px", sm: "440px" },
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
                      padding: 2,
                      mb: 10,
                    }}
                    onClick={handleBookNowClick}
                    disabled={!selectedSlot}
                  >
                    Book now
                  </Button>
                </>
              )}
              {open && (
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Image
                      src={"/assets/img/Vector (2).png"}
                      alt="vector"
                      width={100}
                      height={100}
                    />
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                      sx={{
                        fontFamily: "ABeeZee",
                        fontStyle: "italic",
                        fontWeight: "400",
                        fontSize: "40px",
                        lineHeight: "48px",
                        color: "#000000",
                      }}
                    >
                      Great
                    </Typography>
                    <Typography
                      id="modal-modal-title"
                      variant="subtitle2"
                      component="h2"
                    >
                      Your Booked Time
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Typography
                        id="modal-modal-title"
                        variant="subtitle2"
                        component="h2"
                      >
                        {footer}
                      </Typography>
                      <Typography
                        id="modal-modal-title"
                        variant="subtitle2"
                        component="h2"
                        sx={{
                          mt: 1.7,
                        }}
                      >
                        Time:{selectedSlot.start}
                      </Typography>
                    </Box>
                  </Box>
                </Modal>
              )}
            </Box>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
