const formatTime = (val:number): string => {
    const h = Math.floor(val);
    const m = (val % 1) * 60;
    
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export default formatTime;