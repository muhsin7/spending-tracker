# Spending Tracker

Major Group Project for 5CCS2SEG Software Engineering Group Project

Team All Good
- Muhsin Mohamed
- Huy (Filip) Phan
- Aron Kumarawatta
- Quan Tran
- Raymond Cheung
- Kai Ming Tey
- Joshua Wong
- Ling (Wesley) Teo
- George Ivanov

## Deployed product
The deployed version of the application can be found at https://spending-tracker-all-good.netlify.app/

Default access credentials for test user:
- Email: johndoe@example.com
- Password: 123

## References
Algorithm to convert from array buffer to base64 was taken from
https://stackoverflow.com/questions/38432611/converting-arraybuffer-to-string-maximum-call-stack-size-exceeded

## Installation
Detailed installation instructions can be found in the developer handbook PDF attached with the submission

The React client and Node server dependencies are to be installed separately.
NOTE: `npm` is included in Node.js installations



### Dependencies
To install server & client dependencies:
```bash
npm installAll
```

### Set up ./server/.env file
Example:
```
PORT = 3001
DB_URI = "DB URI HERE"
TEST_DB_URI = "TEST DB URI HERE"
CORS_ORIGIN = "http://localhost:8081"
JWT_SECRET = "JWT SECRET TOKEN HERE"
JWT_VALID_FOR = "30d"
```

## Usage

### Seed database
```bash
cd server
npm run seed
```

### Seed achievements
```bash
cd server
npm run seedAchievements
```

### Server
The commands to install dependencies and run the backend and frontend have been encapsulated in commands that can be run from the root directory:

Running the product (frontend & backend concurrently)
```bash
npm run start
```

Alternatively, you can run the backend and frontend separately with the below commands:

#### Start the backend server
```bash
cd server
npm run dev
```
#### Start the frontend client
```bash
cd client
npm run start
```


