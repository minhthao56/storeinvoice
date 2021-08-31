const { ConfigEvent } = require("../../constants/event");
const { configService } = require("../database/index");

const { ipcMain } = require("electron");

// listener get companies
ipcMain.on(ConfigEvent.GET_ALL_CONFIGS, (event, filter) => {
  configService
    .getConfigs(filter)
    .then((configs) =>
      event.reply(ConfigEvent.RESULT_GET_ALL_CONFIGS, {
        result: 1,
        content: {
          configs,
        },
      })
    )
    .catch((err) => event.reply(ConfigEvent.RESULT_GET_ALL_CONFIGS, err));
});

// listener get one company
ipcMain.on(ConfigEvent.GET_ONE_CONFIG, (event, { id }) => {
  configService
    .getConfigById(id)
    .then((config) =>
      event.reply(ConfigEvent.RESULT_GET_ONE_CONFIG, {
        result: 1,
        content: {
          config,
        },
      })
    )
    .catch((err) => event.reply(ConfigEvent.RESULT_GET_ONE_CONFIG, err));
});

// listner insert company
ipcMain.on(ConfigEvent.INSERT_ONE_CONFIG, (event, config) => {
  let dateNow = new Date();
  configService
    .createConfig(config, {
      dateNow,
    })
    .then((data) =>
      event.reply(ConfigEvent.RESULT_INSERT_ONE_CONFIG, {
        result: 1,
      })
    )
    .catch((err) => event.reply(ConfigEvent.RESULT_INSERT_ONE_CONFIG, err));
});

// listner update company
ipcMain.on(ConfigEvent.UPDATE_ONE_CONFIG, (event, config) => {
  let dateNow = new Date();
  configService
    .updateConfig(config, {
      dateNow,
    })
    .then((data) =>
      event.reply(ConfigEvent.RESULT_UPDATE_ONE_CONFIG, {
        result: 1,
      })
    )
    .catch((err) => event.reply(ConfigEvent.RESULT_UPDATE_ONE_CONFIG, err));
});

// listner delete company
ipcMain.on(ConfigEvent.DELETE_ONE_CONFIG, (event, { id }) => {
  if (!id || id < 1) {
    event.reply(ConfigEvent.RESULT_DELETE_ONE_CONFIG, {
      result: 0,
      message: "Vui lòng chọn cấu hình để xóa.",
    });
    return;
  }

  let dateNow = new Date();
  configService
    .deleteConfig(id, {
      dateNow,
    })
    .then((data) =>
      event.reply(ConfigEvent.RESULT_DELETE_ONE_CONFIG, {
        result: 1,
        content: {
          deleteid: id,
        },
      })
    )
    .catch((err) => event.reply(ConfigEvent.RESULT_DELETE_ONE_CONFIG, err));
});
