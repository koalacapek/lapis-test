export const calculateDaysFromNow = (dateString: string): string => {
  // Parse the date string into a Date object
  const targetDate = new Date(dateString);

  if (isNaN(targetDate.getTime())) {
    throw new Error('Invalid date string');
  }

  // Get the current date
  const today = new Date();

  // Remove the time portion for an accurate comparison
  today.setHours(0, 0, 0, 0);
  targetDate.setHours(0, 0, 0, 0);

  // Calculate the difference in milliseconds
  const diffInMs = targetDate.getTime() - today.getTime();

  // Convert the difference to days
  const diffInDays = diffInMs / (24 * 60 * 60 * 1000);

  // Return appropriate string based on the difference
  if (diffInDays === 0) {
    return 'today!';
  } else if (diffInDays === 1) {
    return 'tomorrow!';
  } else if (diffInDays < 0) {
    return `${Math.abs(Math.round(diffInDays))} days ago`;
  } else {
    return `${Math.round(diffInDays)} days from now`;
  }
};
