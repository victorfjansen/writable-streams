// /**
//  * Mais lento com proimises
//  */
// const fs = require('fs/promises');
// const { performance } = require("perf_hooks");

// ;
// (async () => {
//     const commandHandler = await fs.open('./something.txt', "w");

//     const prev = performance.now();
//     for (let i = 0; i < 1_000_000; i++) {
//         const buffer = Buffer.from(`My extensive log! \n`, 'utf-8');
//         await commandHandler.write(buffer)
//     }

//     const before = performance.now()

//     console.log(before - prev, "time in ms");
//     commandHandler.close()
// })()

// const fs = require('fs/promises');
// const { performance } = require("perf_hooks");

// ;
// (async () => {
//     const prev = performance.now();
//     const commandHandler = await fs.open('./something.txt', "w");

//     for (let i = 0; i < 1_000_000; i++) {
//         const buffer = Buffer.from(`My extensive log! \n`, 'utf-8');
//         commandHandler.writeFile(buffer)
//     }

//     const before = performance.now()

//     console.log(before - prev, "time in ms");
//     commandHandler.close()
// })()

// const fs = require('fs');
// const { performance } = require("perf_hooks");

// ;
// (() => {
//     const prev = performance.now();
//     fs.open('./something.txt', "w", (err, fd) => {

//         for (let i = 0; i < 1_000_000; i++) {
//             const buffer = Buffer.from(`My extensive log! \n`, 'utf-8');
//             fs.writeSync(fd, buffer)
//         }

//         const before = performance.now()

//         console.log(before - prev, "time in ms");
//     });
// })()

// const fs = require('fs/promises');
// const { performance } = require("perf_hooks");

// ;
// (async () => {
//     const prev = performance.now();
//     const commandHandler = await fs.open('./something.txt', "w");
//     const stream = commandHandler.createWriteStream();

//     for (let i = 0; i < 1_000_000; i++) {
//         const buffer = Buffer.from(`My extensive log! \n`, 'utf-8');
//         stream.write(buffer)
//     }

//     const before = performance.now()

//     console.log(before - prev, "time in ms");
//     commandHandler.close()
// })()


const fs = require('fs/promises');
const { performance } = require("perf_hooks");

;
(async () => {
    const commandHandler = await fs.open('./something.txt', "w");
    const stream = commandHandler.createWriteStream();

    let i = 0;

    const MAX_ITERATIONS = 1_000_000;
    const prev = performance.now();

    const fillMany = () => {
        while (i < MAX_ITERATIONS) {
            const buffer = Buffer.from(`My extensive log! \n`, 'utf-8');

            // if our last write
            if (i === MAX_ITERATIONS - 1) {
                stream.end(buffer)
                break
            }

            // if our stream inside of buffer are filled
            if (!stream.write(buffer)) {
                break
            }

            i++;
        }
    }

    fillMany();

    // if buffer stream inside loop has been free
    stream.on("drain", () => {
        fillMany();
    })

    stream.on("finish", () => {
        const before = performance.now()
        console.log(before - prev, "time in ms");

        commandHandler.close()
    })
})()
