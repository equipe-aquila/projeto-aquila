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

const getAgendamentos = (request, response) => {
  pool.query('SELECT * FROM agendamento ORDER BY id_agendamento ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getAgendamentosById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM agendamento WHERE id_agendamento = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createAgendamento = (request, response) => {
  const { id_agendamento, id_user, id_favorito, id_prestador, data, hora } = request.body

  pool.query('INSERT INTO agendamento (id_agendamento, id_user, id_favorito, id_prestador, data, hora) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', 
  [id_agendamento, id_user, id_favorito, id_prestador, data, hora ], (error, results) => {
    if (error) {
      throw error
    } else if (!Array.isArray(results.rows) || results.rows.length < 1) {
    	throw error
    }
    response.status(201).send(`User added with ID: ${results.rows[0].id_agendamento}`)
  })
}

const updateAgendamento = (request, response) => {
  const id = parseInt(request.params.id)
  const {id_agendamento, id_user, id_favorito, id_prestador, data, hora} = request.body

  pool.query(
    'UPDATE agendamento SET id_user = $2, id_favorito = $3, id_prestador = $4, data = $5, hora = $6 WHERE id_agendamento = $1 RETURNING *',
    [id_agendamento, id_user, id_favorito, id_prestador, data, hora],
    (error, results) => {
      if (error) {
        throw error
      } 
      if (typeof results.rows == 'undefined') {
      	response.status(404).send(`Resource not found`);
      } else if (Array.isArray(results.rows) && results.rows.length < 1) {
      	response.status(404).send(`User not found`);
      } else {
  	 	  response.status(200).send(`User modified with ID: ${results.rows[0].id_agendamento}`)         	
      }
      
    }
  )
}

const deleteAgendamento = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM agendamento WHERE id_agendamento = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getAgendamentos,
  getAgendamentosById,
  createAgendamento,
  updateAgendamento,
  deleteAgendamento,
}
