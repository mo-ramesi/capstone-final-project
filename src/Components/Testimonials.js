import TestimonialCard from "./TestimonialCard";
import { Box } from "@chakra-ui/react";

const reviews = [
    {
        name: "Daniel Jeffries",
        id: "DJ",
        rating: 5,
        comment: "Hands down the best culinary experience I've had in downtown Chicago. There is literally not a bad thing I can say about this place!",
        getImageSrc: () => require("../Assets/Daniel.jpg"),
        class: "tCard"
    },
    {
        name: "Kat Darwin",
        id: "KD",
        rating: 4,
        comment: "The food here is amazing! I only wish that I had booked in advance because I had to wait 30 minutes at the bar before there was a table avaialable.",
        getImageSrc: () => require("../Assets/Kat.jpg"),
        class: "tCard"
    },
    {
        name: "Xavier Barnes",
        id: "XB",
        rating: 5,
        comment: "This is my favorite restaurant ever! The atmosphere is lively and the food is incredible too!",
        getImageSrc: () => require("../Assets/Xavier.jpg"),
        class: "tCard"
    },
    {
        name: "Leslie Randolph",
        id: "LR",
        rating: 5,
        comment: "I came here for my birthday dinner. The service was amazing and the food was the best I've tasted in a long time!",
        getImageSrc: () => require("../Assets/Leslie.jpg"),
        class: "tCard"
    }
]

const Testimonials = () => {
    return (
        <article className="testimonialsSection">
            <div className="centered">
                <h2>Testimonials</h2>
            </div>
            <Box
              className="testimonialsBox"
              display="grid"
              gridTemplateColumns="repeat(2, 450px)"
              columnGap="4rem"
              rowGap="5rem"
            >
            {reviews.map((item) => (
                <TestimonialCard
                  key={item.id}
                  claas={item.class}
                  name={item.name}
                  rating={item.rating}
                  comment={item.comment}
                  imageSrc={item.getImageSrc()}
                />
            ))}
            </Box>
        </article>
    )
}

export default Testimonials;