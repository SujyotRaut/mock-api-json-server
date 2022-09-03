import { faker } from '@faker-js/faker';
import fs from 'fs';
import path from 'path';

//#region Settings
const DATABASE_DIR = path.resolve(__dirname, '..', 'database');
const OUTPUT_DB = path.resolve(DATABASE_DIR, 'db.json');
const USERS_COUNT = 50;
//#endregion

//#region Types
interface User {
  id: string;
  profile: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}
//#endregion

const createUser: () => User = () => {
  const id = faker.datatype.uuid();
  const profile = faker.image.avatar();
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = faker.internet.email(firstName, lastName);
  const username = faker.internet.userName(firstName, lastName);
  return { id, profile, username, email, firstName, lastName };
};

const users: User[] = [...Array(USERS_COUNT).keys()].map((_) => createUser());

fs.writeFileSync(OUTPUT_DB, JSON.stringify({ users }));
