module.exports = {
  //   HOST: "localhost",
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_ROOT_PASSWORD,
  DB: process.env.DB_DATABASE,
  dialect: "mysql",
  port: "3306",
};
