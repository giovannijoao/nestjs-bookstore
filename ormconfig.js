const isTsNode = process[Symbol.for('ts-node.register.instance')]
module.exports = {
   "name": "default",
   "type": "postgres",
   "host": process.env.DATABASE_HOST || 'localhost',
   "port": 5432,
   "username": process.env.DATABASE_USERNAME || "postgres",
   "password": process.env.DATABASE_PASSWORD || "docker",
   "database": process.env.DATABASE_DATABASE || "bookstore",
   "synchronize": false,
   "logging": true,
   "entities": [__dirname + "/**/*.entity.js"],
   "dropSchema": false,
   "migrationsRun": true,
   "migrations": [
      `./${process.env.RUNNING ? 'dist' : 'src'}/shared/infra/typeorm/migrations/*{.js,.ts}`
   ],
   "cli": {
      "entitiesDir": "**/entities",
      "migrationsDir": "./src/shared/infra/typeorm/migrations"
   }
}