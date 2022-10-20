import {format, createLogger, transports} from 'winston';


const {timestamp,combine, printf} = format

const myFormat = printf(({level,message, timestamp, stack})=>{
  return `${timestamp} ${level}: ${stack || message}`;
});


const logger = createLogger({

  transports:[
    new transports.Console({
      level:'info',
      format: combine(
        format.colorize(),
        timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        format.errors({stack: true}),
        myFormat
    
      )
    }),
    new transports.File({level:'error',
     filename:'errors.log',
     format: combine(
      timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
      format.errors({stack: true}),
      format.json()
      )
    }),
    new transports.File({level:'warn',
     filename:'warning.log',
     format: combine(
      timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
      format.errors({stack: true}),
      format.json()
      )
    }),
  
  ]

})

// const { format } = winston;

// const logger = winston.createLogger(

//   new winston.transports.Console({
//       level: 'http',
//       format: format.combine(
//         format.colorize(),
//         format.timestamp(),
//         format.printf((msg) => {
//             return `${msg.timestamp} [${msg.level}] ${msg.message}`;
//         })
//       ),
//   }),
//   // new winston.transports.File({
//   //     level: 'warn',
//   //     filename:'warning.log',
//   //     format: format.json(),
//   // }),
//   // new winston.transports.File({
//   //     level: 'error',
//   //     filename:'errors.log',
//   //     format: format.json(),
//   // }),
  

  
// );


export default logger;