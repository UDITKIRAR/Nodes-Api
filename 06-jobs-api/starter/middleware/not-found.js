const notFound = (req, res) => 
res.status(404).send('Route does not exist <a href="api/v1/jobs">back to home</a>')

module.exports = notFound
