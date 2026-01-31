// time passed as secs
const formatTime = (time) => {
  const totalSeconds = Math.floor(time);
  const min = Math.floor(totalSeconds / 60);
  const sec = totalSeconds % 60;

  const hundredths = Math.floor((time % 1) * 100)
    .toString()
    .padStart(2, '0');

  if (min > 0) {
    return `${min}:${sec.toString().padStart(2, '0')}.${hundredths.toString().padStart(2, '0')}`;
  }

  return `${sec}.${hundredths}`;
};

export default formatTime