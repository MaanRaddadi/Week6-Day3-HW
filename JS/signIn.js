// globals
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const signInBtn = document.getElementById("signInBtn");
const signInMsg = document.getElementById("singInMeassge");
const endPoint = "https://65523afb5c69a7790329bc41.mockapi.io/users";

signInBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (emailInput.value === "" || passwordInput.value === "") {
    signInMsg.innerText = "Please fill all the fields";
    signInMsg.style.color = "red";
  } else {
    fetch(endPoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const user = data.find(
          (user) =>
            user.email === emailInput.value &&
            user.password === passwordInput.value
        );
        if (isAdmin(user)) {
          // save admin to check in the main page
          localStorage.clear();
          localStorage.setItem("admin", JSON.stringify(user));
          window.location.href = "index.html";
        } else {
          // Save User Info so that we can use it in other pages
          localStorage.clear();
          localStorage.setItem("user", JSON.stringify(user));
          window.location.href = "index.html";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

// Website admins
const admins = [
  {
    name: "admin1",
    email: "admin1@gmail.com",
    password: "123456",
  },
  {
    name: "admin2",
    email: "admin2@gmail.com",
    password: "123456",
  },
];

// function to check if the user an admin or not
function isAdmin(user) {
  return admins.find(
    (admin) => admin.email === user.email && admin.password === user.password
  );
}
