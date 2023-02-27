import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styles from "../styles/Home.module.css";
import { Container } from "@mui/system";
import { useState, useEffect } from "react";
import { FormControl, Modal, OutlinedInput } from "@mui/material";

import Grid from "@mui/material/Unstable_Grid2";
import {
  format,
  addMinutes,
  startOfDay,
  endOfDay,
  differenceInMinutes,
} from "date-fns";
import { DayPicker } from "react-day-picker";
import Image from "next/image";
import Time from "../components/home/time";
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
    { start: "08:00", end: "12:00" },
    { start: "13:00", end: "17:00" },
    { start: "18:00", end: "22:00" },
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
  let footer = <p>Please pick a day.</p>;
  if (selectedDate) {
    footer = <p>Date:{format(selectedDate, "PP")},</p>;
  }
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [duration, setDuration] = useState(0);

  const slots = [];
  const slotDuration = duration;
  const slotInterval = 40;

  jsonData.schedule.forEach((slot) => {
    const start = new Date(
      `${format(selectedDay, "yyyy-MM-dd")}T${slot.start}:00`
    );
    const end = new Date(`${format(selectedDay, "yyyy-MM-dd")}T${slot.end}:00`);

    let current = startOfDay(start);
    const endOfDayDate = endOfDay(start);
    while (current <= endOfDayDate) {
      const slotEnd = addMinutes(current, slotDuration);
      if (
        slotEnd <= end &&
        differenceInMinutes(slotEnd, current) >= slotInterval
      ) {
        slots.push({
          start: current,
          end: slotEnd,
        });
      }
      current = addMinutes(current, slotInterval);
    }
  });

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
  };

  const handleDurationChange = (e) => {
    setDuration(parseInt(e.target.value));
  };

  const handleBookNowClick = () => {
    setOpen(true);
  };

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
            <Time />
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
                <OutlinedInput
                  type="number"
                  onKeyPress={handleEnter}
                  min="1"
                  value={duration}
                  onChange={handleDurationChange}
                />
              </FormControl>
            </Box>

            <Box sx={{ p: 5 }}>
              {showCalendar && (
                <>
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
                  <Box sx={{ display: "flex" }}>
                    <Box sx={{ border: "1px solid black", width: "320px" }}>
                      <DayPicker
                        mode="single"
                        disabledDays={{ before: new Date() }}
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
                        {slots.map((slot, index) => (
                          <Grid xs={2} sm={4} md={4} key={index}>
                            {" "}
                            <button
                              key={slot.start.toISOString()}
                              onClick={() => handleSlotClick(slot)}
                              className={
                                selectedSlot === slot ? "selected" : ""
                              }
                              style={{
                                width: "105px",
                                height: "40px",

                                background: " #FFFFFF",
                                border: "1px solid rgba(0, 0, 0, 0.2)",
                                borderRadius: " 32px",
                                color: "black",
                              }}
                            >
                              {format(slot.start, "h:mm a")}
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
                    onClick={handleBookNowClick}
                    disabled={!selectedSlot}
                  >
                    Book now
                  </Button>
                </>
              )}
              <div>
                {/* <Button onClick={handleOpen}>Open modal</Button> */}
              </div>
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
                        /* identical to box height, or 120% */

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
                        Time:{format(selectedSlot.start, "h:mm a")}
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
