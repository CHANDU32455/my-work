// DOM Elements
const landingPage = document.getElementById("landingPage");
const dashboardPage = document.getElementById("dashboardPage");
const authButtons = document.getElementById("authButtons");
const loggedInButtons = document.getElementById("loggedInButtons");
const loggedInUser = document.getElementById("loggedInUser");
const logoutBtn = document.getElementById("logoutBtn");
const signInBtn = document.getElementById("signInBtn");
const signUpBtn = document.getElementById("signUpBtn");
const signInModal = document.getElementById("signInModal");
const signUpModal = document.getElementById("signUpModal");
const closeButtons = document.querySelectorAll(".close");
const signInForm = document.getElementById("signInForm");
const signUpForm = document.getElementById("signUpForm");
const signInError = document.getElementById("signInError");
const signUpError = document.getElementById("signUpError");

// Function to update UI based on login state
const updateUI = () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (user) {
    // User is logged in
    landingPage.style.display = "none";
    dashboardPage.style.display = "block";
    authButtons.style.display = "none";
    loggedInButtons.style.display = "flex";
    loggedInUser.textContent = `Welcome, ${user.name}`;
  } else {
    // User is not logged in
    landingPage.style.display = "block";
    dashboardPage.style.display = "none";
    authButtons.style.display = "flex";
    loggedInButtons.style.display = "none";
  }
};

// Initialize UI on page load
updateUI();

// Open Sign In Modal
signInBtn.addEventListener("click", () => {
  signInModal.style.display = "block";
});

// Open Sign Up Modal
signUpBtn.addEventListener("click", () => {
  signUpModal.style.display = "block";
});

// Close Modals
closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    signInModal.style.display = "none";
    signUpModal.style.display = "none";
  });
});

// Close Modal when clicking outside
window.addEventListener("click", (event) => {
  if (event.target === signInModal || event.target === signUpModal) {
    signInModal.style.display = "none";
    signUpModal.style.display = "none";
  }
});

// Sign Up Functionality
signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("signUpName").value;
  const email = document.getElementById("signUpEmail").value;
  const password = document.getElementById("signUpPassword").value;

  // Validate inputs
  if (!name || !email || !password) {
    signUpError.textContent = "All fields are required!";
    return;
  }

  // Check if user already exists
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userExists = users.some((user) => user.email === email);

  if (userExists) {
    signUpError.textContent = "User already exists!";
  } else {
    // Add new user
    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    signUpError.textContent = "";
    alert("Sign Up Successful! Please Sign In.");
    signUpModal.style.display = "none";
    signUpForm.reset(); // Clear the form
  }
});

// Sign In Functionality
signInForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("signInEmail").value;
  const password = document.getElementById("signInPassword").value;

  // Validate inputs
  if (!email || !password) {
    signInError.textContent = "All fields are required!";
    return;
  }

  // Check if user exists
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((user) => user.email === email && user.password === password);

  if (user) {
    // Successful login
    signInError.textContent = "";
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    alert("Sign In Successful! Redirecting to Dashboard...");
    updateUI(); // Update the UI to show the dashboard
    signInModal.style.display = "none"; // Close the modal
    signInForm.reset(); // Clear the form
  } else {
    // Invalid credentials
    signInError.textContent = "Invalid email or password!";
  }
});

// Logout Functionality
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  alert("You have been logged out.");
  updateUI(); // Update the UI to show the landing page
});