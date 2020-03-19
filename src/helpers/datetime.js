import { formatDistanceToNow } from "date-fns";
import { nb } from "date-fns/locale";

export default function formatDateTime(date) {
  return `${formatDistanceToNow(date, { locale: nb }).replace(
    "omtrent",
    ""
  )} siden`;
}
