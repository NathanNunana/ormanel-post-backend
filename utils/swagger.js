const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blog API",
      version: "1.0.0",
      description: "A SIMPLE API TO POST, DELETE, UPDATE, COMMENT AND JOIN IN ON LIVE BLOG DISCUSSIONS",
    },
    components: {
      securitySchemas:{
        bearerAuth:{
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        },
      },
    },
    security:[
      {
        bearerAuth:{}
      }
    ]
  },
  apis: ['./routes/*.js', './models/*.js'],
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