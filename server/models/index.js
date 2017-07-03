import mongoose from 'mongoose';
import config from '../config';
import materialApproach from './MaterialApproach';



mongoose.connect(config.db, { server: { poolSize: 20 } },

  err => {
    if (err) {
      console.error('connect to %s error: ', config.db, err.message);
      process.exit(1);
    }
  });

mongoose.set('debug', config.mongoose_debug);

const _models = [
  materialApproach,
];

const _export = {};

_models.map(model => {
  model.init();
  _export[model.name] = mongoose.model(model.name);
});

module.exports = _export;

