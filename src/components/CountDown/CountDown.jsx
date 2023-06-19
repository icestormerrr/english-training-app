import React, {useEffect, useState} from 'react';

const CountDown = ({ initialSeconds, onEndCounting }) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() => {
    let timerId;
    if (seconds > 0) {
      timerId = setTimeout(setSeconds, 1000, seconds - 1);
    } else {
      onEndCounting();
    }
    return () => {
      clearTimeout(timerId)
    }
  }, [seconds]);

  return (
    <span>
      {seconds}
    </span>
  );
};

export default CountDown;