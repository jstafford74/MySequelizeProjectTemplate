module.exports = function(sequelize,Datatypes){
  const Todo = sequelize.define('Todo',{
    text: Datatypes.STRNG,
    complete: Datatypes.BOOLEAN,

  });
  return Todo;
};

