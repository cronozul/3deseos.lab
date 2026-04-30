const fs = require('fs');
const readline = require('readline');
const path = require('path');

const logPath = 'C:\\Users\\GABRI\\.gemini\\antigravity\\brain\\204f2a51-37c9-4de0-8cd8-c7288cdcd8fc\\.system_generated\\logs\\overview.txt';

async function extract() {
    const fileStream = fs.createReadStream(logPath);
    const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

    for await (const line of rl) {
        try {
            if (line.includes('"step_index":220,')) {
                const data = JSON.parse(line);
                let code = data.tool_calls[0].args.CodeContent;
                if (code.startsWith('"') && code.endsWith('"')) code = JSON.parse(code);
                fs.writeFileSync('c:\\Users\\GABRI\\Downloads\\3deseos.lab\\website\\src\\pages\\Community.jsx', code);
                console.log('Extracted Community.jsx');
            }
            if (line.includes('"step_index":250,')) {
                const data = JSON.parse(line);
                let code = data.tool_calls[0].args.CodeContent;
                if (code.startsWith('"') && code.endsWith('"')) code = JSON.parse(code);
                fs.writeFileSync('c:\\Users\\GABRI\\Downloads\\3deseos.lab\\website\\src\\pages\\About.jsx', code);
                console.log('Extracted About.jsx');
            }
        } catch (e) {
            // console.error(e);
        }
    }
}
extract();
