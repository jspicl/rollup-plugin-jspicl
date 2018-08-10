import path from "path";
import { spawn, exec } from "child_process";

const pico8PathMap = {
  win32: "C:\\Program Files (x86)\\PICO-8\\pico8.exe",
  darwin: "/Applications/PICO-8.app/Contents/MacOS/pico8",
  linux: "~/pico-8/pico8"
};

export function createPico8Launcher ({ autoRun, customPicoPath, reloadOnSave, pipeOutputToConsole }) {
  let picoProcess = null;

  return cartridgePath => {
    if (!autoRun || !cartridgePath) {
      return;
    }

    if (picoProcess) {
      if (!reloadOnSave) {
        return;
      }

      // Currently only MacOS supports auto reloading when saving.
      process.platform === "darwin" && exec(`osascript "${path.join(__dirname, "reload-pico8.applescript")}"`);
    }
    else {
      // Use customized path if available, otherwise fallback to the default one for the current OS
      const picoPath = customPicoPath || pico8PathMap[process.platform];

      picoProcess = spawn(picoPath, ["-run", `"${path.join(".", cartridgePath)}"`], {
        shell: true,
        stdio: pipeOutputToConsole ? "inherit" : "pipe"
      });

      picoProcess.on("close", code => {
        picoProcess = null;
        code && console.log(`Pico-8 process exited with code ${code}`); // eslint-disable-line no-console
      });
    }
  };
}
