const formatTime = (time) => {
  const getSeconds = `0${Math.round(time % 60)}`.slice(-2);
  const minutes = `${Math.floor(time / 60)}`;
  const getMinutes = `0${minutes % 60}`.slice(-2);
  const getHours = `0${Math.floor(time / 3600)}`.slice(-2);

  return `${getHours}:${getMinutes}:${getSeconds}`;
};

function getCount(chars) {
  let count = 0;
  chars.forEach(e => { if (!e.found) count += 1; });
  return count; 
}

export { formatTime, getCount };