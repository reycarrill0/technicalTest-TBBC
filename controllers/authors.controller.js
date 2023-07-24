const pool = require("../db");
const schema = process.env.PG_SCHEMA

// Controlador para crear autor
const postCreateAuthor = async (req, res) => {

  const { code, name } = req.body;

  let query = {
    text: `INSERT INTO ${schema}.author
    (code, name, creation_date)
    VALUES($1, $2, current_timestamp);`,
    values: [ code, name ]
  };
  
  try {
    const datos = await pool.query(query);
    //console.log(datos)
    if (datos.rowCount == 1) {
      res.json({
        //Usuario creado correctamente
        status: "success",
      });
    } else {
      res.json({
        status: "error",
        data: datos.rows,
      });
    }
    
  } catch (error) {
    //console.log(error)
    res.json({
      error: 'Error al crear autor'
    })
  }
  
};

module.exports = {
    postCreateAuthor
}