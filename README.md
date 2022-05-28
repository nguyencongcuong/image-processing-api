This is an Image Processing API. The project was built as an assignment in Udacity's course.

## SCRIPTS

    "start": "npm run clean && nodemon ./src/index.ts",
    "build": "npm run clean && npx tsc",
    "clean": "rimraf dist/ public/images/thumb/* .cache",
    "test": "npm run build && npx jasmine",
    "eslint": "npx eslint src/* --ext .ts",
    "prettier": "npx prettier --write src/**/*.ts"

## LOCAL SERVER

http://localhost:3000/

## ENDPOINTS

http://localhost:3000/

http://localhost:3000/images/resize

**Usage 01**

- http://localhost:3000/
- Will display a welcome message to user.

**Usage 02**

- http://localhost:3000/images/size?name=fjord&width=800&height=500
- Will resize image to size 800x500.
- Will save image to ./public/images/thumb with name: **fjord-800x500.jpg**.
- Will write a record to ./cache/resized-images.txt to cache the image.
- Will display the image to user.
- In case the image has a relative record in ./cache/resized-images.txt, will skip resizing, saving then display image from saved storage.

**Usage 03**

- http://localhost:3000/images/size?name=someNameNotFound&width=800&height=500
- Will display a 'Not Found' message to user and log to developer

**Usage 04**

- http://localhost:3000/images/size?name=fjord&width=800&height-500
- Will display an error for invalid query typing

## NOTES

- Original image are stored at: *./public/images/full*
- Resized images are stored at: *./public/images/thumb*
- Cached images (records for resized images) are stored at: *./.cache/resized-images.txt*
- Accepted query for `name`
  - encenadaport
  - fjord
  - icelandwaterfall
  - palmtunnel
  - santamonica
- Accepted query for `width`: > 0
- Accepted query for `height`: > 0
- Only support `.jpg` format
- Should start the service with NodeJS from `v16.x`