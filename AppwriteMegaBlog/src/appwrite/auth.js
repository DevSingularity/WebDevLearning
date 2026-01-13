// Service to handle authentication with Appwrite
import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        {userId: ID.unique(),
        email,
        password,
        name}
      );
      if (userAccount) {
        // return userAccount;
        // call another method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession({email, password});
    } catch (error) {
      throw error;
    }
  }

  async getUser() {
    try {
      return await this.account.get();
    } catch (error) {
      throw error;
    }
    return null;
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;

/* The Appwrite way:
SIGN-UP:
import { Client, Account, ID } from "appwrite";

const client = new Client()
    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<PROJECT_ID>');                 // Your project ID

const account = new Account(client);

const user = await account.create({
    userId: ID.unique(), 
    email: 'email@example.com', 
    password: 'password'
});
*/

/* The Appwrite way:
SIGN-IN:
const session = await account.createEmailPasswordSession({
    email: email, 
    password: password
});
*/

/* The Appwrite way:
CHECK STATE:
try {
    const user = await account.get();
    // Logged in
} catch (err) {
    // Not logged in
}
*/
