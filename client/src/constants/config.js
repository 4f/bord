const isProduct = process.env.NODE_ENV === 'production'

const urls = isProduct ? {
  apiUrl:    '',
  socketUrl: ''
} : {
  apiUrl:    'http://localhost:3003',
  socketUrl: 'ws://localhost:3003/cable'
}

export default urls
