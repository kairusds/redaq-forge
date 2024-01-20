const { app, BrowserWindow, shell } = require("electron");
const path = require("path");
const gotTheLock = app.requestSingleInstanceLock();

let win;

if(!gotTheLock){
	app.quit();
}else{
	const createWindow = () => {
		win = new BrowserWindow({
			title: "RedAQ Forge",
			icon: path.join(__dirname, "/assets/icon.png"),
			autoHideMenuBar: true,
			webPreferences: {
				contextIsolation: true,
				plugins: true
			}
		});
	
		win.webContents.on("new-window", (event, url) => {
			event.preventDefault();
			shell.openExternal(url);
		});
	
		win.maximize();
		win.loadURL("https://redaq.net/game/browser");
	
		win.once("page-title-updated", function (event, title){
			event.preventDefault();
			win.title = "RedAQ Forge";
		});
	};

	const setupFlashPlugin = () => {
		app.commandLine.appendSwitch("ppapi-flash-path",
			path.join(`${__dirname}/plugins/linux/${(process.arch == "x64" ? "x64" : "ia32")}`,
			"libpepflashplayer.so"
		));
		app.commandLine.appendSwitch("ppapi-flash-version", "32.0.0.371");
	};

	app.setAsDefaultProtocolClient(app.getName());

	app.on("second-instance", () => {
		if(win){
			if(win.isMinimized()) win.restore();
			win.focus();
		}
	});

	setupFlashPlugin();

	app.whenReady().then(() => {
		app.allowRendererProcessReuse = true;
		createWindow();
		win.setIcon(path.join(__dirname, "/assets/icon.png"));
	
		app.on("activate", () => {
			if(BrowserWindow.getAllWindows().length == 0) createWindow();
		});
	});
}
