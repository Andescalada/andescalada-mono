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



## Techs

- PlanetScale
- Cloudinary
- Auth0 -> Passwordless
- TRPC V10
- React Query
- Restyle 
- Zod 
- Realm (?)
- Yarn Workspaces
- Prisma
- Vercel
- NextJS
- Turborepo