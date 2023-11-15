// globals
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const signUpBtn = document.getElementById("signUpBtn");
const signUpMeassge = document.getElementById("singUpMeassge");

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
