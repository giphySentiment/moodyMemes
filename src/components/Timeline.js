import firebaseConfig from '../firebase';
import { getDatabase, ref, onValue, remove, push } from 'firebase/database';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import uuid from "react-uuid";

const Timeline = (props) => {
    // State to save user's gif and info object into the timeline
    const [timeline, setTimeline] = useState([]);

    const [numOfLikes, setNumOfLikes] = useState(0);

    const handleLikes = (likes) => {
        setNumOfLikes(numOfLikes + 1);
        console.log("num of likes being clicked");
        const database = getDatabase(firebaseConfig);
        const databaseRef = ref(database, `/${likes}`)

        push(databaseRef)
    };

    useEffect(() => {
        const database = getDatabase(firebaseConfig);
        const databaseRef = ref(database);

        onValue(databaseRef, (response) => {
            const newState = [];
            const data = response.val();
            for (let key in data) {
                newState.push({ key: key, name: data[key] })
            }
            setTimeline(newState);
        })
    }, []);

    const handleRemoveMeme = (memeKey) => {
        const database = getDatabase(firebaseConfig);
        const databaseRef = ref(database, `/${memeKey}`)

        remove(databaseRef)
    }



    // let currentItems = (0);
    // console.log(timeline)
    // const displayNextThree = () => {
    //     for (let i = 0; i > timeline.length; i + 3){
    //         timeline = timeline + 3
    //         const arrayOfThree = []
    //         timeline.slice(i, i + 3)
    // }
        // setTimeline(timeline.slice(currentItems, currentItems + 3));
        // if (!(currentItems + 3 > timeline.length)) {
        //     currentItems = currentItems + 3;
        // }
    //     console.log(timeline)
    // }

    let currentItems = 0;
    // let maxItems = timeline.length - 3;
    // console.log(timeline)
    // const displayNextThree = () => {
    //     if (currentItems === maxItems) {
    //         currentItems = 0;
    //     } else {
    //         currentItems + 3;
    //     }
    // }

    // for (i = 0; i < timeline.length; i++) {
    //     if(timeline[i].length)
    // }
    return (
        <section className="timeline">
             <div className="wrapper">
                <nav>
                    <Link to="/landingPage">
                        <h2>Giphy Sentiments</h2>
                    </Link>
                </nav>
            </div>
                <div className="timelineContainer">
                    {timeline.map((result) => {
                        return (
                            <div className="timelineTest">
                                <div
                                    className="timelineItems"
                                    key={uuid()}>
                                    <h3>{`On ${result.name.date}, you felt: ${result.name.mood}`}</h3>
                                    <img
                                        src={result.name.image}
                                        alt={`user selected gif to show the mood of ${result.name.mood}`}
                                    />
                                    <button onClick={() => {handleRemoveMeme(result.key)}}>
                                        <i className="fa-regular fa-trash-can"></i>
                                    </button>
                                    <button onClick={() => {handleLikes(result.key)}}><i className="fa-regular fa-heart"></i></button>
                                    <p>{numOfLikes}</p>
                                </div>
                            </div>
                        )
                    })}
            </div>
            <div className="timelineButtons">
                        <button>&#10094;</button>
                        <button>&#10095;</button>
                    </div>
        </section>
    );
};

export default Timeline;