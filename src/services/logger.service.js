//define the time format
function getTime() {
    let now = new Date();
    return now.toLocaleString();
}

function doLog(level, ...args) {
    const strs = args.map(arg => {
        if (typeof arg === 'string') return arg 
        else if (arg instanceof Error) return arg.stack
        return JSON.stringify(arg)
    });
    var line = strs.join(' | ');
    line = `${getTime()} - ${level} - ${line} \n`;
    level === 'ERROR' ? console.error(line) : console.log(line);
}

export const loggerService = {
    debug(...args) {
        // if (process.env.NODE_NEV === 'production') return
        doLog('DEBUG', ...args);
    },
    info(...args) {
        doLog('INFO', ...args);
    },
    warn(...args) {
        doLog('WARN', ...args);
    },
    error(...args) {
        doLog('ERROR', ...args);
    }
};