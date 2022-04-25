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

const getServicos= (request, response) => {
  pool.query('SELECT * FROM servicos ORDER BY ID_Servico ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getServicosById = (request, response) => {
  const id = parseInt(request.params.ID_Servico)

  pool.query('SELECT * FROM servicos WHERE ID_Servico = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createServicos = (request, response) => {
  const { name, email } = request.body

  pool.query('INSERT INTO servicos (ID_Servico, ID_Prestador, nome_servico ) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
    if (error) {
      throw error
    } else if (!Array.isArray(results.rows) || results.rows.length < 1) {
    	throw error
    }
    response.status(201).send(`User added with ID: ${results.rows[0].id}`)
  })
}

const updateServicos = (request, response) => {
  const id = parseInt(request.params.ID_Servico)
  const { name, email } = request.body

  pool.query(
    'UPDATE prestador SET nome_servico = $1, ID_Prestador = $2 WHERE ID_Servico = $3 RETURNING *',
    [nome_servico ,  ID_Prestador, ID_Servico],
    (error, results) => {
      if (error) {
        throw error
      } 
      if (typeof results.rows == 'undefined') {
      	response.status(404).send(`Resource not found`);
      } else if (Array.isArray(results.rows) && results.rows.length < 1) {
      	response.status(404).send(`User not found`);
      } else {
  	 	  response.status(200).send(`User modified with ID: ${results.rows[0].id}`)         	
      }
      
    }
  )
}

const deleteServicos = (request, response) => {
  const id = parseInt(request.params.ID_Servico)

  pool.query('DELETE FROM prestador WHERE ID_Servico = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getServicos,
  getServicosById,
  createServicos,
  updateServicos,
  deleteServicos,
}
