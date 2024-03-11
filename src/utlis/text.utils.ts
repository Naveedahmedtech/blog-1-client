const MAX_DESCRIPTION_LENGTH = 100;

export const truncatedDescription = (description:string) => {
  return description.length > MAX_DESCRIPTION_LENGTH
    ? `${description.substring(0, MAX_DESCRIPTION_LENGTH)}...`
    : description;
};
