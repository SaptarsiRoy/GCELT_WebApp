# FullStack GCELT WebApp using Nextjs 13 App Router , Typescript , Tailwind , Prisma , Mongodb , NextAuth
This is a repository for a Full Stack Website for GCELT 

## Key Feature
- [x] View Mode and User Mode Security Access
- [x] Implemented Theme Toggling Facility 
- [x] Showcasing All Students using card design 
- [x] TODO :  Implement Filtering and Searching Functionality
- [x] Showcasing All Faculty Members using card design
- [ ] TODO :  Implement Filtering and Searching Functionality here as well
- [x] Role Based Access : Three Roles - Students , Teachers , Admin
- [x] Assign Roles to Existing users by admin
- [x] Have Verification of Registered User Information Facility
- [x] New User SignUp , Redirect to Registration Form with Necessary Details 
- [x] Editing and updation Facility for Users who owned the Card as well as for Admins
- [ ] TODO: Referral Program implementation to request for Role update for users during registration
- [x] SignUp / SignIn and Logout Facility using NextAuth , NextSessions and Mongodb
- [ ] TODO : Launching New Role : CR and Assigning some special facility that students don't have
- [ ] TODO : Launch new updates with Routine navigation
- [ ] TODO :  Launch new updates with Exam navigation
- [ ] TODO : Teacher , CR and admin can Create Routine or update Routine
- [ ] TODO : More Future Updates


## Constraints to Our Project
- As We Don't have Separate Admin and User Interface, we have only 1 System. So We have to Implement a single Registration / SignIn Interface 
- But we have a Role Based System , so We develop the Interface such that new user are always by default students and they can upgrade to higher roles by admin or Referral Program 
- As a Single Interface We have to implement Midleware to Restrict Access to Confidential Routes

## Structure of our Project
- dir app : Root App Folder
   - dir actions : Contains all Service Methods which Fetch data from database using Prisma
   - dir api : Contains all Service Methods which push data to database , also contains NextAuth Logic
   - dir components :  Contains all Components : customUi , ui by shadcn , modals
   - dir type : contains types : users , Listings created from Collections
   - dir {routes} : routes can be (profile) ,  register , roles , verification

- dir hooks: Contains all custom hooks which specially controls opening and clossing of modals
- dir lib : utils and prisma client
- dir Prisma :  Contains  Schema file
- dir providers :  All Providers which we used to wrap components 
            Like AuthContext , ModalProvider , ToasterProvider

## Routes Mapping
- app home route :  /
- faculty route :  /faculty
- Routine route : /routine
- Exam route :  /exam
- signIn Route: /signIn
- Protected Routes : Security Purpose Don't want to Write in ReadMe

## Access Mode Features
- View  Mode
  - Can only view verified Cards , Routine , exam
- Student
  - Can Register for new login , 
  - can Edit their own Cards
  - In Future can Schedule their task in Routine Navigation
  - In Fututre Can Message any other existing User
  - Have a Update Limit upto 2 edits per month
- CR
    - Special Access to create and update Routine
    - Special Access to create and update exam schedule
- Teacher
  - can Register for new login
  - can Edit their own cards
  - can Send Push Notifications to Students
  - can Update and create routine and exam schedule
  - can verify students only
- Admin 
  - All Access except database access
- Institution Level : ``` Not Role ```
  -  Maintains and have All Access


![Website Screenshot](https://github.com/OPTIMUS-PRIME2001/MFRT_Project/blob/master/public/images/Website_%20Screenshot.jpeg)



### Prerequisites

**Node version 16.x**

### Cloning the repository

```shell
git clone https://github.com/OPTIMUS-PRIME2001/GCELT_WebApp.git
```

### Install packages

```shell
npm i
```

### Setup .env file


```js
# This was inserted by `prisma init`:
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL=''
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
STRIPE_API_KEY=
FRONTEND_STORE_URL=http://localhost:3001
STRIPE_WEBHOOK_SECRET=
```

### Connect to Azure SQL Database and Push Prisma
```shell
npx prisma generate
npx prisma db push
```

## Initial ReadMe Commit By Nextjs 13
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### Start the app

```shell
npm run dev
```

## Available commands

Running commands with npm `npm run [command]`

| command         | description                              |
| :-------------- | :--------------------------------------- |
| `dev`           | Starts a development instance of the app |