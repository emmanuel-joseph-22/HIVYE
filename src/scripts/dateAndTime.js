function getCurrentTime(){
    // Get current date
    const currentDate = new Date();

    // Options for formatting the time
    const options = {
        timeZone: 'Asia/Shanghai', // Set the timezone to GMT+8 (Shanghai timezone)
        hour12: true, // Use 24-hour format
        hour: 'numeric',
        minute: 'numeric'
    };
        
    // Get the current time in GMT+8
    const timeInGMTPlus8 = currentDate.toLocaleString('en-US', options);
    return timeInGMTPlus8;
}