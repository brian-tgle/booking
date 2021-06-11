const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { timeStyle: 'short' })}`;
};

export default formatDate;
