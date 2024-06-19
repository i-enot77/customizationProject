export const checkCategory = (productCategory?: string) => {
  let modelPart = "";
  if (!productCategory) return (modelPart = "");

  switch (productCategory) {
    case "sofy":
    case "fotele":
      return (modelPart = "Tapicerka");
    case "krzesła":
      return (modelPart = "Siedzenie");
    case "stoły":
      return (modelPart = "Blat");
    case "lampy":
      return (modelPart = "Lampa");
    default:
      return (modelPart = "");
  }
};
