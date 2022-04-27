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

const getMeioPagamentos = (request, response) => {
  pool.query('SELECT * FROM meio_pagamentos ORDER BY id_meio_pag ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getMeioPagamentosById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM meio_pagamentos WHERE id_meio_pag = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createMeioPagamentos = (request, response) => {
  const { id_meio_pag, meio_pagamento, id_user, n_cartao, nome_titular, cod_segurança, validade } = request.body

  pool.query('INSERT INTO meio_pagamentos (id_meio_pag, meio_pagamento, id_user, n_cartao, nome_titular, cod_segurança, validade) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', 
  [id_meio_pag, meio_pagamento, id_user, n_cartao, nome_titular, cod_segurança, validade], (error, results) => {
    if (error) {
      throw error
    } else if (!Array.isArray(results.rows) || results.rows.length < 1) {
    	throw error
    }
    response.status(201).send(`User added with ID: ${results.rows[0].id_meio_pag}`)
  })
}

const updateMeioPagamentos = (request, response) => {
  const id = parseInt(request.params.id)
  const {id_meio_pag, meio_pagamento, id_user, n_cartao, nome_titular, cod_segurança, validade} = request.body

  pool.query(
    'UPDATE meio_pagamentos SET id_meio_pag = $1, meio_pagamento = $2, id_user = $3, n_cartao = $4, nome_titular = $5, cod_segurança = $6, validade = $7  WHERE id_meio_pag = $1 RETURNING *',
    [id_meio_pag, meio_pagamento, id_user, n_cartao, nome_titular, cod_segurança, validade],
    (error, results) => {
      if (error) {
        throw error
      } 
      if (typeof results.rows == 'undefined') {
      	response.status(404).send(`Resource not found`);
      } else if (Array.isArray(results.rows) && results.rows.length < 1) {
      	response.status(404).send(`User not found`);
      } else {
  	 	  response.status(200).send(`User modified with ID: ${results.rows[0].id_meio_pag}`)         	
      }
      
    }
  )
}

const deleteMeioPagamentos = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM meio_pagamentos WHERE id_meio_pag = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getMeioPagamentos,
  getMeioPagamentosById,
  createMeioPagamentos,
  updateMeioPagamentos,
  deleteMeioPagamentos,
}
