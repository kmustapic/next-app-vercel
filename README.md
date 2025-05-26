Opis funkcionalnosti aplikacije: Pregled TV serija

**Početna stranica (page.js)**
Početna stranica prikazuje 20 najpopularnijih serija sortirano po prosječnoj ocjeni. 
Svaka serija ima prikaz slike, naziva i ocjene, te gumb u obliku srca (🤍/❤️) za dodavanje ili uklanjanje iz omiljenih serija.
Na vrhu stranice nalaze se gumbi za pristup 'Omiljenim serijama' i 'Pretrazi serije'.
Korisnik može klikom na seriju otići na detalje, ili klikom na 'Učitaj još' dohvatiti dodatne serije.

**Detalji serije (show/[id]/page.js)**
Ova stranica prikazuje detaljne informacije o seriji: sliku, naziv, ocjenu, status i sažetak radnje.
Tu se također nalazi opcija za dodavanje u favorite.
Korisnik može pregledavati epizode po sezonama i vidjeti sve glumce serije abecedno.

**Omiljene serije (favorites/page.js)**
Na ovoj stranici korisnik vidi grid svih serija koje je označio kao omiljene. 
Ako nema nijedne omiljene serije, prikazuje se poruka 'Trenutno nemate dodane omiljene serije.' 
Klikom na seriju korisnik se vraća na detalje te serije.

**Pretraga serija (search/page.js)**
Na ovoj stranici korisnik može unijeti pojam za pretragu serija. 
Prikazuju se rezultati sa slikom, nazivom i ocjenom serije. 
Ako nema rezultata, stranica je prazna, poželjno je da se korisniku prikazuje poruka. 
Klikom na rezultat (traženu seriju) korisnik dolazi do detalja serije.

**Globalne funkcionalnosti (loading.js, not-found.js)**
Ako aplikacija učitava podatke, prikazuje se univerzalna poruka 'Učitavanje...'.
Ako korisnik ode na nepostojeći URL, prikazuje se prilagođena 404 stranica s porukom o grešci.
