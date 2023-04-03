const Availablity = () => {
    const available = []

    const getTimeslots = (rand, timeInput) => {
        // 5-minute intervals
        const times = ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"]

        // Extract the hour and the minutes from the time input (round miinutes to nearest 5 minutes)
        const hour = Number(timeInput.slice(0, timeInput.indexOf(":")))
        const minutes = Math.round((Number(timeInput.slice(timeInput.indexOf(":") + 1, timeInput.indexOf(" "))) / 10)* 2) / 2 * 10

        // Convert the time into bass 100 (instead of base 60)
        const decTime = hour * 100 + minutes / 60 * 100
        // Variable to determine if the time input is too close to closing time
        const closing = hour > 9 && timeInput.includes("PM")
        const opening = hour === 9 && timeInput.includes("AM")
        const closed = [hour < 9 && timeInput.includes("AM"), hour !== 12 && hour >= 10 && timeInput.includes("PM")]

        // Initialize array for storing timeslot values
        const decs = []

        // Return an empty array if the restaurant is not open
        if (closed[0] || closed[1]) {
            return []
        }

        // Loop to ensure that timeslots are within 30 minutes of the preferred time
        // Return an array of times in base 100
        let i = 0
        while (i < rand) {
            const rand2 = Math.floor(Math.random() * 12)
            if (Math.abs(minutes - Number(times[rand2])) <= 30) {
                const decMins = Math.abs(minutes - Number(times[rand2])) / 60 * 100
                let decVal
                const rand3 = Math.floor(Math.random() * 2)
                if (rand3 === 0 && !closing) {
                    decVal = decTime + decMins
                } else if (opening) {
                    decVal = decTime + decMins
                } else {
                    decVal = decTime - decMins
                }
                if (!decs.some(value => value === decVal)) {
                    decs.push(decVal)
                    i++
                }
            }
        }

        // Sort the outputs so that time options will be in order
        decs.sort(function(a, b){return a - b});

        // Convert times to base 60 and format to look like times
        let index = 0
        for (i of decs) {
            const valH = Math.floor(i / 100)
            const valM = Math.round(((i - valH * 100) / 100) * 60)
            let strM = valM.toString()
            if (strM.length < 2) {
                strM = "0" + strM
            }
            let suffix
            if (hour >= 12 && valH < 12) {
                suffix = " AM"
            } else if (hour < 12 && valH >= 12) {
                suffix = " PM"
            } else {
                suffix = timeInput.slice(timeInput.indexOf(" "))
            }
            available.push({time: valH.toString() + ":" + strM + suffix, id: index, cls: `timeSelect op${index+1}`})
            index++
        }
        return available
    }

    const TimeOption = ({time, func}) => {
        return (
            <button className="timeSelect" onClick={func}>
                <h3>{time}</h3>
            </button>
        )
    }

    return { getTimeslots, TimeOption }
}

export default Availablity;