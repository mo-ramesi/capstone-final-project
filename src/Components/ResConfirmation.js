import NavigationContext from '../Context/NavigationContext.js';
import { useContext } from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faCircleCheck } from "@fortawesome/free-solid-svg-icons";


const ResConfirmation = ({ details }) => {
    // eslint-disable-next-line
    const {headFoot, setHeadFoot} = useContext(NavigationContext)

    return (
        <>
            {details !== null ?
            <article className="Confirmation">
                <nav className="confNav">
                    <Link to="/" className="confLink" onClick={() => setHeadFoot(true)}>
                        <FontAwesomeIcon id="home" icon={faHome} size="2x" color="#F4CE14"/>
                    </Link>
                    <Link to="/" className="confLink" onClick={() => setHeadFoot(true)}>
                        <FontAwesomeIcon id="user" icon={faUser} size="2x" color="#F4CE14"/>
                    </Link>
                </nav>
                <div className="Check">
                    <FontAwesomeIcon id="checkmark" icon={faCircleCheck} size="10x" color="#749681"/>
                </div>
                <h1>Thanks {details.fullName.slice(0, details.fullName.indexOf(" "))}, your reservation is confirmed!</h1>
                <h3>A confirmation email has been sent to {details.email}</h3>
                <h3 id="lastLine">Please contact us ahead of time if you would like to make any adjustments or cancel your reservation</h3>
                <Link to="/" id="confEnd">
                    <button className="lgButton" onClick={() => setHeadFoot(true)}>Back to Home</button>
                </Link>
            </article>
            :
            <article>
                <h2>Oops! Something went wrong.</h2>
                <h3>Please try again</h3>
            </article>}
        </>
    )
}

export default ResConfirmation;