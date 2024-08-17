const useDataIdentifyer = (startDate) => {

    const prevDate = new Date(startDate);
    
    const current = new Date();
    const seconds = Math.floor((current - prevDate) / 1000);
    const minutes = Math.floor((current - prevDate) / (1000 * 60));
    const hour = Math.floor((current - prevDate) / (1000 * 60 * 60));
    const days = Math.floor((current - prevDate) / (1000 * 60 * 60 * 24));
     
    if (seconds < 60) return `${seconds} sc${seconds  > 1 ? "s" : ""}`
    if (minutes < 60) return `${minutes}min${minutes > 1 ? "s" : ""}`;
    if (minutes < (60 * 24)) return `${hour}hr${hour > 1 ? "s" : ""}`
    
    return days + (days > 1 ? "days" : "day");
}

export default useDataIdentifyer;