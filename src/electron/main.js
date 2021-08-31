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
const { WinEvent } = require("../constants/event");

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
