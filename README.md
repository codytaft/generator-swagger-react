# Generator for React App from Swagger Docs

## Tools Used

- [Swagger](https://swagger.io/)
- [OpenAPI v3](https://www.openapis.org/)
- [SwaggerHub](https://app.swaggerhub.com/home)
- [Swagger Parser](https://apitools.dev/swagger-parser/docs/swagger-parser.html)
- [OpenAPI Codegen](https://github.com/fabien0102/openapi-codegen)
- [Yeoman](https://yeoman.io/)
- [Plop](https://plopjs.com/documentation/)
- [React](https://reactjs.org/docs/getting-started.html)
- [Create React App](https://create-react-app.dev/)
- [Handlebars](https://handlebarsjs.com/)
- [Embedded JS](https://ejs.co/)

## To Run

- Have swagger URL ready: ie. `https://api.swaggerhub.com/apis/CODYTAFT/PetStore/1.0.0#/`
- Create and navigate to new directory: `mkdir new-dir && cd new-dir`
- Install generator: `npm install -g generator-react-swagger`
- Run generator: `yo react-swagger`
- Follow Prompts
- Run codgen with swagger-title in lowercase to generate api `npx openapi-codegen gen [swagger-title]`

## TODO

- add webpack to template for ts support
- perhaps run create-react-app as part of template
- find a simple JS generator
