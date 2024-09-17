// Initialize EmailJS with  user ID
(function() {
    emailjs.init("MFU7UUWlDOitGDBcd"); 
})();

document.getElementById("ticketForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const ticketCount = document.getElementById("ticketCount").value;
    const date = document.getElementById("date").value;

    const templateParams = {
        name: name,
        email: email,
        ticketCount: ticketCount,
        date: date
    };

    emailjs.send("service_sj0g0ja", "template_up557rl", templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            document.getElementById("thankYouMessage").classList.remove("hidden");
        }, function(error) {
            console.log('FAILED...', error);
        });
        alert(`${name} your ticket booked successfully`);
    document.getElementById("ticketForm").reset();
});

