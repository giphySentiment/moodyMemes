import { useContext, useState, useRef } from "react";
import { FormContext } from "./GiphyData";
import GiphyError from "./GiphyError";

// Import components
import LoadingPage from "./LoadingPage";

const Forms = (props) => {

    const ref = useRef()

    const scrollInto = () => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    }
   
    // Set variable for 'handleFormSubmit' from GiphyData (useContext)
    const formSubmit = useContext(FormContext);
    
    // Variables to info for day of the week
    const today = new Date().toLocaleString(
        'default', { weekday: 'long' }
    );

    // Function to change setMood to user input value
    const handleMoodChange = (e) => {
        props.setMood(e.target.value);
        props.setIsSpace(false)
        scrollInto()
    };

    return (
        <section className="forms">
            <h3>Happy {`${today}`}!
                <span>How are you feeling?</span></h3>
            <form onSubmit={(e) => formSubmit(e, props.mood)}>
                <label htmlFor="moodSelector"
                    className="visuallyHidden">Type in an emotion </label>
                <input name="moodSelector" id="moodSelector" type="text"
                    onChange={(e) => handleMoodChange(e)}
                />
                <button onClick={props.handleShowGif} 
                       disabled=
                    {
                        props.isSpace
                        ? true
                        : false
                    }
                    className="buttonContainer">GIF me my mood!</button>
                    {
                        props.noGifsAvailable
                        ? <p>Sorry, there are no GIFs to express how you feel. Try something else!</p>
                        : null
                    }
                    {
                        props.isSpace
                        ? <p>Single words only please!</p>
                        : null
                    }
                    {
                        props.giphyError
                        ? <p>Oh no! The API is down.</p>
                        : null
                    }
                    {/* <div ref={ref}>
                    {
                        props.loading
                        ? <><LoadingPage/></>
                        : null
                    }
                    </div> */}
            </form>
        </section>
    );
};

export default Forms;