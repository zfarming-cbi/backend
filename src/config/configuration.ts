export default () => ({
  port: parseInt(process.env.PORT ?? '3000', 10),
  database: {
    host: process.env.DATABASE_HOST,
    name: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  },
  mail: {
    host: process.env.SMTP_SERVER,
    port: process.env.SMTP_PORT,
    sender: process.env.MAIL_SENDER,
    password: process.env.MAIL_PASSWORD,
  },
  urls: {
    link_recover_password: process.env.URL_RECOVER_PASSWORD,
  },
});
