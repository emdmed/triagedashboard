
[x] - send whatsapp from frontend directly
    [] - define message + link to send


ADMIN FRONTEND
[] - Login page for admin then send admin.html
[] - atendido button
[] - no phone button (admin does the patient triage)
[x] - in admin frontend bring patients from db every x seconds
[] - patient id number, link it to a name stored only on the admin frontend (important?)
[x] - if ruleout, do not request patient triage and patient card should be red


PATIENT FRONTEND
[x]  fix abdomen image (crop from arm pits, navel in the middle)
[x] - handle no phone found on patient frontend
[x] - avoid 2 different triages by the same phone (on the same day?)


BUGSSSS
[x] - admin panel, patient cards copy border color from others when refresh
[] - frontend bug on admin panel "esperando unos segundos" in patient card
[] -  server bug when assigning patient number
[x] - undefined score patients are rendered first !!

DONE
[x] - re render default modal when modal is closed
[x] - order patients by score value in frontend when requested from server
[x] - request patient list on html load ** it is now in onload function
[x] - generate and assign a random number to each triaged patient to be identified.
