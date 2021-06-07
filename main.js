const electron=require('electron');
const url=require('url');
const path=require('path');

const {app, BrowserWindow, Menu} =electron;

//Set Environment
process.env.NODE_ENV='production';



let mainWindow;
let helpAppWindow;
let helpTechniquesWindow;

//Listen for the app to be ready

app.on('ready',function(){
    //Create new window
    mainWindow=new BrowserWindow({});
    //Load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname,'app/index.html'),
        protocol: 'file',
        slashes:true
    }));
    mainWindow.maximize();
    //Quit app and its children when closed

    mainWindow.on('closed', function(){
        app.quit();
    });
    
    //Build menu from template
    const mainMenu=Menu.buildFromTemplate(mainMenuTemplate);
    //Insert menu
    Menu.setApplicationMenu(mainMenu);
});

//Handle create helpApp window

function createHelpAppWindow(){
     //Create new window
     helpAppWindow=new BrowserWindow({
         width:700,
         height:600,
         title: 'Add Item'
     });
     //Load html into window
     helpAppWindow.loadURL(url.format({
         pathname: path.join(__dirname,'app/helpApp.html'),
         protocol: 'file',
         slashes:true
     }));
     //Garbage collection
     helpAppWindow.on('closed', function(){
        helpAppWindow=null;
    });

}

//Handle create helpTechniques window

function createHelpTechniquesWindow(){
    //Create new window
    helpTechniquesWindow=new BrowserWindow({
        width:700,
        height:600,
        title: 'Add Item'
    });
    //Load html into window
    helpTechniquesWindow.loadURL(url.format({
        pathname: path.join(__dirname,'app/helpTechniques.html'),
        protocol: 'file',
        slashes:true
    }));
    //Garbage collection
    helpTechniquesWindow.on('closed', function(){
        helpTechniquesWindow=null;
   });

}

//Create menu template
const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Help :)',
                click(){
                    createHelpAppWindow();
                }
            },
            {
                label: 'Quit',
                accelerator: process.platform=='darwin'?'Command+Q':'Ctrl+Q',
                click(){
                    app.quit();
                }
            },
        ]
    },
    {
        label: 'Scheduling Techniques',
        submenu: [
            {
                label: 'FCFS',
                click(){
                    let code = `changeSelectToFCFS();`;
                    mainWindow.webContents.executeJavaScript(code);
                }
            },
            {
                label:'SJF',
                click(){
                    let code = `changeSelectToSJF();`;
                    mainWindow.webContents.executeJavaScript(code);
                }
            },
            {
                label:'SJF Preemtive',
                click(){
                    let code = `changeSelectToSJFpre();`;
                    mainWindow.webContents.executeJavaScript(code);
                }
            },
            {
                label:'Priority',
                click(){
                    let code = `changeSelectToPriority();`;
                    mainWindow.webContents.executeJavaScript(code);
                }
            },
            {
                label:'Priority Preemtive',
                click(){
                    let code = `changeSelectToPrioritypre();`;
                    mainWindow.webContents.executeJavaScript(code);
                }
            },
            {
                label:'Round Robin',
                click(){
                    let code = `changeSelectToRR();`;
                    mainWindow.webContents.executeJavaScript(code);
                }
            },
            {
                label: 'Help',
                click(){
                    createHelpTechniquesWindow();
                }
            },
        ]
    }
];

//If Mac machine, add empty object to menu
if(process.platform==='darwin'){
    mainMenuTemplate.unshift({});
}

//Add developer tools if not in production
if(process.env.NODE_ENV !=='production') {
    mainMenuTemplate.push({
        label:'Developer tools',
        submenu: [
            {
                label: 'Toggle Devtools',
                accelerator: process.platform=='darwin'?'Command+I':'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    });
}