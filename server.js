var cluster    = require('cluster')
  , app        = require('./app')
  , serverPort = 3000
  , replPort   = 8889;

cluster('./app')
  .use(cluster.logger('logs'))
  .use(cluster.stats())
  .use(cluster.pidfiles('pids'))
  .use(cluster.cli())
  .use(cluster.repl(replPort))
  .set('socket path', __dirname + '/sockets')
  .in('development')
    .do(function() {
      console.log('Configure development')
    })
    .set('workers', 1)
    .use(cluster.debug())
    .use(cluster.reload(
          ['app.js', 'server.js', 'app', 'config', 'lib'],
          { extensions: ['.js', '.conf'] }))
   .in('all')
     .listen(serverPort)
     .do(function() {
       console.log('Server started on %d. Repl listening on %d', 
                   serverPort, replPort)
  });

