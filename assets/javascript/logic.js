$(document).ready(function () {

    $('#submit').on("click", function (e) {

        e.preventDefault();

        var contactName = $('#nameInput').val().trim();
        var contactEmail = $('#emailInput').val().trim();
        var contactMessage = $('#messageInput').val();
        
        $('#errorHeader1').empty();
        validateForm();
        
        

        function validateEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }

        function clearFields() {
            $('form').find('input').val('');
            $('form').find('textarea').val('');
        }

        function validateForm() {
            if (contactName === '' || contactEmail === '' || contactMessage === '') {
                $('#errorHeader1').text("All fields are required.");
            }
            else {
                validateEmail(contactEmail);

                if (validateEmail(contactEmail)) {
                    $('#errorHeader1').text("Your information has been successfully submitted. Thank you.");
                    clearFields();
                    writeToDatabase();
                }
                else {
                    $('#errorHeader1').text("Please enter a valid email.");
                    return;
                }
            }
        };

        function writeToDatabase() {
            var contactRef = firebase.database().ref().push("Contacts/");
            contactRef.set({
                name: contactName,
                email: contactEmail,
                message: contactMessage,
            });
        }
        })
    })