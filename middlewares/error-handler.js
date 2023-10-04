const crearErrorJson = (code, campo = '', valor = '',valorDos='') => {
  const mensajesError = {
      E001: `Error de validación de entrada - El campo ${campo} es obligatorio para realizar su solicitud.`,
      E002: `Recurso no encontrado valor ${valor} del campo ${campo} no existe en la base de datos.`,
      E003: `Cantidad de datos solicitados no disponibles.`,
      E004: `Cantidad de recursos insuficientes - No se puede reducir ${valor} del campo ${campo} del producto con ID de ${valorDos}, debido a que la cantidad que desea reducir supera a la cantidad actual.`,
      E006: `Producto repetido dentro del proceso de venta - Producto con ID ${valor} de ${campo} se repite mas de una vez dentro del proceso de venta.`,
      E009: `Solicitud no procesable - Error en la base de datos${campo ? ` - Pista - ${campo}`:''}.`,
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