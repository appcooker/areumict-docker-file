import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { INotebookTracker, NotebookPanel } from '@jupyterlab/notebook';

import { KernelMessage } from '@jupyterlab/services';

import { requestAPIExecutionLogging } from './handler';

/**
 * Initialization data for the codelogging extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'codelogging:plugin',
  description: 'A JupyterLab extension.',
  autoStart: true,
  requires: [INotebookTracker],
  activate: (app: JupyterFrontEnd, tracker: INotebookTracker) => {
    console.log('JupyterLab extension codelogging is activated! 3');

    // Function to hook into IPython execution
    function hookExecution(panel: NotebookPanel) {
      const sessionContext = panel.sessionContext;
      sessionContext.ready.then(() => {
        const kernel = sessionContext.session?.kernel;
        if (kernel) {
          kernel.anyMessage.connect((_, msg) => {
            if (KernelMessage.isExecuteInputMsg(msg.msg)) {
              const code = msg.msg.content.code;
              console.log('app', app);
              console.log('app.shell', app.shell);
              console.log('tracker', tracker);
              console.log('panel', panel);
              console.log('panel', panel.context.path);
              console.log('IPython code executed:', code, msg);

              // POST request
              const dataToSend = {
                code,
                username: msg.msg.header.username,
                session: msg.msg.header.session,
                date: msg.msg.header.date,
                baseURI: panel.node.baseURI
              };
              requestAPIExecutionLogging<any>('contents', {
                body: JSON.stringify(dataToSend),
                method: 'POST'
              })
                .then(reply => {
                  console.log(reply);
                })
                .catch(reason => {
                  console.error(
                    `Error on POST /_/contents ${dataToSend}.\n${reason}`
                  );
                });
            }
          });
        }
      });
    }

    // Hook into notebook panel creation
    tracker.widgetAdded.connect((_, panel) => {
      panel.sessionContext.ready.then(() => {
        hookExecution(panel);
      });
      panel.sessionContext.kernelChanged.connect((_, kernel) => {
        console.log('kernel changed', kernel);
        // if (kernel) {
        //   kernel.statusChanged.connect((_, status) => {
        //     if (status === 'restarting') {
        //       console.log('Kernel is restarting!');
        //       // Place your custom code here.
        //     }
        //   });
        // }
      });
    });

    // Hook into already open notebooks
    tracker.forEach(panel => {
      if (panel.sessionContext.isReady) {
        hookExecution(panel);
      } else {
        panel.sessionContext.ready.then(() => {
          hookExecution(panel);
        });
      }
    });

    app.serviceManager.sessions.runningChanged.connect((manager, models) => {
      models.forEach(async model => {
        const session = await manager.findById(model.id);
        if (session) {
          // const kernel = session.kernel;
          // if (kernel) {
          //   kernel.statusChanged.connect((kernel, status) => {
          //     console.log('KERNEL STATUS', status);
          //     //           if (status === 'starting') {
          //     //             console.log("Kernel is starting")
          //     //           }
          //   });
          //   console.log('kernel CHANGED', kernel);
          // }
          console.log('session CHANGED', session);
        }
        console.log('models CHANGED');
      });
      console.log('CHANGED');
    });
  }
};

export default plugin;
