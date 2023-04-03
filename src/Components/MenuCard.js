import React from "react";
import { Box, VStack } from "@chakra-ui/react";

function cart() {
    console.log("item added to cart")
}

const MenuCard = ({title, description, price, clas, imageSrc}) => {
    return (
        <Box
          bg="white"
          color="black"
          borderRadius="10px"
          className={clas}
        >
          <VStack spacing={30} paddingBottom={20}>
            <img className="cardImg" src={imageSrc} alt={title} />
            <div className="cardHead">
                <>
                    <h3>{title}</h3>
                </>
                <>
                    <h4>{price}</h4>
                </>
            </div>
            <p className="cardText">{description}</p>
            <button aria-label="Add to cart" className="medButton" onClick={cart}>Add to Cart</button>
          </VStack>
        </Box>
      );
};

export default MenuCard;