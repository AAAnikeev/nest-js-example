const process = require('process');

const username = process.env.POSTGRES_USER || "postgres";
const password = process.env.POSTGRES_PASSWORD || "example";



module.exports = {
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.NODE_ENV === 'test'? process.env.POSTGRES_DB_TEST : process.env.POSTGRES_DB,
      entities: [__dirname + "/dist/**/*.entity.js"],
      synchronize: false,
      dropSchema: false,
      autoLoadEntities: true,
      migrations: ["dist/**/migrations/**/*.js"],
      cli: {
        entitiesDir: "src",
        migrationsDir: "src/migrations",
      },
      schema: 'public'
    }