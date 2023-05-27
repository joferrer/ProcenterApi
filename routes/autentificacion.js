const express = require('express');
const router = express.Router();
const  { signUp , signIn}   = require("../middlewares/autentificacion");


router.post('/registraruser', async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Falta email o contraseña' });
    }
  
    try {
      const result = await signUp(email, password);
      if (result.success) {
        res.status(200).json({ success: true, message: result.message });
      } else {
        res.status(400).json({ success: false, message: result.message });
      }
    } catch (error) {
        console.log(error);
      res.status(500).json({ success: false, message: error });
    }
  });


  // Ruta para iniciar sesión
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Falta email o contraseña' });
    }
  
    try {
      const result = await signIn(email, password);
      if (result.success) {
        res.status(200).json({ success: true, message: 'Inicio de sesión exitoso' });
      } else {
        res.status(400).json({ success: false, message: result.message });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
  });

module.exports = router;