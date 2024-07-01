import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-ma-citas',
  templateUrl: './ma-citas.component.html',
  styleUrls: ['./ma-citas.component.css']
})
export class MaCitasComponent implements OnInit {

  constructor(private elementRef: ElementRef) { }

  calendar = this.elementRef.nativeElement.querySelector(".calendar");
  date = this.elementRef.nativeElement.querySelector(".date");
  daysContainer = this.elementRef.nativeElement.querySelector(".days");
  prev = this.elementRef.nativeElement.querySelector(".prev");
  next = this.elementRef.nativeElement.querySelector(".next");
  todayBtn = this.elementRef.nativeElement.querySelector(".today-btn");
  gotoBtn = this.elementRef.nativeElement.querySelector(".goto-btn");
  dateInput = this.elementRef.nativeElement.querySelector(".date-input");
  eventDay = this.elementRef.nativeElement.querySelector(".event-day");
  eventDate = this.elementRef.nativeElement.querySelector(".event-date");
  eventsContainer = this.elementRef.nativeElement.querySelector(".events");
  addEventBtn = this.elementRef.nativeElement.querySelector(".add-event");
  addEventWrapper = this.elementRef.nativeElement.querySelector(".add-event-wrapper ");
  addEventCloseBtn = this.elementRef.nativeElement.querySelector(".close ");
  addEventTitle = this.elementRef.nativeElement.querySelector(".event-name ");
  addEventFrom = this.elementRef.nativeElement.querySelector(".event-time-from ");
  addEventTo = this.elementRef.nativeElement.querySelector(".event-time-to ");
  addEventSubmit = this.elementRef.nativeElement.querySelector(".add-event-btn ");

  today: Date = new Date();
  activeDay: any;
  month = this.today.getMonth();
  year = this.today.getFullYear();

  eventsArr:any [] = [];
  months:any[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // const eventsArr = [
  //   {
  //     day: 13,
  //     month: 11,
  //     year: 2022,
  //     events: [
  //       {
  //         title: "Event 1 lorem ipsun dolar sit genfa tersd dsad ",
  //         time: "10:00 AM",
  //       },
  //       {
  //         title: "Event 2",
  //         time: "11:00 AM",
  //       },
  //     ],
  //   },
  // ];



  ngOnInit(): void {
    this.calendar = this.elementRef.nativeElement.querySelector(".calendar");
    this.date = this.elementRef.nativeElement.querySelector(".date");
    this.daysContainer = this.elementRef.nativeElement.querySelector(".days");
    this.prev = this.elementRef.nativeElement.querySelector(".prev");
    this.next = this.elementRef.nativeElement.querySelector(".next");
    this.todayBtn = this.elementRef.nativeElement.querySelector(".today-btn");
    this.gotoBtn = this.elementRef.nativeElement.querySelector(".goto-btn");
    this.dateInput = this.elementRef.nativeElement.querySelector(".date-input");
    this.eventDay = this.elementRef.nativeElement.querySelector(".event-day");
    this.eventDate = this.elementRef.nativeElement.querySelector(".event-date");
    this.eventsContainer = this.elementRef.nativeElement.querySelector(".events");
    this.addEventBtn = this.elementRef.nativeElement.querySelector(".add-event");
    this.addEventWrapper = this.elementRef.nativeElement.querySelector(".add-event-wrapper ");
    this.addEventCloseBtn = this.elementRef.nativeElement.querySelector(".close ");
    this.addEventTitle = this.elementRef.nativeElement.querySelector(".event-name ");
    this.addEventFrom = this.elementRef.nativeElement.querySelector(".event-time-from ");
    this.addEventTo = this.elementRef.nativeElement.querySelector(".event-time-to ");
    this.addEventSubmit = this.elementRef.nativeElement.querySelector(".add-event-btn ");

    this.today= new Date();
    this.month = this.today.getMonth();
    this.year = this.today.getFullYear();

    this.eventsArr= [];
    this.months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    this.getEvents();
    console.log(this.eventsArr);

    this.prev.addEventListener("click", ()=>{this.prevMonth()});
    this.next.addEventListener("click", ()=>{this.nextMonth()});
  
    this.initCalendar();

    //to add event
    this.addEventBtn.addEventListener("click", () => {
      this.addEventWrapper.classList.toggle("active");
    });

    this.addEventCloseBtn.addEventListener("click", () => {
      this.addEventWrapper.classList.remove("active");
    });
    
    document.addEventListener("click", (e:MouseEvent) => {
      if ((e.target as HTMLElement) !== this.addEventBtn && !this.addEventWrapper.contains((e.target as HTMLElement))) {
        this.addEventWrapper.classList.remove("active");
      }
    });

    this.gotoBtn.addEventListener("click",()=>{this.gotoDate()});
    
    this.todayBtn.addEventListener("click", () => {
      this.today = new Date();
      this.month = this.today.getMonth();
      this.year = this.today.getFullYear();
      this.initCalendar();
    });
  
    this.dateInput.addEventListener("input", (e:MouseEvent) => {
      //let target = e.target as HTMLElement;
      this.dateInput.value = this.dateInput.value.replace(/[^0-9/]/g, "");
      if (this.dateInput.value.length === 2) {
        this.dateInput.value += "/";
      }
      if (this.dateInput.value.length > 7) {
        this.dateInput.value = this.dateInput.value.slice(0, 7);
      }
      if (e.type === "deleteContentBackward") {
        if (this.dateInput.value.length === 3) {
          this.dateInput.value = this.dateInput.value.slice(0, 2);
        }
      }
    });

    //allow 50 chars in eventtitle
    this.addEventTitle.addEventListener("input", (e:MouseEvent) => {
      this.addEventTitle.value = this.addEventTitle.value.slice(0, 60);
    });

    //allow only time in eventtime from and to
    this.addEventFrom.addEventListener("input", (e:MouseEvent) => {
      this.addEventFrom.value = this.addEventFrom.value.replace(/[^0-9:]/g, "");
      if (this.addEventFrom.value.length === 2) {
        this.addEventFrom.value += ":";
      }
      if (this.addEventFrom.value.length > 5) {
        this.addEventFrom.value = this.addEventFrom.value.slice(0, 5);
      }
    });
  
    this.addEventTo.addEventListener("input", (e:MouseEvent) => {
      this.addEventTo.value = this.addEventTo.value.replace(/[^0-9:]/g, "");
      if (this.addEventTo.value.length === 2) {
        this.addEventTo.value += ":";
      }
      if (this.addEventTo.value.length > 5) {
        this.addEventTo.value = this.addEventTo.value.slice(0, 5);
      }
    });
  
    //to add event to eventsArr
    this.addEventSubmit.addEventListener("click", () => {
      const eventTitle = this.addEventTitle.value;
      const eventTimeFrom = this.addEventFrom.value;
      const eventTimeTo = this.addEventTo.value;
      if (eventTitle === "" || eventTimeFrom === "" || eventTimeTo === "") {
        alert("Please fill all the fields");
        return;
      }
  
      //check correct time format 24 hour
      const timeFromArr = eventTimeFrom.split(":");
      const timeToArr = eventTimeTo.split(":");
      if (
        timeFromArr.length !== 2 ||
        timeToArr.length !== 2 ||
        timeFromArr[0] > 23 ||
        timeFromArr[1] > 59 ||
        timeToArr[0] > 23 ||
        timeToArr[1] > 59
      ) {
        alert("Invalid Time Format");
        return;
      }
  
      const timeFrom = this.convertTime(eventTimeFrom);
      const timeTo = this.convertTime(eventTimeTo);
  
      //check if event is already added
      let eventExist = false;
      this.eventsArr.forEach((event:any) => {
        if (
          event.day === this.activeDay &&
          event.month === this.month + 1 &&
          event.year === this.year
        ) {
          event.events.forEach((event:any) => {
            if (event.title === eventTitle) {
              eventExist = true;
            }
          });
        }
      });
      if (eventExist) {
        alert("Event already added");
        return;
      }
      const newEvent = {
        title: eventTitle,
        time: timeFrom + " - " + timeTo,
      };
      console.log(newEvent);
      console.log(this.activeDay);
      let eventAdded = false;
      if (this.eventsArr.length > 0) {
        this.eventsArr.forEach((item:any) => {
          if (
            item.day === this.activeDay &&
            item.month === this.month + 1 &&
            item.year === this.year
          ) {
            item.events.push(newEvent);
            eventAdded = true;
          }
        });
      }
  
      if (!eventAdded) {
        this.eventsArr.push({
          day: this.activeDay,
          month: this.month + 1,
          year: this.year,
          events: [newEvent],
        });
      }
  
      console.log(this.eventsArr);
      this.addEventWrapper.classList.remove("active");
      this.addEventTitle.value = "";
      this.addEventFrom.value = "";
      this.addEventTo.value = "";
      this.updateEvents(this.activeDay);
      //select active day and add event class if not added
      const activeDayEl = this.elementRef.nativeElement.querySelector(".day.active");
      if (!activeDayEl.classList.contains("event")) {
        activeDayEl.classList.add("event");
      }
  
      this.initCalendar();
    });
  
    //to delete event when clicked on event
    this.eventsContainer.addEventListener("click", (e:MouseEvent) => {
      let target = e.target as HTMLElement;
      if (target.classList.contains("event")) {
        if (confirm("Are you sure you want to delete this event?")) {
          const eventTitle = target.children[0].children[1].innerHTML;
          this.eventsArr.forEach((event:any) => {
            if (
              event.day === this.activeDay &&
              event.month === this.month + 1 &&
              event.year === this.year
            ) {
              event.events.forEach((item:any, index:any) => {
                if (item.title === eventTitle) {
                  event.events.splice(index, 1);
                }
              });
              //if no events left in a day then remove that day from eventsArr
              if (event.events.length === 0) {
                this.eventsArr.splice(this.eventsArr.indexOf(event), 1);
                //remove event class from day
                const activeDayEl = this.elementRef.nativeElement.querySelector(".day.active");
                if (activeDayEl.classList.contains("event")) {
                  activeDayEl.classList.remove("event");
                }
              }
            }
          });
          this.updateEvents(this.activeDay);
        }
      }
    });

    this.defineProperty();
  }


  //to add days in days with class day and prev-date next-date on previous month and next month days and active on today
  initCalendar() {
    const firstDay = new Date(this.year, this.month, 1);
    const lastDay = new Date(this.year, this.month + 1, 0);
    const prevLastDay = new Date(this.year, this.month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    this.date.innerHTML = this.months[this.month] + " " + this.year;

    let days = "";

    for (let x = day; x > 0; x--) {
      days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
    }

    for (let i = 1; i <= lastDate; i++) {
      //check if event is present on that day
      let event = false;
      this.eventsArr.forEach((eventObj:any) => {
        if (
          eventObj.day === i &&
          eventObj.month === this.month + 1 &&
          eventObj.year === this.year
        ) {
          event = true;
        }
      });
      if (
        i === new Date().getDate() &&
        this.year === new Date().getFullYear() &&
        this.month === new Date().getMonth()
      ) {
        this.activeDay = i;
        this.getActiveDay(i);
        this.updateEvents(i);
        if (event) {
          days += `<div class="day today active event">${i}</div>`;
        } else {
          days += `<div class="day today active">${i}</div>`;
        }
      } else {
        if (event) {
          days += `<div class="day event">${i}</div>`;
        } else {
          days += `<div class="day ">${i}</div>`;
        }
      }
    }

    for (let j = 1; j <= nextDays; j++) {
      days += `<div class="day next-date">${j}</div>`;
    }
    this.daysContainer.innerHTML = days;
    this.addListner();
  }

  //to add month and year on prev and next button
  prevMonth() {
    this.month--;
    if (this.month < 0) {
      this.month = 11;
      this.year--;
    }
    this.initCalendar();
  }

  nextMonth() {
    this.month++;
    if (this.month > 11) {
      this.month = 0;
      this.year++;
    }
    this.initCalendar();
  }

  //to add active on day
  addListner() {
    const days = this.elementRef.nativeElement.querySelectorAll(".day");
    days.forEach((day:any) => {
      day.addEventListener("click", (e:MouseEvent) => {
        let target = e.target as HTMLElement;
        this.getActiveDay(target.innerHTML);
        this.updateEvents(Number(target.innerHTML));
        this.activeDay = Number(target.innerHTML);
        //remove active
        days.forEach((day:any) => {
          day.classList.remove("active");
        });
        //if clicked prev-date or next-date switch to that month
        if (target.classList.contains("prev-date")) {
          this.prevMonth();
          //add active to clicked day afte month is change
          setTimeout(() => {
            //add active where no prev-date or next-date
            const days = document.querySelectorAll(".day");
            days.forEach((day) => {
              if (
                !day.classList.contains("prev-date") &&
                day.innerHTML === target.innerHTML
              ) {
                day.classList.add("active");
              }
            });
          }, 100);
        } else if (target.classList.contains("next-date")) {
          this.nextMonth();
          //add active to clicked day afte month is changed
          setTimeout(() => {
            const days = document.querySelectorAll(".day");
            days.forEach((day) => {
              if (
                !day.classList.contains("next-date") &&
                day.innerHTML === target.innerHTML
              ) {
                day.classList.add("active");
              }
            });
          }, 100);
        } else {
          target.classList.add("active");
        }
      });
    });
  }

  gotoDate() {
    console.log("here");
    const dateArr = this.dateInput.value.split("/");
    if (dateArr.length === 2) {
      if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
        this.month = dateArr[0] - 1;
        this.year = dateArr[1];
        this.initCalendar();
        return;
      }
    }
    alert("Invalid Date");
  }

  //get active day day name and date and update eventday eventdate
  getActiveDay(date:any) {
    const day = new Date(this.year, this.month, date);
    const dayName = day.toString().split(" ")[0];
    this.eventDay.innerHTML = dayName;
    this.eventDate.innerHTML = date + " " + this.months[this.month] + " " + this.year;
  }

  // //update events when a day is active
  updateEvents(date:any) {
    let events = "";
    this.eventsArr.forEach((event:any) => {
      if (
        date === event.day &&
        this.month + 1 === event.month &&
        this.year === event.year
      ) {
        event.events.forEach((event:any) => {
          events += `<div class="event">
              <div class="title">
                <i class="fas fa-circle"></i>
                <h3 class="event-title">${event.title}</h3>
              </div>
              <div class="event-time">
                <span class="event-time">${event.time}</span>
              </div>
          </div>`;
        });
      }
    });
    if (events === "") {
      events = `<div class="no-event">
              <h3>No Events</h3>
          </div>`;
    }
    this.eventsContainer.innerHTML = events;
    this.saveEvents();
  }

  defineProperty() {
    var osccred = document.createElement("div");
    osccred.innerHTML =
      "A Project By <a href='https://www.youtube.com/channel/UCiUtBDVaSmMGKxg1HYeK-BQ' target=_blank>Open Source Coding</a>";
    osccred.style.position = "absolute";
    osccred.style.bottom = "0";
    osccred.style.right = "0";
    osccred.style.fontSize = "10px";
    osccred.style.color = "#ccc";
    osccred.style.fontFamily = "sans-serif";
    osccred.style.padding = "5px";
    osccred.style.background = "#fff";
    osccred.style.borderTopLeftRadius = "5px";
    osccred.style.borderBottomRightRadius = "5px";
    osccred.style.boxShadow = "0 0 5px #ccc";
    document.body.appendChild(osccred);
  }

  //to save events in local storage
  saveEvents() {
    localStorage.setItem("events", JSON.stringify(this.eventsArr));
  }

  //to get events from local storage
  getEvents() {
    //check if events are already saved in local storage then return event else nothing
    if (localStorage.getItem("events") === null) {
      return;
    }
    this.eventsArr.push(...JSON.parse(localStorage.getItem("events")!));
  }

  convertTime(time:any) {
    //convert time to 24 hour format
    let timeArr = time.split(":");
    let timeHour = timeArr[0];
    let timeMin = timeArr[1];
    let timeFormat = timeHour >= 12 ? "PM" : "AM";
    timeHour = timeHour % 12 || 12;
    time = timeHour + ":" + timeMin + " " + timeFormat;
    return time;
  }
}

