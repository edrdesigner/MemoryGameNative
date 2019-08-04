export default function shuffle(array) {
  const newArray = array.slice(0);
  for (let i = 0; i < newArray.length - 1; i++) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const temp = newArray[i];
    newArray[i] = newArray[randomIndex];
    newArray[randomIndex] = temp;
  }
  return newArray;
}
