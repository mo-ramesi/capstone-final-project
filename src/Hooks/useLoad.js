import { useState } from "react";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const useLoad = () => {
    const [loading, setLoading] = useState(false);

    const timeslots = async() => {
        setLoading(true);
        await wait(Math.floor(Math.random() * 200) * 10);
        setLoading(false);
    };

    return { loading, timeslots }
}

export default useLoad;