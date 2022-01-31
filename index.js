const { ApolloServer} = require('apollo-server');
const mongoose = require('mongoose');
const Post = require('./Models/Post');
const typeDefs = require('./graphQL/typeDefs');

// The GraphQL schema


// A map of functions which return data for the schema.
const resolvers = {
  Query: {
       async getPosts() {
          try {
              const posts = await Post.find();
              return posts;
          } catch (err) {
              throw new Error(err);
          }
    }
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose.connect('mongodb+srv://admin-ash:7LC1SbhUhvQRyC1f@cluster0.6zk1r.mongodb.net/merng?retryWrites=true&w=majority', { useNewUrlParser: true }).then(() => {
    console.log('DB connected');
    return server.listen()
}).then(({ url }) => {
  console.log(` Server ready at ${url}`);
});

