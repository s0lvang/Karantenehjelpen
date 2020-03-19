const LOCALE = "nb-NO";

export default function formatDateTime(date) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  };
  const formatter = new Intl.DateTimeFormat(LOCALE, options);
  return formatter.format(date);
}
