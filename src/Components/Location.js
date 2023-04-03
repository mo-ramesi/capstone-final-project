import { useState, useEffect, useRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const locationData = [
    {
        name: "West Loop",
        address: "501 S. Halsted St. <br> Chicago, Illinois, <br> USA",
        number: 0,
        getImageSrc: () => require("../Assets/WestLoop.jpg"),
        mapFrame: <iframe title="West Loop" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7419.205695117412!2d-87.63912332169406!3d41.52290648936322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e193c28b5aae5%3A0x1e34892c77e311ca!2s501%20S%20Halsted%20St%2C%20Chicago%20Heights%2C%20IL%2060411%2C%20USA!5e0!3m2!1sen!2sca!4v1678595088884!5m2!1sen!2sca"></iframe>,
        details: "Not only is the West Loop venue the original Little Lemon, it is also the largest Little Lemon venue in the world! Our upstairs and outdoor seating sections give plenty of space for large groups and private celebrations!",
        classes: ["locOption loc1", "wl_info"],
        llLocation: "wl",
        style: 0
    },
    {
        name: "Gold Coast",
        address: "44 E. Walton St. <br> Chicago, Illinois, <br> USA",
        number: 1,
        getImageSrc: () => require("../Assets/GoldCoast.jpg"),
        mapFrame: <iframe title="Gold Coast" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.6645596939047!2d-87.63121106785714!3d41.900070605563734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd35227c381b7%3A0x19913f126c3b623f!2s44%20E%20Walton%20St%2C%20Chicago%2C%20IL%2060611%2C%20USA!5e0!3m2!1sen!2sca!4v1678595790481!5m2!1sen!2sca"></iframe>,
        details: "Our Gold Cost venue is definitely our most picturesque venue in Chicago. If you love to eat amazing food while being besmerized by incredible views of the water, you will absolutely love this venue!",
        classes: ["locOption loc2", "gc_info"],
        llLocation: "gc",
        style: 1
    },
    {
        name: "Lincoln Park",
        address: "1729 N. Clark St. <br> Chicago, Illinois, <br> USA",
        number: 2,
        getImageSrc: () => require("../Assets/LPark.jpg"),
        mapFrame: <iframe title="Lincoln Park" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.04030837833!2d-87.63523478255615!3d41.9134922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd34225afe961%3A0x87dc3b06c7513eba!2s1729%20N%20Clark%20St%2C%20Chicago%2C%20IL%2060614%2C%20USA!5e0!3m2!1sen!2sca!4v1678595856471!5m2!1sen!2sca"></iframe>,
        details: "Located on the north side of Chicago, this Little Lemon venue has a beautiful view of Chicago's historic Lincoln Park. If you love being righ between nature and the city, this is the venue for you!",
        classes: ["locOption loc3", "lp_info"],
        llLocation: "lp",
        style: 2
    }
]

const bg = (nm) => {
    return (
        {background: `url('${locationData[nm].getImageSrc()}') no-repeat 0% 70%`}
)}
const delay = (idx) => {
    return {transitionDelay: `${idx} * 200`}
}


const DisplayLocation = ({onFlip, index}) => {
    return (
        <div className="locContain">
            <div className="gMap">
                {locationData[index].mapFrame}
            </div>
            <div className="locInfo">
                <h3>Location:</h3>
                <h2>{locationData[index].name}</h2>
                <div>
                    {locationData[index].address.split('<br>').map((address, i) => <p key={i}>{address}</p>)}
                </div>
                <button className="lgButton" onClick={onFlip}>Change Location</button>
            </div>
        </div>
    )
}


const SelectLocation = ({changeNum, onUnflip}) => {
    let tracker = {one: 0, two: 0, three: 0}
    const tracker_vals = ["one", "two", "three"]

    const reveal = (thing) => {
        const hovers = {
            wl: document.querySelector(".loc1"),
            gc: document.querySelector(".loc2"),
            lp: document.querySelector(".loc3"),
            show1: document.querySelector(".wl_info"),
            show2: document.querySelector(".gc_info"),
            show3: document.querySelector(".lp_info")
        }
        const shows = [hovers.show1, hovers.show2, hovers.show3]

        shows[thing].classList.add("active")
        tracker[tracker_vals[thing]] += 1
        Object.keys(tracker).forEach((key, i) => {
            if (i !== thing && tracker[key] > 0) {
                shows[i].classList.remove("active")
                tracker[tracker_vals[i]] = 0
            }
        })
    }

    return (
        <div className="selectLoc">
            <div className="locOptions">
                <TransitionGroup appear>
                    {locationData.map((place, i) => (
                        <CSSTransition
                          key={i}
                          timeout={{enter: 400 + i * 200}}
                          classNames="stagger1"
                        >
                            <div style={delay(i)} onMouseOver={() => reveal(place.number)} className={place.classes[0]}>
                                <h2>{place.name}</h2>
                                <button className="medButton" onClick={() => {
                                    changeNum(place.number)
                                    onUnflip()
                                    }}
                                    >
                                    Select
                                </button>
                            </div>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </div>
            <div className="locDetails">
                {locationData.map((info, i) => (
                    <div key={i} className={info.classes[1]}>
                        <h2>{info.name}</h2>
                        {info.address.split('<br>').map((address, i) => <h3 key={i}>{address}</h3>)}
                        <p>{info.details}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}


const Location = ({setLocation}) => {
    const [flip, setFlip] = useState(false)
    const [num, setNum] = useState(0)
    const [show, setShow] = useState(false)
    const bgNum = useRef(0)

    useEffect(() => {
        if (flip) {
            const timer = setTimeout(() => {
                setShow(true);
            }, 450)
            return () => clearTimeout(timer)
        } else {
            const timer = setTimeout(() => {
                setShow(false);
            }, 150)
            const timer2 = setTimeout(() => {
                fadeOut();
            }, 50)
            return () => {
                clearTimeout(timer)
                clearTimeout(timer2)
            }
        }
    // eslint-disable-next-line
    }, [flip])

    const fadein = () => {
        const lc = document.querySelector(".locContain")
        const dL = document.querySelector(".displayLoc")
        lc.classList.add("active")
        dL.classList.add("active")
    }
    const fadeOut = () => {
        const lc = document.querySelector(".locContain")
        const dL = document.querySelector(".displayLoc")
        dL.classList.remove("active")
        lc.classList.remove("active")
    }

    useEffect(() => {
        bgNum.current = num
    // eslint-disable-next-line
    }, [flip])

    return (
        <article className="locSection">
            <section className="locCard">
                <div className="locBG"
                style={bg(num)}
                >
                    <div className="bgHide" style={bg(bgNum.current)}>
                        <div className="displayLoc">
                            {!show ?
                            <DisplayLocation
                                onFlip={() => {
                                    setFlip(true)
                                    fadein()
                                }}
                                index={num}
                                />
                            :
                            <SelectLocation
                                changeNum={(x) => setNum(x)}
                                onUnflip={() => {
                                    setFlip(false)
                                    setLocation(locationData[num].llLocation)
                                }}
                            />
                            }
                        </div>
                    </div>
                </div>
            </section>
        </article>
    )
}

export default Location;