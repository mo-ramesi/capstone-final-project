import React from "react";
import MenuCard from "./MenuCard";
import { Box } from "@chakra-ui/react";

const specials = [
    {
      title: "Greek Salad",
      description:
        "The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.",
      price: "$12.99",
      class: "mCard",
        getImageSrc: () => require("../Assets/special1.jpg"),
    },
    {
      title: "Bruschetta",
      description:
        "Our Bruschetta is made from grilled bread that has been smeared with garlic butter, seasoned with salt and olive oil, and topped with salmon.",
      price: "$8.49",
      class: "mCard",
        getImageSrc: () => require("../Assets/special2.jpg"),
    },
    {
      title: "Grilled Fish",
      description:
        "Our grilled fish features fresh halibut fillets marinated in olive oil, lemon juice, basil, ginger, and garlic, that are cooked to perfection.",
      price: "$17.99",
      class: "mCard",
        getImageSrc: () => require("../Assets/special3.jpg"),
    }
  ];

  const ProjectsSection = () => {
    return (
        <article className="specialsSection">
            <div className="specialsHeading">
                <>
                    <h2>Specials</h2>
                </>
                <>
                    <a aria-label="Food menu" href="/">
                        <button className="lgButton">View Menu</button>
                    </a>
                </>
            </div>
            <Box
            className="specialsBox"
            display="grid"
            gridTemplateColumns="repeat(auto-fill, 350px)"
            gap="2rem"
            >
            {specials.map((item, i) => (
                <MenuCard
                clas={item.class}
                key={i}
                title={item.title}
                price={item.price}
                description={item.description}
                imageSrc={item.getImageSrc()}
                />
            ))}
            </Box>
        </article>
    );
  };

  export default ProjectsSection;