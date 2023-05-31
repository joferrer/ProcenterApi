try {
    const vehRef = await  db.collection("vehiculos").doc(idvehiculo);
    const vehPlaca =  await db.collection("vehiculos").where('placa', '==', placa);
    const snapshot = await vehPlaca.get();
    const response = await vehRef.get().then((doc) => {
        if (doc.exists) {
    if (snapshot.empty) {
      vehRef.update({
        placa: placa
      });
      res.estado =  true;
      res.message = `Actualizacion de placa exitosa`;
      next();
    } else {
      res.estado =  false;
      res.message = `La placa  ${placa} ya se encuentra registrada`;
      next();
    }
  }
  else{
    res.estado =  false;
    res.message = `El vehiculo con ID: ${idvehiculo} no existe`;
    next();
  }})}
  catch (error) {
    console.log(error);
    res.status(400).send({ estado: false, mensaje: error });
    next();
  }
    
