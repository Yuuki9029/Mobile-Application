let today = new Date(),
    lastDate = new Date(new Date().getTime() - 356 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    day = today.getDate(),
    month = today.getMonth()+1,
    year = today.getFullYear();
        if(day < 10){
                day= '0' + day
            } 
        if(month < 10){
            month= '0' + month
        }
        today = year + '-' + month + '-' + day;

        document.getElementById("date").setAttribute("max", today);
        document.getElementById("date").setAttribute("min",lastDate);
