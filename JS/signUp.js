// globals
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const signUpBtn = document.getElementById("signUpBtn");
const signUpMeassge = document.getElementById("singUpMeassge");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nameRegex = /^[a-zA-Z\s]*$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const errorStyle = "0.5px solid Red";
const endPoint = "https://65523afb5c69a7790329bc41.mockapi.io/users";

signUpBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    nameInput.value === "" ||
    emailInput.value === "" ||
    passwordInput.value === ""
  ) {
    signUpMeassge.innerText = "Please fill all the fields";
    signUpMeassge.style.color = "red";
  } else if (!emailRegex.test(emailInput.value)) {
    signUpMeassge.innerText = "Please enter a valid email";
    signUpMeassge.style.color = "red";
  } else if (!nameRegex.test(nameInput.value)) {
    signUpMeassge.innerText = "Please enter a valid name";
    signUpMeassge.style.color = "red";
  } else if (!passwordRegex.test(passwordInput.value)) {
    signUpMeassge.innerText = "Please enter a valid password";
    signUpMeassge.style.color = "red";
  } else if (nameInput.value.length < 3) {
    signUpMeassge.innerText = "Please enter a valid name";
  } else {
    fetch(endPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
      }),
    }).then((response) => {
      if (response.ok) {
        signUpMeassge.innerText = "Sign Up Successful, You can Sign in now";
        signUpMeassge.style.color = "green";
        window.location.href = "signIn.html";
        return response.json();
      } else {
        throw new Error("Network response was not ok.");
      }
    });
  }
});
