import { useContext, useRef, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FormControl, FormErrorMessage, FormLabel, Input, Select } from "@chakra-ui/react";
import CircularProgress from '@mui/material/CircularProgress';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import NavigationContext from '../Context/NavigationContext.js';
import Availability from "./Availability.js"
import useLoad from "../Hooks/useLoad";

const seatingOptions = [
    {option: "No Preference", location: "wl gc lp"},
    {option: "Booth", location: "wl gc lp"},
    {option: "Chairs", location: "wl gc lp"},
    {option: "Bar", location: "wl lp"},
    {option: "Upstairs", location: "wl"},
    {option: "Outside", location: "wl gc"},
]

const BookingForm = ({setDetails, loc}) => {
    const NavCX = useContext(NavigationContext)

    const [guests, setGuests] = useState(2)
    const [resTime, setResTime] = useState(dayjs().set('hour', 9).set('minute', 0))
    const [actualTime, setActualTime] = useState(null)
    const [resDate, setResDate] = useState(dayjs())
    const [available, setAvailable] = useState([])
    const [seat, setSeat] = useState(["No Preference"])
    const [prevSeating, setPrevSeating] = useState({f: "", s: ""})
    const [remove , setRemove] = useState()
    const [add, setAdd] = useState()
    const [replace, setReplace] = useState({guests: [], seating: []})
    const [replaceMode, setReplaceMode] = useState({guests: false, seating: false})
    const [ren, setRen] = useState(0)

    const { loading, timeslots } = useLoad()
    const { getTimeslots } = Availability()

    const guestRef = useRef()

    //  Seating options based on location
    let localSeating = seatingOptions
    const changeSeating = (place) => {
        localSeating = Object.values(seatingOptions).filter(seat => seat.location.includes(loc))
    }

    useEffect(() => {
        changeSeating()
        // eslint-disable-next-line
    }, [loc])


    // Time Option Selection
    const opSelect = (idx) => {
        const opButtons = [
            document.querySelector(".op1"),
            document.querySelector(".op2"),
            document.querySelector(".op3"),
            document.querySelector(".op4"),
            document.querySelector(".op5"),
            document.querySelector(".op6"),
        ]

        opButtons[idx].classList.toggle("active")
        for (let i=0; i<available.length; i++) {
            if (opButtons[i].classList.contains("active") && opButtons[i] !== opButtons[idx]) {
                opButtons[i].classList.remove("active")
            }
        }
    }

    // Formik Initialization
    const formik = useFormik({
        initialValues: {
            date: dayjs(),
            time: dayjs().set('hour', 9).set('minute', 0).set('second', 0).set('millisecond', 0),
            guests: 2,
            fullName: "",
            email: "",
            phone: ""
        },
        onSubmit: (values) => {
            console.log(formik.values.time)
        },
        validationSchema: Yup.object({
            fullName: Yup.string().required("Required"),
            email: Yup.string().email("You must enter a valid email address").required("Required"),
            guests: Yup.number().required('Required'),
            phone: Yup.string().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, "You must enter a valid phone number")
        })
    })

    const guestChange = (e) => {
        setGuests(e.target.value)
    }

    //  onChange functions
    let tVal = "9:00 AM"
    let random = 0
    const changeTime = (t) => {
        let h = t.$H
        let m = t.$m
        let AMPM
        if (t.$H > 12) {
            h = t.$H - 12
            AMPM = " PM"
        } else if (t.$H === 12) {
            AMPM = " PM"
        } else if (t.$H < 12) {
            AMPM = " AM"
        }
        if (t.$H === 0) {
            h = 12
            AMPM = " AM"
        }
        if (m.toString().length < 2) {
            m = "0" + m
        }
        tVal = h + ":" + m + AMPM
        random = Math.max(1, Math.floor(Math.random() * 6));
        setAvailable([...getTimeslots(random, tVal)])
        timeslots()
        setActualTime(null)
    }

    const handleSeating = (e) => {
        setPrevSeating({s: prevSeating.f, f: seat[0]})
        setSeat([e.target.value])
        setRemove(Math.random() * 10)
        setReplaceMode({...replaceMode, seating: true})
    }

    const plus = (e) => {
        e.preventDefault()
        setGuests(Number(guestRef.current.value) + 1)
        if (guests + 1 === 5 || guests + 1 === 7 || guests + 1 === 9) {
            setReplaceMode({...replaceMode, guests: true})
            setRemove(Math.random() * 10)
        }
    }

    const minus = (e) => {
        e.preventDefault()
        setGuests(Math.max(1, (Number(guestRef.current.value) - 1)))
        if (guests + 1 === 4 || guests + 1 === 6 || guests + 1 === 8) {
            setReplaceMode({...replaceMode, guests: true})
            setAdd(Math.random() * 10)
        }
    }

    //  Form submission
    const confirm = (e) => {
        e.preventDefault()
        if (actualTime !== null) {
            setDetails({
                ...formik.values,
                time: actualTime,
                date: formik.values.date.$d,
                fullName: formik.values.fullName + " ",
            })
            NavCX.setHeadFoot(false)
        } else {
            invalidTime()
            tSlct.scrollIntoView({behavior: "smooth", block: "center"})
        }
    }

    const tSlct = document.querySelector(".pTime")

    const invalidTime = () => {
        if (actualTime === null) {
            tSlct.classList.add("invalid")
        } else {
            tSlct.classList.remove("invalid")
        }
    }

    useEffect(() => {
        if (tSlct) {
            invalidTime()
        }
    // eslint-disable-next-line
    }, [actualTime])

    // Handling changes to timeslots
    const handleRemove = () => {
        const chance = Math.floor(Math.random() * 2)
        if (available.length > 1 && chance > 0) {
            const rIndex = Math.max(1, Math.floor(Math.random() * available.length - 1))
            if (replaceMode.guests) {
                setReplace({...replace, guests: [...replace.guests, newAvail[rIndex]]})
                newAvail.splice(rIndex, 1)
                setAvailable(newAvail)
                setReplaceMode({...replaceMode, guests: false})
            } else if (replaceMode.seating && seat[0] !== prevSeating.s) {
                setReplace({...replace, seating: [...replace.seating, newAvail[rIndex]]})
                newAvail.splice(rIndex, 1)
                setAvailable(newAvail)
                setReplaceMode({...replaceMode, seating: false})
            }
        }
    }

    const handleAdd = () => {
        if ((replace.guests && replace.guests.length > 0) || (replace.seating && replace.seating.length > 0)) {
            if (replaceMode.guests) {
                newAvail.push(replace.guests[replace.guests.length - 1])
                setReplace({...replace, guests: replace.guests.slice(0, replace.guests.length - 1)})
                newAvail.sort(function(a, b){return a.id - b.id});
                setAvailable(newAvail)
            } else if (replaceMode.seating && seat[0] === prevSeating.s) {
                newAvail.push(replace.seating[replace.seating.length - 1])
                setReplace({...replace, seating: replace.seating.slice(0, replace.seating.length - 1)})
                newAvail.sort(function(a, b){return a.id - b.id});
                setAvailable(newAvail)
            }
        }
    }

    const timeSet = (time) => {
        if (time === actualTime) {
            setActualTime(null)
        } else {
            setActualTime(time)
        }
    }

    let newAvail = [...available]
    useEffect(() => {
        handleRemove()
        return() => handleRemove()
        // eslint-disable-next-line
    }, [remove])

    useEffect(() => {
        handleAdd()
        return() => handleAdd()
        // eslint-disable-next-line
    }, [add])

    // Generate new timeslots if location or date changes
    useEffect(() => {
        setRen(ren + 1)
        if (ren > 0) {
            changeTime(resTime)
            return () => changeTime(resTime)
        }
        // eslint-disable-next-line
    }, [loc, resDate])

    // checking if the date is valid
    const validDate = !resDate.isBefore(dayjs(), "Day")

    // Showing form errors
    const fields = {
        name: document.querySelector(".FN"),
        email: document.querySelector(".EM"),
        phone: document.querySelector(".PN")
    }

    const inV = () => {
        if (fields.name && fields.email && fields.phone) {
            if (formik.errors.fullName && formik.touched.fullName) {
                fields.name.classList.add("invalid")
            } else {
                fields.name.classList.remove("invalid")
            }
            if (formik.errors.email && formik.touched.email) {
                fields.email.classList.add("invalid")
            } else {
                fields.email.classList.remove("invalid")
            }
            if (formik.errors.phone && formik.touched.phone) {
                fields.phone.classList.add("invalid")
            } else {
                fields.phone.classList.remove("invalid")
            }
        }
    }
    useEffect(() => {
        if (fields.name && fields.email && fields.phone)
        inV()
    // eslint-disable-next-line
    }, [formik.errors])

    return (
        <article className="resFormSection">
            <h2>Reservation Details</h2>
            <form className="resForm" onSubmit={confirm}>
                <section className="form1">
                    <div className="formLeft resPreferences">
                        <h3>Preferences</h3>
                        <FormControl>
                            <FormLabel className="PL" htmlFor="date">Date*</FormLabel>
                            <DatePicker
                              minDate={formik.values.date}
                              className="picker"
                              id="date"
                              name="date"
                              value={formik.values.date}
                              onChange={(newDate) => {setResDate(newDate)}}
                              onBlur={formik.handleBlur}
                            />
                            <FormErrorMessage>{formik.errors.date}</FormErrorMessage>
                        </FormControl>
                        <FormControl>
                            <label className="PL" htmlFor="time">Time*</label>
                            <TimePicker
                              minTime={dayjs().set('hour', 8).set('minute', 59)}
                              maxTime={dayjs().set('hour', 21).set('minute', 30)}
                              className="picker"
                              id="time"
                              data-testid="time"
                              name="time"
                              value={resTime}
                              onChange={(newTime) => {setResTime(newTime)
                            changeTime(newTime)}}
                            />
                            <FormErrorMessage><span className="errMsg">{formik.errors.time}</span></FormErrorMessage>
                        </FormControl>
                        <FormControl
                          isInvalid={formik.errors.guests && formik.touched.guests}
                          isRequired
                        >
                            <FormLabel className="PL" htmlFor="guests">Number of Guests</FormLabel>
                            <span>
                                <button className="guestButton guestLess" onClick={minus}>
                                    <h3>-</h3>
                                </button>
                                <Input
                                  ref={guestRef}
                                  className="numInput"
                                  id="guests"
                                  name="guests"
                                  value={guests}
                                  onChange={guestChange}
                                />
                                <button className="guestButton guestMore" onClick={plus}>
                                    <h3>+</h3>
                                </button>
                            </span>
                            <FormErrorMessage>{formik.errors.guests}</FormErrorMessage>
                        </FormControl>
                        <FormControl>
                            <FormLabel className="PL" htmlFor="seating">Seating</FormLabel>
                            <Select
                              icon={""}
                              className="dropdown"
                              id="seating"
                              name="seating"
                              value={seat[0]}
                              onChange={handleSeating}
                            >
                                {localSeating.map((item, idx) => (
                                    <option key={idx} value={item.option}>{item.option}</option>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="part"></div>
                    <div className="formRight">
                        <div className="resAvailability">
                            <h3>Availablity</h3>
                            <p className="pTime">Please select your preferred time*</p>
                            {loading ?
                            <div className="loader"><CircularProgress className="load" color="primary" /></div>
                            :
                            available.length > 0 && validDate ?
                            <div className="availabilityButtons">
                                {available.map((value) => (
                                    <button aria-label={value.time} key={value.id} className={value.cls} onClick={(e) => {e.preventDefault()
                                    timeSet(value.time)
                                    opSelect(value.id)}}>
                                        <h3>{value.time}</h3>
                                    </button>
                                ))}
                            </div>
                            :
                            !validDate ?
                            <div className="availabilityButtons"><h3>Plese select a valid date</h3></div>
                            :
                            <div className="availabilityButtons"><h3>Please pick a time between 9:00 AM and 9:30 PM</h3></div>
                            }
                        </div>
                        <div className="resAddInfo">
                            <h3>Additional Information</h3>
                            <FormControl>
                                <FormLabel className="PL" htmlFor="addInfo">Special Occasion</FormLabel>
                                <Select
                                  icon={""}
                                  className="dropdown"
                                  id="addInfo"
                                  name="addInfo"
                                  value={formik.values.seating}
                                  onChange={formik.handleChange}
                                >
                                    <option value="none">None</option>
                                    <option value="birthday">Birthday</option>
                                    <option value="engagement">Engagement</option>
                                    <option value="anniversary">Anniversary</option>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                </section>
                <section className="form2">
                    <h2>Contact Details</h2>
                    <FormControl
                      isInvalid={formik.errors.fullName && formik.touched.fullName}
                      isRequired
                    >
                        <FormLabel className="PL2" htmlFor="fullName">Full Name</FormLabel>
                        <Input
                          className="txtInput lgTxt FN"
                          id="fullName"
                          data-testid="fullName"
                          name="fullName"
                          value={formik.values.fullName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <FormErrorMessage>
                            {inV()}
                            <span role="alert" className="errMsg">{formik.errors.fullName}</span>
                        </FormErrorMessage>
                    </FormControl>
                    <div className="row2">
                        <>
                            <FormControl
                              isInvalid={formik.errors.email && formik.touched.email}
                              isRequired
                            >
                                <FormLabel className="PL2" htmlFor="email">Email</FormLabel>
                                <Input
                                  className="txtInput medTxt EM"
                                  id="email"
                                  data-testid="email"
                                  name="email"
                                  value={formik.values.email}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                />
                                <FormErrorMessage>
                                    {inV()}
                                    <span role="alert" className="errMsg">{formik.errors.email}</span>
                                </FormErrorMessage>
                            </FormControl>
                        </>
                        <>
                            <FormControl
                              isInvalid={formik.errors.phone && formik.touched.phone}
                            >
                                <FormLabel className="lastTxt PL2" htmlFor="phone">{"Phone Number (Optional)"}</FormLabel>
                                <Input
                                className="txtInput medTxt PN"
                                id="phone"
                                data-testid="phone"
                                name="phone"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                />
                                <FormErrorMessage>
                                    {inV()}
                                    <span role="alert" className="errMsg">{formik.errors.phone}</span>
                                </FormErrorMessage>
                            </FormControl>
                        </>
                    </div>
                </section>
                <div className="formEnd">
                    <button aria-label="Submit" type="submit" className="lgButton2 sb">
                        Confirm Reservation
                    </button>
                </div>
            </form>
        </article>
    )
}

export default BookingForm;