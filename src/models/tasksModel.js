const pool = require('./connection');

const getAll = async () => {
  const { rows: tasks } = await pool.query('SELECT * FROM tasks');
  return tasks;
};

const createTask = async (task) => {
  const { title } = task;
  const dateUTC = new Date(Date.now()).toUTCString();

  const query = 'INSERT INTO tasks(title, status, created_at) VALUES ($1, $2, $3) RETURNING id';
  const values = [title, 'pendente', dateUTC];

  const { rows } = await pool.query(query, values);
  return { insertId: rows[0].id };
};

const deleteTask = async (id) => {
  const query = 'DELETE FROM tasks WHERE id = $1';
  const values = [id];

  const { rowCount } = await pool.query(query, values);
  return { affectedRows: rowCount };
};

const updateTask = async (id, task) => {
  const { title, status } = task;

  const query = 'UPDATE tasks SET title = $1, status = $2 WHERE id = $3';
  const values = [title, status, id];

  const { rowCount } = await pool.query(query, values);
  return { affectedRows: rowCount };
};

module.exports = {
  getAll,
  createTask,
  deleteTask,
  updateTask,
};
