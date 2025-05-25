Opis funkcionalnosti aplikacije: Pregled TV serija

**Početna stranica (page.js)**
Početna stranica prikazuje 20 najpopularnijih serija sortirano po prosječnoj ocjeni. Svaka serija ima prikaz slike, naziva i ocjene, te gumb u obliku srca (🤍/❤️) za dodavanje ili uklanjanje iz omiljenih serija. Na vrhu stranice nalaze se gumbi za pristup 'Omiljenim serijama' i 'Pretrazi serije'. Korisnik može klikom na seriju otići na detalje, ili klikom na 'Učitaj još' dohvatiti dodatne serije.

**Detalji serije (show/[id]/page.js)**
Ova stranica prikazuje detaljne informacije o seriji: sliku, naziv, žanrove, ocjenu, status i sažetak radnje. Tu se također nalazi srce za dodavanje u favorite, kao i izbornik s osnovnim funkcijama (Povratak, Epizode, Glumci, Favoriti). Dodatno, korisnik može pregledavati epizode po sezonama i vidjeti sve glumce serije abecedno.

**Omiljene serije (favorites/page.js)**
Na ovoj stranici korisnik vidi grid svih serija koje je označio kao omiljene. Ako nema nijedne omiljene serije, prikazuje se poruka 'Trenutno nemate dodane omiljene serije.' Klikom na seriju korisnik se vraća na detalje te serije.

**Epizode serije (show/[id]/episodes/page.js)**
Prikazuje popis svih epizoda za odabranu seriju. Svaka epizoda prikazuje ime, broj, sezonu, datum prikazivanja, sliku i opis ako postoji. Omogućuje bolji uvid u sadržaj serije izvan osnovnog prikaza po sezonama.

**Glumci serije (show/[id]/cast/page.js)**
Stranica s prikazom svih glumaca koji glume u toj seriji. Za svakog glumca prikazuje se slika (ako postoji), ime i ime lika kojeg glumi. Podaci se prikazuju u grid formatu za preglednost.

**Pretraga serija (search/page.js)**
Na ovoj stranici korisnik može unijeti pojam za pretragu serija. Prikazuju se rezultati sa sličicom, nazivom i ocjenom serije. Ako nema rezultata, korisniku se prikazuje poruka. Klikom na rezultat korisnik dolazi do detalja serije.

**Globalne funkcionalnosti (loading.js, not-found.js)**
Ako aplikacija učitava podatke, prikazuje se univerzalna poruka 'Učitavanje...'. Ako korisnik ode na nepostojeći URL, prikazuje se prilagođena 404 stranica s porukom o grešci.
