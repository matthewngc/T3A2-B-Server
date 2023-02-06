import app from './app.js'

const port = process.env.PORT || 4002

app.listen(port, () => console.log(`App running at http://localhost:${port}/`))