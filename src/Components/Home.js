import Hero from "./Hero.js";
import Specials from "./Specials.js";
import Testimonials from "./Testimonials.js";
import Overview from "./Overview.js"

const Home = () => {
    return (
        <main>
            <Hero />
            <Specials />
            <Testimonials />
            <Overview />
        </main>
    )
}

export default Home;