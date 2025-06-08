var errormessage = "";
var missingfeild = "";
var startTime, endTime;

function isEmail(email) {
    var regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return regex.test(email);
}

$("#submitbutton").click(function(){
    startTime = performance.now(); // Start timing

    errormessage = ""; // Reset errors
    missingfeild = ""; // Reset missing fields

    // Check required fields
    if($("#Email").val() === ""){
        missingfeild += "<p>Email is required.</p>";
    }
    if($("#phoneno").val().length !== 10){
        missingfeild += "<p>Phone number must be exactly 10 digits.</p>";
    }
    if($("#password").val() === ""){
        missingfeild += "<p>Password is required.</p>";
    }

    // Validate email format
    if(!isEmail($("#Email").val())){
        errormessage += "<p>Invalid email format.</p>";
    }
    
    // Validate password strength
    var password = $("#password").val();
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if(!passwordRegex.test(password)){
        errormessage += "<p>Password must be at least 8 characters, include an uppercase, lowercase, and a number.</p>";
    }

    // Validate password confirmation
    if($("#password").val() !== $("#confirmpassword").val()){
        errormessage += "<p>Passwords do not match.</p>";
    }

    endTime = performance.now(); // Stop timing
    var reactionTime = (endTime - startTime).toFixed(2); // Calculate reaction time

    // Display messages
    if(errormessage === "" && missingfeild === ""){
        $("#errors").hide(); // Hide error box if no errors
        $("#success").html("✅ You are registered! Reaction time: " + reactionTime + " ms").fadeIn();
    } else {
        $("#success").hide(); // Hide success box if errors exist
        $("#errors").html(errormessage + missingfeild).fadeIn();
    }
});