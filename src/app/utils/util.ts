const calculateDaysFromNow = (dateString: string): number => {
  // Parse the date string into a Date object
  const targetDate = new Date(dateString);

  if (isNaN(targetDate.getTime())) {
    throw new Error('Invalid date string');
  }

  // Get the current date
  const today = new Date();

  // Calculate the difference in milliseconds
  const diffInMs = targetDate.getTime() - today.getTime();

  // Convert the difference to days
  const diffInDays = Math.round(diffInMs / (24 * 60 * 60 * 1000));

  return diffInDays;
};

// Example usage
// const dateString = "2024-12-25";
// try {
//   const daysFromNow = calculateDaysFromNow(dateString);
//   console.log(`${dateString} is ${daysFromNow} days from today.`);
// } catch (error) {
//   console.error(error.message);
// }
