async function connect() {
    if (global.connection && global.connection.state !== 'disconnected') {
        return global.connection;
    }

    const mysql = require('mysql2/promise');
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Lcj.456baronesa',
        database: 'clientes_db'
    });
    global.connection = connection;
    return connection;
}

exports.post = async (req, res) => {
    const con = await connect();
    const sql = 'INSERT INTO clientes (nome, email, telefone, endereco) VALUES (?, ?, ?, ?)';
    const values = [req.body.nome, req.body.email, req.body.telefone, req.body.endereco];
    await con.query(sql, values);
    res.status(201).send('Cliente inserido com sucesso');
};

exports.put = async (req, res) => {
    let id = req.params.id;
    const con = await connect();
    const sql = 'UPDATE clientes SET nome = ?, email = ?, telefone = ?, endereco = ? WHERE id = ?';
    const values = [req.body.nome, req.body.email, req.body.telefone, req.body.endereco, id];
    await con.query(sql, values);
    res.status(200).send('Cliente atualizado com sucesso');
};

exports.delete = async (req, res) => {
    let id = req.params.id;
    const con = await connect();
    const sql = 'DELETE FROM clientes WHERE id = ?';
    await con.query(sql, [id]);
    res.status(200).send('Cliente removido com sucesso');
};

exports.get = async (req, res) => {
    const con = await connect();
    const [rows] = await con.query('SELECT * FROM clientes');
    res.status(200).send(rows);
};

exports.getById = async (req, res) => {
    let id = req.params.id;
    const con = await connect();
    const [rows] = await con.query('SELECT * FROM clientes WHERE id = ?', [id]);
    if (rows.length === 0) {
        return res.status(404).send({ error: 'Cliente não encontrado' });
    }
    res.status(200).send(rows[0]);
};