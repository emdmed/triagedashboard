[x] - re render default modal when modal is closed
[x] - order patients by score value in frontend when requested from server
[x] - send whatsapp from frontend directly
    [] - define message + link to send
    
[x] - request patient list on html load ** it is now in onload function
[] - Login page for admin then send admin.html
[]  fix abdomen image (crop from arm pits, navel in the middle)
[] - frontend bug on admin panel "esperando unos segundos" fixed in patient card
[] - in admin frontend bring patients from db every x seconds

[] -//save phone to localstorage
    //avoid 2 different triages by the same phone (on the same day?)
    let user= {
        triaged: false
    };

    localStorage.setItem("user", JSON.stringify(user));