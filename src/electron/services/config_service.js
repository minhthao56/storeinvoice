

class ConfigService {
  constructor({ configRepository }) {
    this.configRepository = configRepository;
  }

  async createConfig(config, { 
    dateNow,
  }) {
    return this.configRepository.create(config, { dateNow });
  }

  updateConfig(config, { 
    dateNow,
  }) {
    return this.configRepository.update(config, { dateNow });
  }

  deleteConfig(id, { 
    dateNow,
  }) {
    return this.configRepository.delete(id, { dateNow });
  }

  getConfigById(filter) {
    return this.configRepository.getById(filter);
  }

  getConfigs(filter) {
    return this.configRepository.getList(filter);
  }
}

module.exports = {
  ConfigService,
};