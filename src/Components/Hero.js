import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import { Link } from 'react-router-dom';

const content = [
    {
        title: "Little Lemon",
        subtitle: "Chicago",
        content: "We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist",
        button: "Learn More",
        image: () => require("../Assets/slide1.jpg"),
        class: "slide slide_1",
        wrapper_class: "one",
        direct: "/"
    },
    {
        title: "Happy and Healthy at Home!",
        subtitle: "",
        content: "All items on our menu are available for pickup or delivery",
        button: "Order Online",
        image: () => require("../Assets/slide2.jpg"),
        class: "slide slide_2",
        wrapper_class: "two",
        direct: "/"
    },
    {
        title: "Skip the Queue",
        subtitle: "",
        content: "Why wait to be seated when you can reserve a table in advance?",
        button: "Reserve a Table",
        image: () => require("../Assets/slide3.jpg"),
        class: "slide slide_3",
        wrapper_class: "three",
        direct: "reserve-a-table"
    }
]

const Hero = () => {
    return (
        <Slider autoplay={5000} duration={2000}>
            {content.map((article, index) => (
                <div className={article.wrapper_class}
                    key={article.wrapper_class}
                    style={{background: `url('${article.image()}') no-repeat 0% 70%`}}
                >
                    <div className={article.class}>
                        <h1>{article.title}</h1>
                        <h2>{article.subtitle}</h2>
                        <h3>{article.content}</h3>
                        <Link to={article.direct}>
                            <button aria-label={article.button} className="lgButton sldButton">{article.button}</button>
                        </Link>
                    </div>
                </div>
            ))}
        </Slider>
    );
};

export default Hero;