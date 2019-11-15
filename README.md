# Examen Mercado Libre

Resolución a ejercicio de ingreso para Mercado Libre

### Project Setup

Para comenzar debemos tener instalada la version 12 LTS de Node.js (https://nodejs.org/en/). Luego de esto
podemos seguir con los siguientes pasos.
1. git clone https://github.com/hack2024/meli-exercice.git
2. `npm install -g firebase-tools`
3. cd meli-exercice
4. Instalar dependencias y ejecutar
   ```
   cd functions
   npm install
   ```
5. `export GOOGLE_APPLICATION_CREDENTIALS=/PATH TO service-account.json/`
6. `firebase functions:config:get > .runtimeconfig.json`
7. `npm run serve`

Con el comando `npm run serve` dejamos levantado de manera local los endpoints para poder validar si un humano es mutante o no,
las estadisticas y un listado de las sequencias de ADN que se han ido gurdando en base de datos.

### Endpoints Locales

```
http://localhost:5000/meli-exercice/us-central1/mutant
http://localhost:5000/meli-exercice/us-central1/stats
http://localhost:5000/meli-exercice/us-central1/list
```

### Endpoints Remotos

```
https://us-central1-meli-exercice.cloudfunctions.net/mutant
https://us-central1-meli-exercice.cloudfunctions.net/stats
https://us-central1-meli-exercice.cloudfunctions.net/list
```

### Stack Tecnológico

`Google Cloud Functions`
`Google Cloud Firestore`
`Google Cloud Pub/Sub`
`Algolia Search API`
