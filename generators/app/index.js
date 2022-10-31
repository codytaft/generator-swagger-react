const Generator = require('yeoman-generator');
const SwaggerParser = require('@apidevtools/swagger-parser');
let parser = new SwaggerParser();

// https://api.swaggerhub.com/apis/CODYTAFT/PetStore/1.0.0#/

module.exports = class extends Generator {
  intializing() {
    this.env.options.nodePackageManager = 'npm';
    this.props = {};
  }
  async prompting() {
    this.swaggerDoc = await this.prompt([
      {
        type: 'input',
        name: 'url',
        message: 'Input swagger.yaml url',
      },
    ]);
  }

  async default() {
    this.props = {
      swaggerDoc: this.swaggerDoc.url,
    };
    const { swaggerDoc } = this.props;
    const api = await parser.validate(`${swaggerDoc}`);

    this.api = api;
    await this.composeWith(require.resolve('../plop'), {
      parsedSwagger: api,
      swaggerURL: this.swaggerDoc.url,
    });
  }

  async writing() {
    console.log('writing');
    this.fs.copyTpl(
      this.templatePath('react-template'),
      this.destinationRoot(),
      { title: this.api.info.title, description: this.api.info.description },
      {
        // Include dotfiles
        globOptions: {
          dot: true,
        },
      }
    );
  }
  install() {
    console.log('installing all');
  }
  async end() {
    // await this.spawnCommand('npx', [
    //   'openapi-codegen',
    //   'gen',
    //   `${this.api.info.title.toLowerCase()}`,
    // ]);
    console.log('the end');
  }
};
