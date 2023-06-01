Apartment Booking APIs

## Description

Basic apartment booking apis

## ToDos

- [x] Develop `/room` route (list/create/edit/delete)
  - [x] Show available rooms base on time frame
    - [] Add support if start or end query is missing
  - [] Add unit tests
- [x] Develop `/image` route (list/create)
  - [] Add unit tests
- [x] Develop `/booking` route
  - [] Add unit tests
- [] Add e2e tests
- [] Add validations

## How

- To create a room with image you need to:
  + Create (upload) an image through POST /image API via form. You will receive the image id back, put this id into POST /room payload
  e.g. payload for creating room
  ```
  {
    "type": "single bed",
    "description": "new apartment",
    "imageId": "03e23891-c9a6-45a0-880e-1a9a269fbe1f", (replace the image id here)
    "price" :50,
    "quantity": 7
  } 
  ```
- To list all available room in time frame use GET /v1/rooms?start=YYYY-MM-DD&end=YYYY-MM-DD
- To book multiple rooms, retrieve room ids via GET /v1/rooms?start=YYYY-MM-DD&end=YYYY-MM-DD, put room ids to POST /v1/booking payload
  e.g. payload for booking
  ```
  {
    "adminId": "123",
    "customerId": "456",
    "checkin": "2023-07-20",
    "checkout": "2023-07-21",
    "rooms": ["0cd94466-8d23-40a5-b923-18662e3eb0a9"] (put room ids here)
  }
  ```
## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

