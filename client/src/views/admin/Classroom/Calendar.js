import React, { useState } from "react";
import "./Calendar.css";
import Calendar from "react-calendar";
import Header from "../../../components/Headers/Header.js";
import "react-calendar/dist/Calendar.css";
import {
  CalendarComponent,
  ChangedEventArgs,
} from "@syncfusion/ej2-react-calendars";

function CalendarView() {
  const [values, onChange] = useState(new Date());

  const changeDate = (value, event) => {
    const selectedDate = value.value.toLocaleString().split(",")[0];
    let dateArr = selectedDate.split("/");
    const formattedDate = dateArr[2] + "/" + dateArr[1] + "/" + dateArr[0];
    console.log(formattedDate);
  };

  return (
    <div>
      <Header />
      <CalendarComponent change={changeDate}></CalendarComponent>
    </div>
  );
}

export default CalendarView;
