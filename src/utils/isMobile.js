export const isMobileOrLowEnd = () => {
  return (
    window.innerWidth <= 1024 ||
    navigator.hardwareConcurrency <= 4 ||
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
  );
};
