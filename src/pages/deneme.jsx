import React, { useEffect, useRef, useState } from 'react'
import './deneme.css'

function Deneme({ timeLimit = 60 }) {
    const [timeLeft, setTimeLeft] = useState(timeLimit)
    const [remaining, setRemaining] = useState({ minutes: "01", seconds: "01" })
    const timer = useRef();

    useEffect(() => {
        timer.current = setInterval(() => {
            setTimeLeft(count => count - 1);
        }, 1000);

        return () => {
            clearInterval(timer.current);
        }
    }, []);

    useEffect(() => {
        if (timeLeft === 0) {
            clearInterval(timer.current);
        }
    }, [timeLeft])



    useEffect(() => {
        const minutes = Math.floor((timeLeft / 60)).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        })
        const seconds = (timeLeft % 60).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        })
        setRemaining({ minutes, seconds })
    }, [timeLeft])

    return (
        <div>
            <span>
                {remaining.minutes}:{remaining.seconds}
            </span>
        </div>
    )
}

export default Deneme