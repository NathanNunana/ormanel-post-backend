const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Blog API",
      version: "1.0.0",
      description: "A SIMPLE API TO POST, DELETE, UPDATE, COMMENT AND JOIN IN ON LIVE BLOG DISCUSSIONS",
    },
    // servers: [
    //   {
    //     url: "https://localhost:3000",
    //   },
    // ],
  },
  apis: ["../routes/*.js", "../models/*.js"],
};

const specs = swaggerJsDoc(options);

const swaggerDoc = (app) => {
    app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs))
    app.get("/docs.json", (req, res)=>{
        res.setHeader("Content-Type", "application/json")
        res.send(specs)
    })
}

module.exports = swaggerDoc