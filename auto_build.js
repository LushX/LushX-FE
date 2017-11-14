const http = require('http')
const spawn = require('child_process').spawn
const createHandler = require('github-webhook-handler')
const handler = createHandler({ path: '/pushCode', secret: 'lushx-fe' })

http.createServer((req, res) => {
  handler(req, res, err => {
    res.statusCode = 404;
    res.end('no such location')
  })
}).listen(6666)

handler.on('error', err => {
  console.error('Error:', err.message)
})

handler.on('push', event => {
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref)
  rumCommand('sh', ['./auto_build.sh'], function( txt ) {
    console.log(txt)
  })
})

const rumCommand = ( cmd, args, callback ) => {
    let child = spawn( cmd, args )
    let response = ''
    child.stdout.on('data', function( buffer ){ response += buffer.toString() })
    child.stdout.on('end', function(){ callback( response ) })
}
