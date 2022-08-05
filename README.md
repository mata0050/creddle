This is a live [creddle.vercel.app](https://creddle.vercel.app/)

# Getting Started

This is a creddle clone project built using the following technology ***NextJs***, ***Tailwind***, ***tRCP***, ***Prisma***, ***MySQL***, ***Typescript***
## Step 1

install dependencies

```bash
  npm install
```

## Step 2

Create a .env file and add the following

```env
DATABASE_URL="mysql://localhost:3306/creddle"
``` 

## Step 3

Create an account a [planetscale.com](https://planetscale.com/) and create a new database called **_creddle_**. Go to your terminal and login using:

```bash
  npm run db:login
```

## Step 4

Push prisma scheme to Database

```bash
  npm run db:push
```

## Step 5

Connect to Database

```bash
  npm run db:connect
```

## Step 6

Start app

```bash
  npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

![Screenshot 2022-08-02 at 5 37 01 PM](https://user-images.githubusercontent.com/58061791/182478800-0617da74-518b-48a0-88fc-e588226d9de0.png)

## Bugs and Fixes To Work On

- [ ] Education delete is not refreshing data.
- [ ] Add skill button current user id not being passed.
- [ ] Side Nav not linked
- [ ] Add different themes
- [ ] Add Auth
