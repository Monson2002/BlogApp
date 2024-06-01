import { Client, Users } from 'node-appwrite';
import conf from './conf/conf';

const client = new Client()
    .setEndpoint(conf.appwriteUrl) // Your API Endpoint
    .setProject(conf.appwriteProjectId) // Your project ID
    .setKey(conf.appwriteAPIKey); // Your secret API key

const users = new Users(client);

const usersCount = await users.list(
    // [], // queries (optional)
    // '<SEARCH>' // search (optional)
);

export default usersCount;