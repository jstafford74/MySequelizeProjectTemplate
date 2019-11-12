// ***************************************************************
// api-routes.js - routes for displaying and saving data to the db
// ****************************************************************

// Dependencies
// =============================================================
const db = require('../models');


// Routes
// =============================================================
module.exports = function (app) {
  // GET route for getting all of the todos
  app.get('/api/todos', async (req, res) => {
    const todos = await db.Todo.findAll({});
    res.json(todos);
  });

  // POST route for saving a new todo.
  // We can create a todo using the data on req.body
  app.post('/api/todos', async (req, res) => {
    try {

      const result = await db.Todo.create({
        text: req.body.text,
        complete: false,

      });
      res.json(result);
    } catch (error) {
      res.json({ error: { ...error } });
    }
  });

  // DELETE route for deleting todos.
  // We can access the ID of the todo to delete in
  // req.params.id
  app.delete('/api/todos/:id', async (req, res) => {
    const result = await db.Todo.destroy({
      where: {
        id: req.params.id
      },

    });
    const deletedRowCount = result;
    const status = deletedRowCount > 0 ? 200 : 404;
    res.status(status).json({ deletedRowCount });
  });


  // PUT route for updating todos.
  // We can access the updated todo in req.body
  app.put('/api/todos', async (req, res) => {

    const { id, text, complete } = req.body;

    try {
      const result = await db.Todo.update(
        {
          text,
          complete
        },
        {
          where: { id },
        },
      );
      const affectedRowCount = result[0];
      const status = affectedRowCount > 0 ? 200 : 404;
      res.status(status).json({ affectedRowCount });
    } catch (error) {
      res.json({ error: { ...error } });
    }
  });
};
