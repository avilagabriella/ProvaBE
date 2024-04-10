const con = require('../connections/mysql');

// CRUD - CREATE

const addAluguel = (req, res) => {
    
    const { placa, cpf, reserva, retirada, devolucao, subtotal } = req.body;
    if (placa && cpf && reserva && retirada && devolucao && subtotal) {
        con.query('INSERT INTO Aluguel (placa, cpf, reserva, retirada, devolucao, subtotal) VALUES (?, ?, ?, ?, ?, ?)',
            [placa, cpf, reserva, retirada, devolucao, subtotal],
            (err, result) => {
                if (err) {
                    console.error('Erro ao adicionar Aluguel:', err);
                    res.status(500).json({ error: 'Erro ao adicionar Aluguel' });
                } else {
                    const newMaintenance = { id: result.insertId, placa, cpf, reserva, retirada, devolucao, subtotal };
                    res.status(201).json(newMaintenance);
                }
            });
    } else {
        res.status(400).json({ error: 'Favor enviar todos os campos obrigatórios' });
    }

};

// CRUD - READ

const getAlugueis = (req, res) => {
    con.query('SELECT * FROM Aluguel', (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao listar Aluguel' });
        } else {
            res.json(result);
        }
    });
}

const getAluguel = (req, res) => {
    const sql = "SELECT * FROM Aluguel WHERE id LIKE ?";
    con.query(sql, `${[req.params.id]}`, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
}



// CRUD - UPDATE

const updateAluguel = (req, res) => {

    const { placa, cpf, reserva, retirada, devolucao, subtotal} = req.body;
    if (placa && cpf && reserva && retirada && devolucao && subtotal) {
        con.query('UPDATE Aluguel SET placa = ?, cpf = ?, reserva = ?, retirada = ?, devolucao = ?, subtotal = ? WHERE id = ?', 
        [placa, cpf, reserva, retirada, devolucao, subtotal, id], 
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

const deleteAluguel = (req, res) => {
    
    const { id } = req.params;
    if (id) {
        con.query('DELETE FROM Aluguel WHERE id = ?', [id], (err, result) => {
            if (err) {
                res.status(500).json({ error: err });
            } else {
                if (result.affectedRows === 0) {
                    res.status(404).json({ error: 'Aluguel não encontrada' });
                } else {
                    res.status(200).json({ message: 'Aluguel removida com sucesso' });
                }
            }
        });
    } else {
        res.status(400).json({ error: 'Favor enviar todos os campos obrigatórios' });
    }
    
}

module.exports = {
    addAluguel,
    getAlugueis,
    getAluguel,
    updateAluguel,
    deleteAluguel
}