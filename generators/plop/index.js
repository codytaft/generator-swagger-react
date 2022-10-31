const Generator = require('yeoman-generator');

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
    const done = this.async();

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
    this.processTask({
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
    this.processTask({
      cmd: 'plop',
      args: ['--plopfile', `${__dirname}/plopfile.js`, `app`],
    });
  }
};
