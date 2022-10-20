import pino from "pino"
import __dirname from "../utils.js"

const streams = [
  {level:'info', stream:process.stdout},
  {level:'warn', stream:pino.destination(__dirname+'/logFiles/warn.log')},
  {level:'error', stream:pino.destination(__dirname+'/logFiles/error.log')},
]
const logger = pino({
  transport: {
    target: 'pino-pretty', 
    options: {
      translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
      ignore: 'pid, hostname'
    }
  }
},pino.multistream(streams))






export default logger;
