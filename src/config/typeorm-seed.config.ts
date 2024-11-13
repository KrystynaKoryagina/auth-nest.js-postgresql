import { DataSource, DataSourceOptions } from 'typeorm';

import { DataSourceConfig } from './typeorm.config';

export const DataSourceSeedConfig: DataSourceOptions = {
  ...DataSourceConfig,
  migrations: [__dirname + '/../typeorm/seed/**/*.{ts, js}'],
};

export default new DataSource({
  ...DataSourceSeedConfig,
});
