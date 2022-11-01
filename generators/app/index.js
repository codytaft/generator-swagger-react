const Generator = require('yeoman-generator');
const SwaggerParser = require('@apidevtools/swagger-parser');
let parser = new SwaggerParser();
const fs = require('fs');
const path = require('path');

// https://api.swaggerhub.com/apis/CODYTAFT/PetStore/1.0.0#/

const emptyDir = (dirPath) => {
  const dirContents = fs.readdirSync(dirPath); // List dir content

  for (const fileOrDirPath of dirContents) {
    try {
      // Get Full path
      const fullPath = path.join(dirPath, fileOrDirPath);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        // It's a sub directory
        if (fs.readdirSync(fullPath).length) emptyDir(fullPath);
        // If the dir is not empty then remove it's contents too(recursively)
        fs.rmdirSync(fullPath);
      } else fs.unlinkSync(fullPath); // It's a file
    } catch (ex) {
      console.error(ex.message);
    }
  }
};
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
    console.log('CLEAN UP!');

    const DIR_TO_CLEAR = `${__dirname}/templates/react-template/src/components`;

    emptyDir(DIR_TO_CLEAR);

    // this.fs.delete(
    //   `${__dirname}/templates/react-template/openapi-codegen.config.ts`
    // );
    fs.unlinkSync(
      `${__dirname}/templates/react-template/openapi-codegen.config.ts`
    );
    // await this.spawnCommand('npx', [
    //   'openapi-codegen',
    //   'gen',
    //   `${this.api.info.title.toLowerCase()}`,
    // ]);
  }
};
