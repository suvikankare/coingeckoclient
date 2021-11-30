export const volume = (bitcoin) => {
  // Map total volumes to find largest value
  const largest = Math.max.apply(Math, bitcoin.total_volumes.map((tv) => tv[1]))
  // Find array holding the largest value
  const largestVolume = bitcoin.total_volumes.find(d => d[1] === largest);
  return largestVolume;
}