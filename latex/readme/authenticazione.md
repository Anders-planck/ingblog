```plantuml
@startuml
state "Start" as start
state "GitHub Login" as github_login
state "Google Login" as google_login
state "Email Magic Link" as email_magic_link
state "Fetch User (GitHub)" as fetch_github
state "Fetch User (Google)" as fetch_google
state "Fetch User (Email)" as fetch_email
state "Creating User (GitHub)" as create_github
state "Creating User (Google)" as create_google
state "Creating User (Email)" as create_email
state "Saving to DB" as saving
state "Redirect to Home Page" as redirect
state "Authentication Success" as success

start --> github_login : User chooses GitHub
start --> google_login : User chooses Google
start --> email_magic_link : User chooses Email

github_login --> fetch_github : User logs in
google_login --> fetch_google : User logs in
email_magic_link --> fetch_email : User logs in

fetch_github --> create_github : User not in DB
fetch_google --> create_google : User not in DB
fetch_email --> create_email : User not in DB

fetch_github --> redirect : User in DB
fetch_google --> redirect : User in DB
fetch_email --> redirect : User in DB

create_github --> saving : New user
create_google --> saving : New user
create_email --> saving : New user

saving --> redirect : User data saved
redirect --> success : User authenticated
@enduml                                                                                                     +-------------------+
```
Descrizione del Diagramma:
Start: Stato iniziale quando l'utente arriva sulla pagina di login.

GitHub Login / Google Login / Email Magic Link: Stati intermedi per gestire l'autenticazione con i diversi provider.

Fetch User (GitHub) / Fetch User (Google) / Fetch User (Email): Stati intermedi per recuperare i dati dell'utente dal database.

Creating User (GitHub) / Creating User (Google) / Creating User (Email): Stati intermedi per creare un nuovo utente nel database se l'utente non esiste già.

Saving to DB: Stato in cui i dati dell'utente vengono inviati al server di database per il salvataggio.

Redirect to Home Page: Stato in cui l'utente viene reindirizzato alla home page dopo l'autenticazione.

Authentication Success: Stato finale che indica che l'utente è stato autenticato con successo.

Dettagli del Processo di Autenticazione:
L'utente inizia l'autenticazione scegliendo tra l'accesso tramite GitHub, Google o con un magic link via email.

Dopo aver effettuato l'accesso tramite il provider scelto o tramite il magic link, il sistema controlla se l'utente è già presente nel database.

Se l'utente esiste, viene effettuato il reindirizzamento alla home page.

Se l'utente non esiste, viene creato un nuovo profilo utente nel database.

I dati dell'utente (come nome utente, email, ID del provider esterno, ecc.) vengono salvati nel database.

Dopo il salvataggio nel database, l'utente viene reindirizzato alla home page.

Se l'utente è autenticato con successo, viene visualizzato uno stato di autenticazione riuscita.
