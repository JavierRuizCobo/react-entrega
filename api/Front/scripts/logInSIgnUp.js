
document.addEventListener("DOMContentLoaded", function () {
    
    document.getElementById("signupForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = {
            username: document.getElementById("userNameSignUp").value,
            email: document.querySelector("input[name='email']").value,
            password: document.querySelector("input[name='pswdSignUp']").value,
            roles : Array.from(document.getElementById("roles").selectedOptions).map(option => option.value)
        };

        console.log(formData)

        fetch("/api/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            window.alert(data.message);
            document.getElementById("signupForm").reset();
            
        })
        .catch(error => {
            console.error(error);
        });

    });

    document.getElementById("signinForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = {
            username: document.getElementById("userName").value,
            password: document.querySelector("input[name='pswd']").value
        };

        fetch("/api/auth/signin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {

            console.log("Respuesta del servidor:", data);

            if (data.accessToken) {

                localStorage.setItem('access_token', data.accessToken);


                const accessToken = localStorage.getItem('access_token');

                fetch("/api/auth/userfile", {
                    method: "GET",
                    headers: {
                        "x-access-token": `${accessToken}`
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }

                    console.log(response)
                    window.location.href = response.url;
                    return response; 

                })
                .catch(error => {
                    console.error("Error al obtener el contenido del archivo:", error);
                });
            } else{
                window.alert(data.message);
            }
            document.getElementById("signinForm").reset();
        })
        .catch(error => {
            console.error(error);
        });

    });

});
