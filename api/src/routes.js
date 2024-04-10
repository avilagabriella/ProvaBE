const express = require('express');
const router = express.Router(); 

const Cliente = require('./controllers/cliente');
const Telefone = require('./controllers/telefone');
const Veiculo = require('./controllers/veiculo');
const Aluguel = require('./controllers/aluguel');

router.get('/', (req, res) => {
    res.json("API para Registro e agendamento de aluguéis ");
});

router.post('/clientes', Cliente.addCliente);
router.get('/clientes', Cliente.getClientes);
router.get('/clientes/:cpf', Cliente.getCliente);
router.put('/clientes', Cliente.updateCliente);
router.delete('/clientes/:cpf', Cliente.deleteCliente);

router.post('/telefones', Telefone.addTelefone);
router.get('/telefones', Telefone.getTelefones);
router.get('/telefones/:cpf', Telefone.getTelefone);
router.put('/telefones', Telefone.updateTelefone);
router.delete('/telefones/:cpf', Telefone.deleteTelefone);

router.post('/veiculos', Veiculo.addVeiculo);
router.get('/veiculos', Veiculo.getVeiculos);
router.get('/veiculos/:placa', Veiculo.getVeiculo);
router.put('/veiculos', Veiculo.updateVeiculo);
router.delete('/veiculos/:placa', Veiculo.deleteVeiculo);

router.post('/alugueis', Aluguel.addAluguel);
router.get('/alugueis', Aluguel.getAlugueis);
router.get('/alugueis/:id', Aluguel.getAluguel);
router.put('/alugueis', Aluguel.updateAluguel);
router.delete('/alugueis/:id', Aluguel.deleteAluguel);

module.exports = router;