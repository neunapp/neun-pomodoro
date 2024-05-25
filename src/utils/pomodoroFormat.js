export const formattedTime = (time) => {
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  if (time >= 3600) {
    return `${String(59).padStart(2, '0')}:${String(59).padStart(2, '0')}`
  } else {
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  
}