const { ApolloServer} = require('apollo-server');
const mongoose = require('mongoose');
const resolvers = require('./graphQL/resolvers')
const typeDefs = require('./graphQL/typeDefs');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}) => ({req})
});

mongoose.connect('mongodb+srv://admin-ash:7LC1SbhUhvQRyC1f@cluster0.6zk1r.mongodb.net/merng?retryWrites=true&w=majority', { useNewUrlParser: true }).then(() => {
    console.log('DB connected');
    return server.listen()
}).then(({ url }) => {
  console.log(` Server ready at ${url}`);
});

