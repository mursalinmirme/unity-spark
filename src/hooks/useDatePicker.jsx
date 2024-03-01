const useDatePicker = (selectDate) => {
  const date = new Date(selectDate);
  const day = date.getDate();
  const month = date.toLocaleString("en", { month: "long" });
  const year = date.getFullYear();
  let formattedDate = `${day},${month}, ${year}`;
  return formattedDate;
};

export default useDatePicker;
