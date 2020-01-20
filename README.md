# cocuocr

OCR implementation to read the Corda Cuisine menu and spit it out as JSON.

Inspired by my good friend [Jan Pecquet](https://github.com/pekket)'s [Cocubo](https://github.com/Pekket/Cocubo). Basically just adding the -Script to his Java (going for a 100% JavaScript implementation whereas his is 100% Java).

WIP 👨‍💻

----

### Run app for development:

- Set up a MongoDB with Docker (not required if MongoDB is installed locally):
```
docker-compose run --service-ports cocudb
```
- Run the app in development mode (hot relead enabled):
```
npm install && npm run dev
```

### Run app for production

#### With Docker
- Build the cocuapi Docker image:
```
npm run docker:build
```
- Run the MongoDB and cocuapi app images:
```
docker-compose up
```

#### Without Docker
- Install dependencies and run the start script:
```
npm install && npm run start
```
Make sure MongoDB is running. Configure connection details in a `.env` file.
