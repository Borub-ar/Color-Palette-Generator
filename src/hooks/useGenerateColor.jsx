const useGenerateColor = () => {
  let hex = '#';
  let letters = '0123456789ABCDEF';
  for (let i = 0; i < 6; i++) {
    hex += letters[Math.floor(Math.random() * 16)];
  }

  return hex;
};

export default useGenerateColor;
