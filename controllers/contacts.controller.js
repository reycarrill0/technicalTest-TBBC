const pool = require("../db");
const schema = process.env.PG_SCHEMA;

const getAll = async (req, res) => {
  let query = {
    text: `select c.code as "Codigo", c."name" as "NombreContacto", c.phone as "Telefono", c.email as "Correo", date(c.creation_date) as "FechaCreación", a.name as "Autor"
    from ${schema}.contacts as c 
    left join ${schema}.author as a on (c.author_id=a.id)
    where c.status = 'true'
    order by c.id asc`,
  };
  try {
    const datos = await pool.query(query);

    if (datos.rows.length > 0) {
      res.json({
        status: "success",
        data: datos.rows,
      });
    } else {
      res.json({
        status: "error",
        data: datos.rows,
      });
    }
  } catch (error) {
    res.json({
      error: "Error al consultar contactos",
    });
  }
};

const postCreate = async (req, res) => {
  const { code, name, phone, email, author_id} = req.body;
  let query = {
    text: `INSERT INTO ${schema}.contacts
        (code, name, phone, email, status, author_id, creation_date)
        VALUES($1, $2, $3, $4 ,true, $5, CURRENT_TIMESTAMP);`,
    values: [ code, name, phone, email, author_id],
  };

  try {
    const datos = await pool.query(query);
    if (datos.rowCount == 1) {
      res.json({
        //Corresponsal creado correctamente
        status: "Contacto creado satisfactoriamente",
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
      error: "Error al crear contacto",
    });
  }
};

const PutById  = async(req, res) => {
  const {code}=req.params
  const { status} = req.body;
  
  let query = {
    text:  `update ${schema}.contacts set status=$1 where code=$2`,
    values: [ status, code]
  };
  
  try {
    const datos = await pool.query(query);
  
  if (datos.rowCount > 0) {
    res.json({
      status: "Contacto eliminado",
    })
    
  }else {
      res.json({
        status: "error",
      });
    }
    
  } catch (error) {
    res.json({
      error: 'Error al eliminar contacto'
    })
  }
  };

module.exports = {
  getAll,
  postCreate,
  PutById
};
