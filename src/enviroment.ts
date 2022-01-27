import { config } from 'dotenv';

config();

const environment = {
  MYSQL_HOST: process.env.MYSQL_HOST,
  MYSQL_PORT: Number(process.env.MYSQL_ORT),
  MYSQL_DB_NAME: process.env.MYSQL_DB_NAME,
  MYSQL_USER: process.env.MYSQL_USER,
  MYSQL_USER_PASS: process.env.MYSQL_USER_PASS,
  MYSQL_ROOT_PASSWORD: process.env.MYSQL_ROOT_PASSWORD,
  REDIS_PASSWD: process.env.REDIS_PASSWD,
};

export default environment;
