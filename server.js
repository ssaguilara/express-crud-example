const express = require("express");
const morgan = require("morgan");

const app = express();
let products = [
  {
    id: 1,
    name: "lapto",
    price: 350,
  },
];

app.use(morgan("dev"));
app.use(express.json());

app.get("/products", (req, res) => {
  // res.send('obteniendo productos')
  res.json(products); //preguntar chat gp, otras opcion aparte de json, send es el que deja mas tipos
});

app.get("/products/:id", (req, res) => {
  const productFound = products.find(
    (product) => product.id === parseInt(req.params.id)
  ); //devuelve un objeto

  if (!productFound)
    return res.status(404).send({ message: "Product not found" }); // tambien puedo enviar con json()

  console.log(productFound);
  res.json(productFound);
});

app.post("/products", (req, res) => {
  //console.log(req.body) //enviamos con thunder
  const newProducts = { ...req.body, id: products.length + 1 }; //objeto nuevo con los elementos de req.body y se agrega el parametro id
  products.push(newProducts);
  res.send(newProducts);
});

app.put("/products/:id", (req, res) => {
  //   res.send("actualizando productos");
  const newData = req.body
  const productFound = products.find(
    (product) => product.id === parseInt(req.params.id)
  ); //devuelve un objeto,verificacion que exista

  if (!productFound)
    return res.status(404).send({ message: "Product not found" }); // tambien puedo enviar con json()

  products = products.map(
    (product) => product.id === parseInt(req.params.id) ? {...product,...newData} : product); // Si la propiedad existe se seobreescribe sino se deja igual

    res.json({ message: "Producto actualizado" })
});

app.delete("/products/:id", (req, res) => {
  //   res.send("eliminando productos");
  const productFound = products.find(
    (product) => product.id === parseInt(req.params.id)
  ); //devuelve un objeto,verificacion que exista

  if (!productFound)
    return res.status(404).send({ message: "Product not found" }); // tambien puedo enviar con json()

  products = products.filter(
    (product) => product.id !== parseInt(req.params.id)
  ); // eliminar el producto y sobreescibir el array

  res.sendStatus(204); // manda el status pero no da contenido
});

app.listen(3000);
console.log("server on port 3000");
