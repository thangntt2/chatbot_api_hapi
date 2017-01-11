import { Server } from 'hapi'
import good from 'good'
import inert from 'inert'
import vision from 'vision'
import Boom from 'boom'
import hapiSwaggeredUi from 'hapi-swaggered-ui'
import * as overjoyAwait from 'overjoy-await'
import * as overjoySwag from 'overjoy-swag'
import * as jwtHapi from 'hapi-auth-jwt2'

import { config } from './components/config'
import routes from './routes'
import api from './schemas/api.swagger.yaml'

function validateToken(decoded, request, callback) {
  if (decoded.exp * 1000 > (new Date().getSeconds())) {
    return callback(null, true)
  }
  return callback(Boom.unauthorized('access_token\'s expired'), false)
}

export async function main(server = new Server()) {
  server.connection({
    port: config('/server/port'),
    host: config('/server/host'),
    router: {
      stripTrailingSlash: true,
    },
    routes: { cors: true },
  })

  // don't log when test
  if (config('/modules/good')) {
    await server.register({
      register: good,
      options: {
        reporters: {
          console: [{
            module: 'good-console',
          }, 'stdout'],
        },
      },
    })
  }

  await server.register(overjoyAwait)

  await server.register(inert)
  await server.register(vision)

  await server.register({
    register: overjoySwag,
    options: {
      schema: api,
      handlers: routes,
      handlerTransform: 'await',
    },
  })

  const swaggerUiConfig = config('/modules/swaggerUi')
  if (swaggerUiConfig) {
    await server.register({
      register: hapiSwaggeredUi,
      options: {
        path: swaggerUiConfig.path,
        swaggerEndpoint: '/swagger.json',
      },
    })
  }

  await server.register(jwtHapi)
  await server.auth.strategy('authorization', 'jwt', {
    key: 'CshTug6ZHncuFXhFQ1W93fiNeuZV0qC9wdD-Tmyws304nHOSSfmjXTdDEWYxrKEP',
    validateFunc: validateToken,
    verifyOptions: {
      algorithms: ['HS256'],
    },
  })

  await server.auth.default('authorization')

  // don't start server on test
  if (config('/server/listen')) {
    await server.start()
    server.log('server', `Server is listening at: ${server.info.uri.toLowerCase()}`)
  }

  return server
}
