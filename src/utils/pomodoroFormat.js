export const formattedTime = (time) => {
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}