import config from "../conf/config.js";
import { Client, Account, ID } from "appwrite";

class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    await this.account.create(
      ID.unique(),
      email,
      password,
      name
    );

    // auto-login after signup
    return this.login({ email, password });
  }

  async login({ email, password }) {
    return this.account.createEmailPasswordSession(
      email,
      password
    );
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch {
      return null;
    }
  }

  async logout() {
    return this.account.deleteSessions();
  }
}

const authService = new AuthService();
export default authService;
