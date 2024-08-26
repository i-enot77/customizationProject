export const getPersistFromLocalStorage = (): boolean => {
  const persistData = localStorage.getItem("persist");
  if (persistData) {
    const { value, expiration } = JSON.parse(persistData);
    if (Date.now() < expiration) {
      return value;
    } else {
      console.log("Persist data expired and removed");
      localStorage.removeItem("persist");
    }
  }
  return false;
};
