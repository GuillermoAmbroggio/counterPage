const useColorsCounter = (counter: number) => {
  let color = '';
  if (counter >= 52) {
    color = 'purple';
  } else if (counter >= 42) {
    color = 'blue';
  } else if (counter >= 32) {
    color = 'green';
  } else if (counter >= 22) {
    color = 'yellow';
  } else if (counter >= 12) {
    color = 'orange';
  } else if (counter > 0) {
    color = 'red';
  } else {
    color = 'grey';
  }
  return color;
};
export default useColorsCounter;
