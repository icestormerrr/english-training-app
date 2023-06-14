import React, {useEffect, useState} from 'react';

const CountDown = (props) => {
  const [seconds, setSeconds] = useState(props.seconds);
  useEffect(() => {
    let timerId;
    if (seconds > 0) {
      timerId = setTimeout(setSeconds, 1000, seconds - 1);
    } else {
      props.onEndCounting();
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