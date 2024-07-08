# Event Management App

## Description
Ce projet est une application de gestion d'événements développée dans le cadre d'un test technique pour une embauche chez Kumojin. L'application permet de créer, afficher et gérer des événements via une interface utilisateur et une API REST.

## Prérequis
- Node.js (version 14 ou supérieure)
- MongoDB (local ou en ligne)
- npm (version 6 ou supérieure) ou yarn

## Installation

### Configuration et Exécution du Projet

1. **Cloner le dépôt** :
    ```bash
    git clone https://github.com/AmineNait/event-management-app.git
    cd event-management-app
    ```

2. **Installer les dépendances du backend** :
    ```bash
    cd backend
    npm install
    ```

3. **Démarrer le serveur backend** :
    ```bash
    npm start
    ```

4. **Installer les dépendances du frontend** :
    ```bash
    cd ../frontend
    npm install
    ```

5. **Démarrer l'application frontend** :
    ```bash
    npm start
    ```

### Utilisation de MongoDB Compass

MongoDB Compass est une interface graphique pour gérer vos bases de données MongoDB. Voici comment l'utiliser pour vérifier votre base de données pour ce projet :

1. **Télécharger MongoDB Compass** :
   - Visitez [https://www.mongodb.com/try/download/compass](https://www.mongodb.com/try/download/compass) et téléchargez MongoDB Compass pour votre système d'exploitation.

2. **Installer MongoDB Compass** :
   - Suivez les instructions de l'installateur pour installer MongoDB Compass sur votre machine.

3. **Démarrer MongoDB Compass** :
   - Ouvrez MongoDB Compass.

4. **Se connecter à MongoDB** :
   - Dans l'écran de connexion, entrez l'URI de connexion suivante :
     ```plaintext
     mongodb://localhost:27017
     ```
   - Cliquez sur "Connect".

## Tests

### Tests Backend

1. Dans le dossier `backend`, lancez les tests:
    ```bash
    npm test
    ```

### Tests Frontend

1. Dans le dossier `frontend`, lancez les tests:
    ```bash
    npm test
    ```

## Documentation de l'API

La documentation de l'API est générée automatiquement avec Swagger.

1. Assurez-vous que le serveur backend est en cours d'exécution.
2. Ouvrez un navigateur et accédez à:
    ```plaintext
    http://localhost:3000/api-docs
    ```

## Structure des Dossiers

### Backend

backend/
├── src/
│   ├── app.ts
│   ├── middleware/
│   │   └── errorHandler.ts
│   ├── models/
│   │   └── Event.ts
│   ├── routes/
│   │   └── events.ts
│   ├── swagger.ts
│   └── tests/
│       └── routes/
│           └── events.test.ts
├── package.json
├── tsconfig.json
└── README.md


- `src/models`: Définit les schémas Mongoose pour les événements.
- `src/routes`: Contient les routes de l'API REST.
- `src/middleware`: Contient les middlewares personnalisés.
- `src/tests`: Contient les tests unitaires et d'intégration.

### Frontend

frontend/
├── src/
│   ├── components/
│   │   ├── EventCalendar.tsx
│   │   ├── EventDetailsModal.tsx
│   │   ├── EventForm.tsx
│   │   ├── EventList.tsx
│   │   ├── Header.tsx
│   │   └── styles.ts
│   ├── App.tsx
│   ├── index.css
│   ├── index.tsx
│   ├── types.ts
│   └── tests/
│       ├── EventCalendar.test.tsx
│       ├── EventDetailsModal.test.tsx
│       ├── EventForm.test.tsx
│       ├── EventList.test.tsx
│       └── Header.test.tsx
├── package.json
├── tsconfig.json
└── README.md

- `src/components`: Contient les composants React.
- `src/tests`: Contient les tests unitaires pour les composants.

## Gestion des Erreurs
Le middleware de gestion des erreurs est situé dans `src/middleware/errorHandler.ts` et est utilisé pour capturer et gérer les erreurs au niveau de l'application.

## Contributions
Les contributions ne sont pas acceptées pour ce projet car il est destiné à un test technique d'embauche.

## Contact
Pour toute question, veuillez contacter [amine.naitlechguer@gmail.com].

---

Merci de votre intérêt pour ce projet !
