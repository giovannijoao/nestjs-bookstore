module.exports = {
   "name": "default",
   "type": "postgres",
   "host": "localhost",
   "port": 5432,
   "username": "postgres",
   "password": "docker",
   "database": "bookstore",
   "synchronize": false,
   "logging": false,
   "entities": ["dist/**/*.entity{.ts,.js}"],
   "dropSchema": false,
   "migrationsRun": false,
   "migrations": process.env.IGNORE_MIGRATIONS ? [] : [
      "./typeorm/migrations/*.ts"
   ],
   "cli": {
      "entitiesDir": "**/entities",
      "migrationsDir": "migrations"
   }
}