const crearErrorJson = (code, campo = '', valor = '') => {
  const mensajesError = {
      E001: `Error de validación de entrada - El campo ${campo} es obligatorio para realizar su solicitud.`,
      E002: `Recurso no encontrado valor ${valor} del campo ${campo} no existe en la base de datos.`,
      E009: `Solicitud no procesable - Error en la base de datos.`,
      E014: `Formato de datos incorrecto - El formato del dato ${valor} que quiere ingresar en el campo ${campo} es incorrecto.`
  };
  const mensaje = mensajesError[code] || 'Error desconocido';
  return {
      code: code || 'Error desconocido',
      message: mensaje
  };
}

module.exports = {
  crearErrorJson
}