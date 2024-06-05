const url = "https://665736d49f970b3b36c8673a.mockapi.io/Myweb";
const usernameAlert = document.getElementById("usernameAlert");
const passwordAlert = document.getElementById("passwordAlert");
const emailAlert = document.getElementById("emailAlert");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function signupHandler() {

    usernameAlert.innerText = "";
    passwordAlert.innerText = "";
    emailAlert.innerText = "";

    const userName = document.getElementById("userName");
    const userPassword = document.getElementById("userPassword");
    const userEmail = document.getElementById("userEmail");

    let isValid = true;

    if (!emailRegex.test(userEmail.value)) {
        emailAlert.innerText = "Email is not valid";
        emailAlert.setAttribute("class", "alert alert-danger");
        isValid = false;
    }

    if (userPassword.value.length < 8) {
        passwordAlert.innerText = "Password should be 8 characters or more";
        passwordAlert.setAttribute("class", "alert alert-danger");
        isValid = false;
    }

    if (userName.value.length < 5) {
        usernameAlert.innerText = "Username must be 5 characters or more";
        usernameAlert.setAttribute("class", "alert alert-danger");
        isValid = false;
    }

    if (isValid) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userName: userName,
                    userPassword: userPassword,
                    userEmail: userEmail
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Signup successful:", data);
            } else {
                console.error('Signup failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

async function login(){
    passwordAlert.innerText = "";
    emailAlert.innerText = "";

    const userPassword = document.getElementById("userPassword");
    const userEmail = document.getElementById("userEmail");

    let isValid = true;

    if (!emailRegex.test(userEmail.value)) {
        emailAlert.innerText = "Email is not valid";
        emailAlert.setAttribute("class", "alert alert-danger");
        isValid = false;
    }

    if (userPassword.value.length < 8) {
        passwordAlert.innerText = "Password should be 8 characters or more";
        passwordAlert.setAttribute("class", "alert alert-danger");
        isValid = false;
    }if(isValid){
    try {
        const response = await fetch(url,{method: "GET"});
        if (response.ok) {
            const users = await response.json();
            const user = users.find(u => u.userEmail === userEmail.value && u.userPassword === userPassword.value);

            if (user) {
                console.log("Login successful:", user);
                 localStorage.setItem("isLoggedIn", "true");
                window.location.href = 'home.html';
            }  else {
                alert("Invalid email or password");
            }
        } else {
            console.error('Login failed:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
}
function logoutHandler() {
    localStorage.removeItem("isLoggedIn");
    window.location.href = 'login.html';
}

