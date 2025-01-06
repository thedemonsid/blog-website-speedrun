export function formatDate(date: string, includeRelative = false) {
  let currentDate = new Date();
  date = String(date);
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  let targetDate = new Date(date);

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  let daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = "";

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo} year${yearsAgo > 1 ? "s" : ""} ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo} month${monthsAgo > 1 ? "s" : ""} ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;
  } else {
    formattedDate = "Today";
  }

  let fulldate = targetDate.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (includeRelative) {
    return `${fulldate} ${formattedDate}`;
  } else {
    return fulldate;
  }
}
