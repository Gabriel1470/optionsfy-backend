# spacejim-backend
/*ERRORI CONTROLLI SIGN-UP*/

// SIGN 1: Non sono arrivati i dati richiesti.
// SIGN 2: Non sono stati accettati termini e condizioni
// SIGN 3: La mail non è stata inserita correttamente.
// SIGN 4.1: La password non contiene simboli speciali.
// SIGN 4.2: La password non contiene caratteri maiuscoli
// SIGN 4.3: La password non contiene numeri.
// SIGN 5: Il server ha rilevato un duplicato nel DB.

// SIGN 6: (Generico) Uno dei controlli non è andato a buon fine.

/*ERRORI CONTROLLI AUTENTICAZIONE*/

// AUTH 1: (Generico) Non c'è stato riscontro nel DB.
// AUTH 1.1: L'email non è presente nel DB.
// AUTH 1.2: La password non corrisponde all'utente nel DB.

/*ERRORI CONTROLLI INVIO EMAIL*/

// EMAIL 1: Non sono arrivati i dati richiesti.
// EMAIL 1.2: Alcuni campi sono arrivati come stringhe vuote.
// EMAIL 1.3: L'email non rispetta il regex.
// EMAIL 2: Il routing ha un parametro entrato in default

/*ERRORI CONTROLLO BOZZE*/

// BOZZE 1: Non sono arrivate tutte le chiavi, oppure non è una bozza
// BOZZE 1.2: Il corpo della bozza è una stringa vuota
