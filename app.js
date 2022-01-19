document.getElementById("loan-form").addEventListener("submit", (e) => {
  //Hide results
  document.getElementById("results").style.display = "none";

  //Hide loader
  document.getElementById("loading").style.display = "block";

  //set timeout for loader
  setTimeout(calculateResults, 2500);

  e.preventDefault();
});

function calculateResults() {
  console.log("Calculating...");

  const UIamount = document.getElementById("amount");
  const UIinterest = document.getElementById("interest");
  const UIyears = document.getElementById("years");
  const UImonthlyPayment = document.getElementById("monthly-payment");
  const UItotalPayment = document.getElementById("total-payment");
  const UItotalInterest = document.getElementById("total-interest");

  const principal = parseFloat(UIamount.value);
  const calculatedInterest = parseFloat(UIinterest.value) / 100 / 12;
  const calculatedPayments = parseFloat(UIyears.value) * 12;

  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    UImonthlyPayment.value = monthly.toFixed(2);
    UItotalPayment.value = (monthly * calculatedPayments).toFixed(2);
    UItotalInterest.value = (monthly * calculatedPayments - principal).toFixed(
      2
    );
    //Show Results
    document.getElementById("results").style.display = "block";
  } else {
    showError("Please Check your numbers");
  }

  //Hide Loader
  document.getElementById("loading").style.display = "none";
}

function showError(error) {
  //create div for error
  let errorDiv = document.createElement("div");

  //Get elements
  let card = document.querySelector(".card");
  let heading = document.querySelector(".heading");

  //Give styling
  errorDiv.className = "alert alert-danger";

  //Add error message
  errorDiv.appendChild(document.createTextNode(error));

  //Insert card before heading
  card.insertBefore(errorDiv, heading);

  //set timeout for error
  setTimeout(clearError, 3000);
}

//clear Error
function clearError() {
  document.querySelector(".alert").remove();
}
