var errormessage = [];
var missingFields = [];
var startTime, endTime;

function isEmail(email) {
    var regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return regex.test(email);
}

$(document).ready(function () {
    $("#togglePassword").click(function () {
        toggleVisibility("#password", this);
    });

    $("#toggleConfirmPassword").click(function () {
        toggleVisibility("#confirmpassword", this);
    });

    $("#submitbutton").click(function() {
        startTime = performance.now(); // Start timing

        validateForm();

        endTime = performance.now(); // Stop timing
        var reactionTime = (endTime - startTime).toFixed(2); // Calculate reaction time

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

    // Check required fields
    if ($("#Email").val().trim() === "") {
        missingFields.push("Email is required.");
    }
    if (!/^\d{10}$/.test($("#phoneno").val())) {
        missingFields.push("Phone number must be exactly 10 digits.");
    }
    if ($("#password").val().trim() === "") {
        missingFields.push("Password is required.");
    }

    // Validate email format
    if (!isEmail($("#Email").val().trim())) {
        errormessage.push("Invalid email format.");
    }

    // Validate password strength
    var password = $("#password").val();
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
        errormessage.push("Password must be at least 8 characters, include an uppercase, lowercase, and a number.");
    }

    // Validate password confirmation
    if ($("#password").val() !== $("#confirmpassword").val()) {
        errormessage.push("Passwords do not match.");
    }
}

function displayMessages(reactionTime) {
    if (errormessage.length === 0 && missingFields.length === 0) {
        $("#errors").hide();
        $("#success").html(`✅ You are registered! Reaction time: ${reactionTime} ms`).fadeIn();
    } else {
        $("#success").hide();
        $("#errors").html([...errormessage, ...missingFields].map(msg => `<p>${msg}</p>`).join("")).fadeIn();
    }
}