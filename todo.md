[x] - re render default modal when modal is closed
[x] - order patients by score value in frontend when requested from server
[] - Login page for admin then send admin.html
[x] - request patient list on html load ** it is now in onload function
[] - patient link ??
    [] - test and implement

[] - send whatsapp from frontend directly -> https://web.whatsapp.com/send?phone=PHONENUMBER


[] -//save phone to localstorage
    //avoid 2 different triages by the same phone (on the same day?)
    let user= {
        triaged: false
    };

    localStorage.setItem("user", JSON.stringify(user));