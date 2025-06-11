let errormessage = [];
let missingFields = [];
let startTime, endTime;

// Email validation regex
function isEmail(email) {
    var regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return regex.test(email);
}

$(document).ready(function () {
    // Restrict phone input to digits only (max 10)
    $("#phoneno").on("input", function () {
        let value = $(this).val().replace(/\D/g, "");
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        $(this).val(value);
    });

    // Show/hide password fields
    $("#togglePassword").click(function () {
        toggleVisibility("#password", this);
    });

    $("#toggleConfirmPassword").click(function () {
        toggleVisibility("#confirmpassword", this);
    });

    // Form submit event
    $("#userForm").on("submit", function (e) {
        e.preventDefault();
        startTime = performance.now();

        validateForm();

        endTime = performance.now();
        var reactionTime = (endTime - startTime).toFixed(2);

        displayMessages(reactionTime);
    });
});

function toggleVisibility(fieldId, button) {
    let passwordField = $(fieldId);
    let type = passwordField.attr("type") === "password" ? "text" : "password";
    passwordField.attr("type", type);
    $(button).text(type === "password" ? "Show" : "Hide");
}

function validateForm() {
    errormessage = [];
    missingFields = [];

    const email = $("#Email").val().trim();
    const phone = $("#phoneno").val().trim();
    const password = $("#password").val();
    const confirmPassword = $("#confirmpassword").val();

    // Required fields
    if (email === "") missingFields.push("Email is required.");
    if (phone === "") missingFields.push("Phone number is required.");
    if (password === "") missingFields.push("Password is required.");
    if (confirmPassword === "") missingFields.push("Confirm Password is required.");

    // Email format
    if (email && !isEmail(email)) {
        errormessage.push("Invalid email format.");
    }

    // Phone format
    if (phone && !/^\d{10}$/.test(phone)) {
        errormessage.push("Phone number must be exactly 10 digits.");
    }

    // Password strength
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (password && !passwordRegex.test(password)) {
        errormessage.push("Password must be at least 8 characters, include an uppercase, lowercase, and a number.");
    }

    // Password match
    if (password && confirmPassword && password !== confirmPassword) {
        errormessage.push("Passwords do not match.");
    }
}

function displayMessages(reactionTime) {
    $("#errors, #success").stop(true, true).fadeOut(0); // Clear previous messages

    if (errormessage.length === 0 && missingFields.length === 0) {
        $("#success").html(`✅ You are registered! Reaction time: ${reactionTime} ms`).fadeIn();
    } else {
        $("#errors").html([...errormessage, ...missingFields].map(msg => `<p>${msg}</p>`).join("")).fadeIn();
    }
}
