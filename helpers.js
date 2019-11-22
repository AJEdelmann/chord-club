const badReligion = 'https://tabs.ultimate-guitar.com/tab/bad_religion/infected_chords_1514903';
const bobMarley = 'https://tabs.ultimate-guitar.com/tab/bob_marley/redemption_song_chords_27793';
const oasis = 'https://tabs.ultimate-guitar.com/tab/oasis/wonderwall-chords-27596';
const ledZeppelin = 'https://tabs.ultimate-guitar.com/tab/led_zeppelin/stairway_to_heaven_tabs_9488';

// https://www.ultimate-guitar.com/explore?type[]=Chords

urlInclude = url => {
    // let urls = [];
    // urls.push(url);
    if (url.includes('https://tabs.ultimate-guitar.com/tab/') && url.includes('chords')) {
        return 'ihaaaa';
        // for (let i = 0; i < 3; i++) {
        //     const url = urls[i];
        //     await page.goto(`${url}`);
        //     await page.waitForNavigation({
        //         waitUntil: 'networkidle'
        //     });
        // }

    } else return 'buuuuuuuu';
}

console.log(urlInclude(badReligion));
console.log(urlInclude(ledZeppelin));




// const dealingWithUrl = (url) => {
//         const urls = [...]

//         for (let i = 0; i < 3; i++) {
//             const url = urls[i];
//             await page.goto(`${url}`);
//             await page.waitForNavigation({
//                 waitUntil: 'networkidle'
//             });
//         }

//     // let arr = url.split('/');
//     // return {
//     //     artist: arr[4],
//     //     title: arr[5]
//     // };
// }
// console.log(dealingWithUrl(badReligion));
// console.log(dealingWithUrl(bobMarley));
// console.log(dealingWithUrl(oasis));
// console.log(dealingWithUrl(ledZeppelin));