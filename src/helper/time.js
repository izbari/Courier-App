export const Time = (clock) => {
    let day=0;
    let hour =  Math.floor(clock/60);
    let minute = clock%60;
    
    if(hour>24){
        day = Math.floor(hour/24);
        hour = Math.floor(hour%24);
    }
    let text="";
    if(day>0){text=day+" gün ";}
    if(hour>0){text=text+hour+" saat ";}
    if(minute>0){text=text+minute+" dakika ";}
    return text
 }
 export const Distance= (distance)=> {
    const km=Math.floor(distance/1000);
    const mt=Math.floor(distance%1000);
    return km>0 ?  km+" km "+mt+" mt" : mt+" mt";
 }