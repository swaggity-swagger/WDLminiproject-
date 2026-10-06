const form = document.getElementById("form");

if (form) {

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        clearErrors();

        let name = document.getElementById("name").value.trim();
        let dob = document.getElementById("dob").value;
        let mobile = document.getElementById("mobile").value.trim();
        let email = document.getElementById("email").value.trim();
        let address = document.getElementById("address").value.trim();
        let blood = document.getElementById("blood").value;
        let department = document.getElementById("department").value;
        let test = document.getElementById("test").value;
        let regDate = document.getElementById("regDate").value;

        let genderElement = document.querySelector(
            'input[name="gender"]:checked'
        );

        let gender = genderElement ? genderElement.value : "";

        let valid = true;

        // Name validation
        if (name === "") {
            showError("nameError", "Patient name is required");
            valid = false;
        }
        else if (!/^[A-Za-z ]+$/.test(name)) {
            showError(
                "nameError",
                "Name should contain only letters and spaces"
            );
            valid = false;
        }

        // DOB validation
        if (dob === "") {
            showError("dobError", "Date of birth is required");
            valid = false;
        }
        else if (dob > getToday()) {
            showError(
                "dobError",
                "Date of birth cannot be in the future"
            );
            valid = false;
        }

        // Gender
        if (gender === "") {
            showError("genderError", "Please select gender");
            valid = false;
        }

        // Blood group
        if (blood === "") {
            showError("bloodError", "Please select blood group");
            valid = false;
        }

        // Mobile
        if (!/^[6-9][0-9]{9}$/.test(mobile)) {
            showError(
                "mobileError",
                "Enter a valid 10-digit mobile number"
            );
            valid = false;
        }

        // Email
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showError(
                "emailError",
                "Enter a valid email address"
            );
            valid = false;
        }

        // Address
        if (address === "") {
            showError("addressError", "Address is required");
            valid = false;
        }

        // Department
        if (department === "") {
            showError(
                "departmentError",
                "Please select department"
            );
            valid = false;
        }

        // Test
        if (test === "") {
            showError(
                "testError",
                "Please select test"
            );
            valid = false;
        }

        // Registration date
        if (regDate === "") {
            showError(
                "dateError",
                "Registration date is required"
            );
            valid = false;
        }
        else if (regDate > getToday()) {
            showError(
                "dateError",
                "Registration date cannot be in the future"
            );
            valid = false;
        }

        if (!valid) {
            document.getElementById("success").textContent = "";
            return;
        }

        // Calculate age
        let age = calculateAge(dob);

        // Dynamic Patient ID
        let patientId = generatePatientId();

        // Save patient information
        let patient = {
            name: name,
            patientId: patientId,
            age: age,
            gender: gender,
            bloodGroup: blood,
            mobile: mobile,
            email: email,
            address: address,
            department: department,
            test: test,
            registrationDate: regDate
        };

        localStorage.setItem(
            "patientData",
            JSON.stringify(patient)
        );

        document.getElementById("success").textContent =
            "Patient registration successful!";

        showRegistrationDetails(patient);

        // Exp 5
        showRegistrationFee(patient);
        showAppointmentPriority(age);
        showPatientObject(patient);
        showAgeAnalysis();
        validatePatientDetails(
            name,
            mobile,
            email,
            patientId
        );
    });


    form.addEventListener("reset", function () {

        setTimeout(function () {

            clearErrors();

            document.getElementById("success").textContent = "";

            document.getElementById(
                "registrationOutput"
            ).innerHTML = "";

            document.getElementById(
                "exp5Output"
            ).innerHTML = "";

            document.getElementById(
                "priorityOutput"
            ).innerHTML = "";

            document.getElementById(
                "patientOutput"
            ).innerHTML = "";

            document.getElementById(
                "ageOutput"
            ).innerHTML = "";

            document.getElementById(
                "regexOutput"
            ).innerHTML = "";

        }, 0);
    });
}


// -------------------------
// Helper Functions
// -------------------------

function showError(id, message) {

    document.getElementById(id).textContent = message;
}


function clearErrors() {

    let errors = document.querySelectorAll(".error");

    errors.forEach(function (error) {
        error.textContent = "";
    });
}


function getToday() {

    let date = new Date();

    let month = String(date.getMonth() + 1).padStart(2, "0");

    let day = String(date.getDate()).padStart(2, "0");

    return date.getFullYear() + "-" + month + "-" + day;
}


function calculateAge(dob) {

    let birthDate = new Date(dob);

    let today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    let monthDifference =
        today.getMonth() - birthDate.getMonth();

    if (
        monthDifference < 0 ||
        (
            monthDifference === 0 &&
            today.getDate() < birthDate.getDate()
        )
    ) {
        age--;
    }

    return age;
}


function generatePatientId() {

    let number =
        Math.floor(1000 + Math.random() * 9000);

    return "PAT-" + number;
}


// -------------------------
// Dynamic Registration
// -------------------------

function showRegistrationDetails(patient) {

    document.getElementById(
        "registrationOutput"
    ).innerHTML =

        "<h3>Registered Patient</h3>" +

        "<p><strong>Name:</strong> " +
        patient.name +
        "</p>" +

        "<p><strong>Patient ID:</strong> " +
        patient.patientId +
        "</p>" +

        "<p><strong>Age:</strong> " +
        patient.age +
        "</p>" +

        "<p><strong>Gender:</strong> " +
        patient.gender +
        "</p>" +

        "<p><strong>Blood Group:</strong> " +
        patient.bloodGroup +
        "</p>" +

        "<p><strong>Mobile:</strong> " +
        patient.mobile +
        "</p>" +

        "<p><strong>Department:</strong> " +
        patient.department +
        "</p>" +

        "<p><strong>Test:</strong> " +
        patient.test +
        "</p>";
}


// -------------------------
// Exp 5 Task 1
// Registration Fee
// -------------------------

function showRegistrationFee(patient) {

    let consultationFee = 800;

    let registrationFee = 200;

    let total =
        consultationFee +
        registrationFee;

    let discount = 0;

    let status = "Regular Patient";

    if (patient.age >= 60) {

        discount = total * 0.10;

        status = "Senior Citizen - 10% Discount";
    }

    let finalAmount = total - discount;

    alert(
        "Patient: " +
        patient.name +
        "\nTotal Fee: ₹" +
        finalAmount
    );

    console.log(
        "Patient Name:",
        patient.name
    );

    console.log(
        "Patient ID:",
        patient.patientId
    );

    console.log(
        "Final Fee:",
        finalAmount
    );

    document.getElementById(
        "exp5Output"
    ).innerHTML =

        "<h3>Task 1 - Registration Fee</h3>" +

        "<p>Patient Name: " +
        patient.name +
        "</p>" +

        "<p>Patient ID: " +
        patient.patientId +
        "</p>" +

        "<p>Consultation Fee: ₹800</p>" +

        "<p>Registration Fee: ₹200</p>" +

        "<p>Discount: ₹" +
        discount +
        "</p>" +

        "<p><strong>Total Amount: ₹" +
        finalAmount +
        "</strong></p>" +

        "<p>Status: " +
        status +
        "</p>";
}


// -------------------------
// Exp 5 Task 2
// Appointment Priority
// -------------------------

function showAppointmentPriority(age) {

    let temperature = 38;

    let severity = "Moderate";

    let emergency = "No";

    let priority;

    if (emergency === "Yes") {

        priority =
            "Emergency Consultation Required";

    }
    else if (temperature >= 39) {

        priority =
            "High Priority Consultation";

    }
    else if (severity === "Severe") {

        priority =
            "High Priority Consultation";

    }
    else if (
        age >= 60 &&
        severity === "Moderate"
    ) {

        priority =
            "Priority Consultation";

    }
    else {

        priority =
            "Regular Consultation";
    }

    document.getElementById(
        "priorityOutput"
    ).innerHTML =

        "<h3>Task 2 - Appointment Priority</h3>" +

        "<p>Age: " +
        age +
        "</p>" +

        "<p>Temperature: " +
        temperature +
        "°C</p>" +

        "<p>Severity: " +
        severity +
        "</p>" +

        "<p>Emergency: " +
        emergency +
        "</p>" +

        "<p><strong>" +
        priority +
        "</strong></p>";
}


// -------------------------
// Exp 5 Task 3
// Patient Object
// -------------------------

function showPatientObject(patient) {

    let category;

    if (patient.age < 18) {

        category = "Minor";

    }
    else if (patient.age >= 60) {

        category = "Senior Citizen";

    }
    else {

        category = "Adult";
    }

    document.getElementById(
        "patientOutput"
    ).innerHTML =

        "<h3>Task 3 - Patient Object</h3>" +

        "<p>Patient Name: " +
        patient.name +
        "</p>" +

        "<p>Patient ID: " +
        patient.patientId +
        "</p>" +

        "<p>Age: " +
        patient.age +
        "</p>" +

        "<p>Gender: " +
        patient.gender +
        "</p>" +

        "<p>Blood Group: " +
        patient.bloodGroup +
        "</p>" +

        "<p>Mobile: " +
        patient.mobile +
        "</p>" +

        "<p>Department: " +
        patient.department +
        "</p>" +

        "<p>Appointment Type: Regular</p>" +

        "<p>Registration Status: Registered</p>" +

        "<p>Age Category: " +
        category +
        "</p>";
}


// -------------------------
// Exp 5 Task 4
// Age Array
// -------------------------

function showAgeAnalysis() {

    let patientAges =
        [22, 35, 67, 45, 29, 72, 56, 18, 64, 40];

    let minimum =
        Math.min(...patientAges);

    let maximum =
        Math.max(...patientAges);

    let total = 0;

    patientAges.forEach(function (age) {

        total += age;
    });

    let average =
        total / patientAges.length;

    let seniorCount =
        patientAges.filter(
            age => age >= 60
        ).length;

    let below18 =
        patientAges.filter(
            age => age < 18
        ).length;

    let above60 =
        patientAges.filter(
            age => age > 60
        );

    document.getElementById(
        "ageOutput"
    ).innerHTML =

        "<h3>Task 4 - Patient Age Analysis</h3>" +

        "<p>Minimum Age: " +
        minimum +
        "</p>" +

        "<p>Maximum Age: " +
        maximum +
        "</p>" +

        "<p>Average Age: " +
        average.toFixed(1) +
        "</p>" +

        "<p>Senior Citizens: " +
        seniorCount +
        "</p>" +

        "<p>Below 18: " +
        below18 +
        "</p>" +

        "<p>Age Above 60: " +
        above60.join(", ") +
        "</p>";
}


// -------------------------
// Exp 5 Task 5
// Regex Validation
// -------------------------

function validatePatientDetails(
    name,
    mobile,
    email,
    patientId
) {

    let valid = true;

    if (!/^[A-Za-z ]+$/.test(name)) {
        valid = false;
    }

    if (!/^[6-9][0-9]{9}$/.test(mobile)) {
        valid = false;
    }

    if (!/^PAT-[0-9]{4}$/.test(patientId)) {
        valid = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        valid = false;
    }

    let result =
        valid
        ? "Patient registration successful!"
        : "Patient registration failed.";

    document.getElementById(
        "regexOutput"
    ).innerHTML =

        "<h3>Task 5 - Regex Validation</h3>" +

        "<p>Name: Valid</p>" +

        "<p>Mobile: Valid</p>" +

        "<p>Patient ID: " +
        patientId +
        "</p>" +

        "<p>Email: Valid</p>" +

        "<p><strong>" +
        result +
        "</strong></p>";
}