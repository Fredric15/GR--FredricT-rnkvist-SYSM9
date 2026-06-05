# ⚽ Football Store (Fullstack E-handel)

En modern webbshop för fotbollströjor byggd med React, Node.js, Express och MongoDB. Applikationen låter användare bläddra bland tröjor från olika ligor (Allsvenskan, Serie A, Premier League etc.), söka efter specifika lag eller liga, lägga till produkter i varukorg och spara favoriter på sin profil.

## 🛠 Tech Stack

- **Frontend:** React, React Router, Context API, CSS
- **Backend:** Node.js, Express.js
- **Databas:** MongoDB & Mongoose
- **Säkerhet:** JSON Web Tokens (JWT) och bCrypt för inlogging/password

## 🚀 Kom igång lokalt

Följ dessa steg för att starta projektet på din egen dator.

### Förkrav

För att kunna köra projektet behöver du ha följande installerat på din dator:

- Du behöver ha Node.js installerat. (version 16 eller senare)
- En lokal MongoDb-server eller ett konto hos [MongoDB Atlas](https://www.mongodb.com/atlas)

### 1. Klona projektet

Öppna din terminal och klona ner repot till din dator:

```bash
git clone https://github.com/Fredric15/GR--FredricT-rnkvist-SYSM9
cd GR--FredricT-rnkvist-SYSM9
```

### 2. Installera beroenden (Dependencies)

Eftersom `node_modules` inte följer med koden måste du installera alla paket för både backend och frontend.

**För Backend:**

```bash
cd football-store-backend
npm install
```

**För Frontend:** (Öppna en ny terminal)

```bash
cd football-store-frontend
npm install
```

### 3. Sätt upp Miljövariabler (Environment Variables)

För att koppla appen till en databas och hantera inloggning måste du skapa en `.env`-fil i rooten av din Backend.

Skapa filen `.env` och klistra in följande:

```
PORT=5000
CONNECTION_STRING=din_mongodb_connection_string_här
ACCESS_TOKEN_SECRET=hitta_på_en_egen_hemlig_nyckel
```

### 4. Seeda databasen

Innan du startar applikationen behöver du fylla databasen med fotbollströjor och en standardanvändare. Öppna din backend-terminal och se till att du befinner dig i `backend`-mappen och kör detta kommando:

```bash
node seeder.js
```

En seedad user med dessa uppgifter kommer att skapas i databasen:

- **Email:** `user@test.com`
- **Lösenord:** `000000`

### 5. Starta applikationen

Nu är allt redo! Du behöver starta både servern och klienten samtidigt i två olika terminalfönster.

**Starta Backend:**

```bash
cd football-store-backend
npm run dev
```

_Servern bör nu köra på http://localhost:5000_

**Starta Frontend:**

```bash
cd football-store-frontend
npm run dev
```

_Klienten bör nu öppnas i din webbläsare (oftast på http://localhost:5173)_

## ✨ Funktioner

- [x] Sökfunktion för att hitta specifika lag och ligor.
- [x] Filtrering och sortering av produkter (pris, bokstavsordning).
- [x] Responsiv design med utfällbar mobilsökning.
- [x] Kundvagn som håller koll på totalpris och antal varor.
- [x] Användarautentisering (Registrera / Logga in).
- [x] Favoritlista kopplad till inloggade användare.

## 👨‍💻

Började först med design i Figma för att sedan bygga detta som ett fullstack-projekt för att demonstrera kunskaper i MERN-stacken (MongoDB, Express, React, Node.js).
