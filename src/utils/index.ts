export const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const strPad = (str: number): string => {
  return "000".slice(str.toString().length) + str.toString();
};

export const randomImageUrl = (): { url: string } => {
  const baseUrl = "/docs/";
  const firstFolder = "0";
  const secondFolder = randomInt(0, 9).toString();
  const randomFile = strPad(randomInt(0, 999));
  const filename = `00${secondFolder}${randomFile}`;
  const fullUrl = `${baseUrl}${firstFolder}/${secondFolder}/${filename}.jpg`;
  return { url: fullUrl };
};
