const con = require('../connections/mysql');

// CRUD - CREATE

const addVeiculo = (req, res) => {
    
    const { placa, modelo, marca, tipo, diaria } = req.body;
    if (placa && modelo && marca && tipo && diaria) {
        con.query('INSERT INTO veiculo (placa, modelo, marca, tipo ENUM, diaria) VALUES (?, ?, ?, ?, ?)',
            [placa, modelo, marca, tipo, diaria],
            (err, result) => {
                if (err) {
                    console.error('Erro ao adicionar veículo:', err);
                    res.status(500).json({ error: 'Erro ao adicionar veículo' });
                } else {
                    const newVehicle = { placa, modelo, marca, tipo, diaria };
                    res.status(201).json(newVehicle);
                }
            });
    } else {
        res.status(400).json({ error: 'Favor enviar todos os campos obrigatórios' });
    }

};

// CRUD - READ

const getVeiculos = (req, res) => {
    con.query('SELECT * FROM veiculo ORDER BY placa DESC', (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao listar veículos' });
        } else {
            res.json(result);
        }
    });
}

const getVeiculo = (req, res) => {
    const sql = "SELECT * FROM veiculo WHERE placa LIKE ?";
    con.query(sql, `${[req.params.placa]}`, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
}

// CRUD - UPDATE

const updateVeiculo = (req, res) => {

    const { placa, modelo, marca, ano } = req.body;
    if (placa && modelo && marca && ano) {
        con.query('UPDATE veiculo SET modelo = ?, marca = ?, ano = ? WHERE placa = ?', 
        [modelo, marca, ano, placa], 
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

const deleteVeiculo = (req, res) => {
    
    const { placa } = req.params;
    if (placa) {
        con.query('DELETE FROM veiculo WHERE placa = ?', [placa], (err, result) => {
            if (err) {
                res.status(500).json({ error: err });
            } else {
                if (result.affectedRows === 0) {
                    res.status(404).json({ error: 'Veículo não encontrado' });
                } else {
                    res.status(200).json({ message: 'Veículo removido com sucesso' });
                }
            }
        });
    } else {
        res.status(400).json({ error: 'Favor enviar todos os campos obrigatórios' });
    }
    
}

module.exports = {
    addVeiculo,
    getVeiculos,
    getVeiculo,
    updateVeiculo,
    deleteVeiculo
}