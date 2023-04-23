const size = {
  mobile: '768px',
  tablet: '1024px',
  laptop: '1440px',
};

export default {
  mobile: `(width <= ${size.mobile})`,
  tablet: `(width <= ${size.tablet})`,
  laptop: `(width <= ${size.laptop})`,
};
