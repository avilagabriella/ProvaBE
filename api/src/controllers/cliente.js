const con = require('../connections/mysql');

// CRUD - CREATE

const addCliente = (req, res) => {
    
    const { cpf, nome_cliente } = req.body;
    if (cpf && nome_cliente) {
        con.query('INSERT INTO cliente (cpf, nome_cliente) VALUES (?, ?)',
            [cpf, nome_cliente],
            (err, result) => {
                if (err) {
                    console.error('Erro ao adicionar funcionário:', err);
                    res.status(500).json({ error: 'Erro ao adicionar funcionário' });
                } else {
                    const newEmployee = { cpf, nome_cliente };
                    res.status(201).json(newEmployee);
                }
            });
    } else {
        res.status(400).json({ error: 'Favor enviar todos os campos obrigatórios' });
    }

};

// CRUD - READ

const getClientes = (req, res) => {

    con.query('SELECT * FROM cliente', (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao listar funcionários' });
        } else {
            res.json(result);
        }
    });

}

const getCliente = (req, res) => {
    const sql = "SELECT * FROM cliente WHERE cpf LIKE ?";
    con.query(sql, `%${[req.params.cpf]}%`, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
}

// CRUD - UPDATE

const updateCliente = (req, res) => {

    const { cpf, nome_cliente } = req.body;
    if (cpf && nome_cliente) {
        con.query('UPDATE cliente SET nome_cliente = ? WHERE cpf = ?', 
        [nome_cliente, cpf], 
        (err, result) => {
            if (err) {
                res.status(500).json({ error: err });
            } else {
                res.status(200).json(req.body);
            }
        });
    } else {
        res.status(400).json({ error: 'Favor enviar todos os campos obrigatórios' });
    }
}

// CRUD - DELETE

const deleteCliente = (req, res) => {
    const { cpf } = req.params;
    
    if (cpf) {
        // Excluir todas as linhas na tabela telefone que têm uma referência para o CPF especificado
        con.query('DELETE FROM telefone WHERE cpf = ?', [cpf], (errTelefone, resultTelefone) => {
            if (errTelefone) {
                res.status(500).json({ error: errTelefone });
            } else {
                // Excluir todas as linhas na tabela aluguel que têm uma referência para o CPF especificado
                con.query('DELETE FROM aluguel WHERE cpf = ?', [cpf], (errAluguel, resultAluguel) => {
                    if (errAluguel) {
                        res.status(500).json({ error: errAluguel });
                    } else {
                        // Finalmente, excluir a linha na tabela cliente
                        con.query('DELETE FROM cliente WHERE cpf = ?', [cpf], (errCliente, resultCliente) => {
                            if (errCliente) {
                                res.status(500).json({ error: errCliente });
                            } else {
                                if (resultCliente.affectedRows === 0) {
                                    res.status(404).json({ error: 'Cliente não encontrado' });
                                } else {
                                    res.status(200).json({ message: 'Cliente e informações relacionadas removidos com sucesso' });
                                }
                            }
                        });
                    }
                });
            }
        });
    } else {
        res.status(400).json({ error: 'Favor enviar todos os campos obrigatórios' });
    }
}



module.exports = {
    addCliente,
    getClientes,
    getCliente,
    updateCliente,
    deleteCliente
}