const Generator = require('yeoman-generator');
const process = require('process');
const util = require('util');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.option('parsedSwagger', { type: Object, required: true });
    this.option('swaggerURL', { type: String, required: true });

    this.log(this.options.parsedSwagger);
  }
  intializing() {
    this.props = {
      parsedSwagger: this.options.parsedSwagger,
      swaggerURL: this.options.swaggerURL,
    };
    this.props.parsedSwagger.info.title =
      this.props.parsedSwagger.info.title.toLowerCase();
  }

  async default() {
    var done = this.async();

    const { parsedSwagger, swaggerURL } = this.props;
    this.processTask = async function (task) {
      await this.spawnCommand(task.cmd, task.args).on('exit', function (err) {
        if (err) {
          this.log.error('task failed. Error: ' + err);
        }
        done();
        return;
      });
    };
    await parsedSwagger.tags.map(async (tag) => {
      await this.processTask({
        cmd: 'plop',
        args: [
          '--plopfile',
          `${__dirname}/plopfile.js`,
          'component',
          '--',
          `--name`,
          `${tag.name}`,
          `--description`,
          `${tag.description}`,
        ],
      });
    });
    await this.processTask({
      cmd: 'plop',
      args: [
        '--plopfile',
        `${__dirname}/plopfile.js`,
        `openapi-config`,
        '--',
        `--swaggerURL`,
        `${swaggerURL}`,
        `--swaggerTitle`,
        `${parsedSwagger.info.title}`,
      ],
    });
  }
};

// cleanUp() {
//TODO delete components folder and any other files created
// }

//   async writing() {
//     const { parsedSwagger, swaggerURL } = this.props;

//     console.log('writing');
//     this.fs.copyTpl(
//       this.templatePath('react-template'),
//       this.destinationRoot(),
//       {
//         title: parsedSwagger.info.title,
//         description: parsedSwagger.info.description,
//       },
//       {
//         // Include dotfiles
//         globOptions: {
//           dot: true,
//         },
//       }
//     );
//     // await this.processTask({
//     //   cmd: 'openapi-codegen',
//     //   args: ['gen'],
//     // });
//   }
// };
