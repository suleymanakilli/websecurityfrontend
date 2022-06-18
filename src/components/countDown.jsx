import React, { useEffect, useRef, useState } from 'react'
import './countdown.css'

function CountDown({ timeLimit, setIsExpired, setTimeLimit }) {
    const [remaining, setRemaining] = useState({ minutes: "01", seconds: "01" })
    const timer = useRef();

    useEffect(() => {
        timer.current = setInterval(() => {
            setTimeLimit(count => count - 1);
        }, 1000);

        return () => {
            clearInterval(timer.current);
        }
    }, [setTimeLimit, timeLimit]);

    useEffect(() => {
        if (timeLimit === 0) {
            clearInterval(timer.current);
            setIsExpired(true)
        }
    }, [timeLimit, setIsExpired])



    useEffect(() => {
        const minutes = Math.floor((timeLimit / 60)).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        })
        const seconds = (timeLimit % 60).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        })
        setRemaining({ minutes, seconds })
    }, [timeLimit])

    return (
        <div>
            <span>
                {remaining.minutes}:{remaining.seconds}
            </span>
        </div>
    )
}

export default CountDown