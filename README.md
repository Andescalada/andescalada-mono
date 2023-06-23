# Andescalada Monorepo

[![Update Preview](https://github.com/Andescalada/andescalada-mono/actions/workflows/update-preview.yml/badge.svg?branch=main&event=deployment_status)](https://github.com/Andescalada/andescalada-mono/actions/workflows/update-preview.yml)

[![Update Production](https://github.com/Andescalada/andescalada-mono/actions/workflows/update-production.yml/badge.svg?branch=production&event=deployment_status)](https://github.com/Andescalada/andescalada-mono/actions/workflows/update-production.yml)

## I want to contribute

If you really want to contribute write me an email with the subject "I want to contribute" and I give you access to our services and env variables.

## I want to run this project local:

1. Create accounts

You'll need to create an account in: 
 - PlanetScale
 - Upstash 
 - Cloudinary
 - Auth0
 - Sentry
 - Google (for maps)
 

1. Add .env variables 

In the .env at the root of the project

`.env`
```bash
DATABASE_URL=""
AUTH0_DOMAIN=""
AUTH0_AUDIENCE=""
AUTH0_AUDIENCE=""
AUTH0_NEXTJS_CLIENT_ID=""
AUTH0_NEXTJS_CLIENT_SECRET=""
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
UPSTASH_REDIS_REST_URL=""
UPSTASH_REDIS_REST_TOKEN=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
```

`apps/expo/.env`
```bash
SENTRY_AUTH_TOKEN=""
GOOGLE_MAPS_API_KEY_ANDROID=""
GOOGLE_MAPS_API_KEY_IOS=""
CLOUDINARY_API_KEY=""
```




## In either case: 

1. Install PlanetScale CLI

```console
brew install planetscale/tap/pscale
```

2. Login to PlanetScale in the CLI

```
pscale login
```

3. Switch to your org or Andescalada org named **elevy**

```console
pscale org switch elevy
```

4. Run the project

```console
  yarn dev
```



## Useful scripts  

Run `NextJs`, `PlanetScale` y `Expo`  in `development`

```console
yarn dev 
```

Filter an app or package from starting `--filter`

Ej 1: RUn NextJS only
```bash
yarn dev --filter=@andescalada/nextjs
```

Ej 2: Run everything but expo
```bash
yarn dev --filter=\!expo-app
```

Open Prisma Studio
```bash 
prisma studio  
```



## Main Techs 

- Typescript as main source code language
- TRPC V10 for API
- React Query for Front End state management
- Restyle for UI and Front End styling
- React Native SKIA for graphics rendering
- Zod for validation and typing
- React Native Quick SQLite for local databases
- Yarn Workspaces for monorepo management
- Turborepo for monorepo cache management
- Prisma for database schema management
- NextJS for web app

## Main Services 
- Expo Application Services (EAS) for app builds and updates
- Expo Notification Server for push notifications
- Github actions for CI/CD
- Vercel for web and api hosting
- PlanetScale for main MySql database
- Upstash for Back End cache Redis DB
- Cloudinary for Image management and DB
- Auth0 with Passwordless for Login 
- Mailgun as mailing server
- Sentry for error logging

## License  

Software: andescalada-mono

License: GNU AGPLv3 with Commons Clause

Licensor: Fundación Andescalada