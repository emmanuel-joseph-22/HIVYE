function getCurrentTime(){
    return Date.now() + new Date().getTimezoneOffset() * 60000 + 8 * 60 * 60 * 1000; 
}

function formatTimestamp(timestamp) {
    return new Date(timestamp).toLocaleString("en-US", {
      timeZone: "Asia/Manila",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, // Set to false for 24-hour format
    });
}

function formatDate(rawDate){
    const formattedDate = new Date(rawDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    return formattedDate;
}

function timeAgo(timestamp) {
    const now = Date.now();
    const seconds = Math.floor((now - timestamp) / 1000);
  
    if (seconds < 10) return "Just now";
    if (seconds < 60) return `${seconds} seconds ago`;
  
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minutes ago`;
  
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
  
    const days = Math.floor(hours / 24);
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
  
    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks} weeks ago`;
  
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} months ago`;
  
    const years = Math.floor(days / 365);
    return `${years} years ago`;
}

export { getCurrentTime, formatTimestamp, formatDate, timeAgo }