/* eslint-disable no-dupe-keys */
import paths from './paths.js'

export default
{
  swagger: '2.0',
  info: {
    title: 'Volume API',
    description: 'Project documentation Volume API',
    version: '1.0.1'
  },
  host: process.env.API_URL,
  paths
}
