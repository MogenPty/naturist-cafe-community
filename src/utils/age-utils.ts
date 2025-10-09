export const calculateAge = (birthDate: Date): number => {
  // Validate input
  if (!(birthDate instanceof Date) || isNaN(birthDate.getTime())) {
    throw new Error("Invalid birthDate: must be a valid Date object");
  }

  const today = new Date();

  if (birthDate > today) {
    throw new Error("Invalid birthDate: cannot be in the future");
  }

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};
