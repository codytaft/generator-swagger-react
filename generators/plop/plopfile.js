module.exports = function ({ setGenerator, setPrompt }) {
  setGenerator('component', {
    description: 'Generate a new component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Hey whats your name!',
      },
      {
        type: 'input',
        name: 'description',
        message: 'Description',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../app/templates/react-template/src/components/{{name}}/index.js',
        templateFile: 'templates/component.hbs',
        force: true,
      },
    ],
  });
  setGenerator('openapi-config', {
    description: 'Generate a new openapi-config',
    prompts: [
      {
        type: 'input',
        name: 'swaggerURL',
        message: 'This is the swagger doc url',
      },
      {
        type: 'input',
        name: 'swaggerTitle',
        message: 'This will be the title of the api',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../app/templates/react-template/openapi-codegen.config.ts',
        templateFile: 'templates/openapi-config-template.hbs',
        force: true,
      },
    ],
  });
};
