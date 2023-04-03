import chicago from "../Assets/chicago.jpg";
import LL2 from "../Assets/LL2.jpg";


const Overview = () => {
    return (
        <article className="overviewSection">
            <section>
                <a href="https://youtube.com/">
                    <h2>Little Lemon</h2>
                    <span className="lessBold">Chicago</span>
                </a>
                <p>
                    Little Lemon is a family owned Mediterranean restaurant in the heart downtown Chicago.
                    Since openning in the spring of 2013, our founders and head chefs, Mario and Adrian have
                    focused on providing a culinary experience that is truly out of this world. Our menu
                    offers something for everybody, from classical Mediterranean dishes and unique flavor
                    blends, to creative cocktails and an curated wine list. We can guarantee that Little 
                    Lemon will excite your tastebuds in an unprecedented way! Swing by with your friends and
                    family, or order your favorite dishes online today!
                </p>
            </section>
            <section className="overviewPics">
                <img className="chicago" src={chicago} alt="Downtown Chicago" />
                <img className="LL2-2" src={LL2} alt="Little Lemon Restaurant" />
                <img className="LL2" src={LL2} alt="Little Lemon Restaurant" />
            </section>
        </article>
    )
};

export default Overview;