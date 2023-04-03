import { useState } from 'react';
import Banner from "./Banner.js";
import Location from "./Location.js";
import BookingForm from "./BookingForm.js";
import ResConfirmation from "./ResConfirmation.js"

const banner = {
    heading: "Reserve a Table",
    subHeading: "Skip the wait and get seated immediately by booking in advance",
    getImageSrc: () => require("../Assets/slide3.jpg"),
    CN: "banner resBanner"
}

const Reserve = () => {
    const [llLocation, setLLLocation] = useState('wl')
    const [resDetails, setResDetails] = useState(null)

    return (
        <main>
            {resDetails === null ?
            <>
                <Banner
                title={banner.heading}
                subtitle={banner.subHeading}
                image={banner.getImageSrc()}
                CN={banner.CN}
                />
                <Location setLocation={setLLLocation}/>
                <BookingForm setDetails={setResDetails} loc={llLocation}/>
            </>
            :
            <ResConfirmation details={resDetails}/>
            }
        </main>
    )
}

export default Reserve;