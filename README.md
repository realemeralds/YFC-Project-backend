# Project Prima

On behalf of a client, I designed this website, which was meant to raise awareness for Project Prima, and the efforts of the Dyslexia Association of Singapore.
This project was completed over two weeks, and was my first foray into Next.js.

The website is available at https://projprima.com, and will only be taken down on July 23th, 2023.
Before then, feel free to tinker with the source code with the build instructions below.

Contributions are welcome <3

## Technologies Used

This project used a MENN stack (_but not the conventional one_)

- Memcachier for data storage / caching
- Express and Node.js for the backend web server (source code not public for security reasons)
- Next.js for the frontend

Besides that, other complementary technologies were used:

- Figma to coordinate wireframes with client (https://www.figma.com/community/file/1133098826882260978)
- Heroku to host the backend
- Vercel to host the frontend, and to do DNS routing
- Embla Carousel API for the carousel elements (merch and projects)

## Build Instructions

```
npm install -D tailwindcss postcss postcss-import autoprefixer sass
npx tailwindcss init -p

npm run dev
or
yarn dev
```
