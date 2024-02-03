import { EOL, arch, cpus, homedir, userInfo } from 'os';
import { INVALID_INPUT } from '../../constants/index.js';
import { coloredLog } from '../../utils/getColoredLog.js';

export const os = async (command) => {
  try {
    switch (command) {
      case '--EOL':
        console.log(JSON.stringify(EOL));
        break;
      case '--cpus':
        console.log(`Total CPUs: ${cpus().length}`);
        cpus().map((cpu) => {
          console.log({ core: cpu.model, speed: Number((cpu.speed / 1000).toFixed(1)) });
        });
        break;
      case '--homedir':
        console.log(homedir());
        break;
      case '--username':
        console.log(userInfo().username);
        break;
      case '--architecture':
        console.log(arch());
        break;
      default:
        console.log(INVALID_INPUT);
        break;
    }
  } catch (error) {
    coloredLog(error.message, 'red');
  }
};
