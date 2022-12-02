# Andescalada Monorepo

## Para comenzar

1. Instalar PlanetScale CLI

```console
brew install planetscale/tap/pscale
```

2. Hacer Login en PlanetScale 

```
pscale login
```

3. Cambiar a Organizacion en PlanetScale **elevy**

```console
pscale org switch elevy
```

4. Solicitar variables de entorno
###  Envs globales `"."`
```bash
DATABASE_URL=
AUTH0_DOMAIN=
AUTH0_AUDIENCE=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```
###  Envs expo-app `./apps/expo`

Crear un `.env.production` y `.env.development`

```bash
AUTH0_DOMAIN=
AUTH0_CLIENT_ID=
AUTH0_AUDIENCE=
CLOUDINARY_UPLOAD_PRESET=
CLOUDINARY_URL=upload
ROLLBAR_ACCESS_TOKEN=
```

## Comandos 

Correr `NextJs`, `PlanetScale` y `Expo` en ambiente `development`

```console
yarn dev 
```

Para filtrar alguna app correr agregar `--filter`

Ej 1: Correr solo NextJS
```bash
yarn dev --filter=@andescalada/nextjs
```

Ej 2: Correr todo menos Expo
```bash
yarn dev --filter=\!expo-app
```

Abrir Prisma Studio
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
- NextJS for web app (Coming soon...)

## Main Services 
- Expo Application Services (EAS) for app builds and updates
- Expo Notification Server for push notifications
- Vercel for web and api hosting
- PlanetScale for main MySql database
- Upstash for Back End cache Redis DB
- Cloudinary for Image management and DB
- Auth0 with Passwordless for Login 