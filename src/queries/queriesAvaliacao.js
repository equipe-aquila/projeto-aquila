const Pool = require('pg').Pool
const pool = new Pool({
    user: "uojyssgxeojarp",
    host: "ec2-23-20-224-166.compute-1.amazonaws.com",
    database: "d4ahtk0vtsf17a",
    password: "5ff488f69681ea28e682bd6e499c8b67c803493fee3f05a5ea746ef44a00d545",
    port: 5432,
    ssl: { rejectUnauthorized: false }
})

//require('dotenv').config()

const getAvaliacao = (request, response) => {
  pool.query('SELECT * FROM avaliacao ORDER BY id_avaliacao ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getAvaliacaoById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM avaliacao WHERE id_avaliacao = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createAvaliacao = (request, response) => {
  const { id_avaliacao, id_agendamento } = request.body

  pool.query('INSERT INTO avaliacao ( id_avaliacao, id_agendamento) VALUES ($1, $2) RETURNING *', 
  [ id_avaliacao, id_agendamento], (error, results) => {
    if (error) {
      throw error
    } else if (!Array.isArray(results.rows) || results.rows.length < 1) {
    	throw error
    }
    response.status(201).send(`User added with ID: ${results.rows[0].id_avaliacao}`)
  })
}

const updateAvaliacao = (request, response) => {
  const id = parseInt(request.params.id)
  const {id_avaliacao, id_agendamento} = request.body

  pool.query(
    'UPDATE avaliacao SET id_avaliacao = $1, id_agendamento = $2 WHERE id_avaliacao = $1 RETURNING *',
    [id_avaliacao, id_agendamento],
    (error, results) => {
      if (error) {
        throw error
      } 
      if (typeof results.rows == 'undefined') {
      	response.status(404).send(`Resource not found`);
      } else if (Array.isArray(results.rows) && results.rows.length < 1) {
      	response.status(404).send(`User not found`);
      } else {
  	 	  response.status(200).send(`User modified with ID: ${results.rows[0].id_avaliacao}`)         	
      }
      
    }
  )
}

const deleteAvaliacao = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM avaliacao WHERE id_avaliacao = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getAvaliacao,
  getAvaliacaoById,
  createAvaliacao,
  updateAvaliacao,
  deleteAvaliacao,
}
