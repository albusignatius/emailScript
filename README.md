# emailScript
A short script written to send emails using Node.js to a given email address.

Notes:

You must first enable the GmailAPI.
Run the authenticateUrl js in any suitable method and follow the link that is given as output.
You will get an authentication code. Copy the code and run the authenticateToken file with the authentication code in inverted commas.
ex: node authenticateToken.js "<your authentication code here>"
  
Edit the send_mail js accordingly and execute it to send the mail.



