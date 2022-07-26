let r = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY2NjYwOTI3NSwiaWF0IjoxNjU4ODMzMjc1LCJqdGkiOiI4NzRlMDk5MGNiNTQ0YTM2YjVlZmQ5M2JkMGE0NDZiMyIsInVzZXJfaWQiOjF9.";
let rr = "nAS2HiBDFHE47aJmvkI3pFcbLVaOcqAKPhVdUgsZJas";
let Mbody = JSON.stringify({
    "refresh": r+rr
})
fetch(
    "https://feedbacks-backend.herokuapp.com/api/auth/refresh/",
    {
        method: "GET",
        headers: {
            "accept": "application/json",
            "Content-Type": "application/json; charset=utf8"
        },
        body: JSON.stringify({
            "refresh": r + rr
        })
    }
).catch(error => {
    throw new Error(
        error
    )
})



