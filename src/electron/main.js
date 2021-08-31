/* eslint-disable prefer-arrow-callback */
require("./database");
require("./events/company_event");
require("./events/invoice_event");
require("./events/media_event");
require("./events/config_event");

const { BrowserWindow, app, ipcMain } = require("electron");
const { autoUpdater } = require("electron-updater");
const path = require("path");
const isDev = require("electron-is-dev");
const { WinEvent, AutoUpdateEvent } = require("../constants/event");

let mainWindow;

//createWindow
const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    minHeight: 400,
    minWidth: 800,
    backgroundColor: "black",
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
    frame: false,
  });
  mainWindow.setBackgroundColor("#fbfbfb");

  mainWindow.loadFile(path.join(__dirname, "../../public/index.html"));
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  // linster close windows
  ipcMain.on(WinEvent.WIN_CLOSE, () => {
    mainWindow.close();
  });

  // listener miniminze windows
  ipcMain.on(WinEvent.WIN_MINIMIZE, () => {
    mainWindow.minimize();
  });

  // listener zoom in
  ipcMain.on(WinEvent.WIN_ZOOM, (event) => {
    if (mainWindow.isMaximized()) {
      event.reply(WinEvent.IS_MAXIMIZED, { isMaximized: true });
      mainWindow.restore();
    } else {
      event.reply(WinEvent.IS_MAXIMIZED, { isMaximized: false });

      mainWindow.maximize();
    }
  });
};

/// run app
app
  .whenReady()
  .then(() => {
    createWindow();
  })
  .then(() => {
    autoUpdater.checkForUpdatesAndNotify();
  });

//UPDATE_AVAILABLE
autoUpdater.on("update-available", () => {
  mainWindow.webContents.send(AutoUpdateEvent.UPDATE_AVAILABLE);
});

//DOWNLOAD_PROGRESS
autoUpdater.on("download-progress", (progressInfo) => {
  const { percent, bytesPerSecond } = progressInfo;

  mainWindow.webContents.send(AutoUpdateEvent.DOWNLOAD_PROGRESS, {
    percent,
    bytesPerSecond,
  });
});

//UPDATE_DOWNLOADED
autoUpdater.on("update-downloaded", () => {
  mainWindow.webContents.send(AutoUpdateEvent.UPDATE_DOWNLOADED);
});

//GET_VERSION
ipcMain.on(AutoUpdateEvent.GET_VERSION, (event, message) => {
  event.reply(AutoUpdateEvent.RESULT_GET_VERSION, {
    version: app.getVersion(),
  });
});

//REQUIRE_UPDATE
ipcMain.on(AutoUpdateEvent.REQUIRE_UPDATE, () => {
  autoUpdater.quitAndInstall();
});

//REQUIRE_UPDATE
ipcMain.on(AutoUpdateEvent.REQUIRE_CHECK_UPDATE, () => {
  autoUpdater.checkForUpdatesAndNotify();
});
