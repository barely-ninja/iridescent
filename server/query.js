const runQuery = (client, termSet) => {

  client.query('SELECT * FROM posts WHERE id = $1', [1])
}

module.exports = runQuery