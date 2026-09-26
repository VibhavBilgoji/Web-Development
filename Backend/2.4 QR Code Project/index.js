/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer
  .prompt([
    {
        'type': "input",
        'name': "url",
        'message': "Enter a URL: ",
    }
  ])
  .then((answers) => {
    var qr_svg = qr.image(answers['url'], { type: 'png' });
    qr_svg.pipe(fs.createWriteStream('i_love_qr.png'));
    fs.writeFile("EnteredURL.txt", answers['url'], (err) => {
        if(err) throw err;
        console.log("URL Successfully Saved in a file!");
    });

    console.log(`You Entered: "${answers['url']}"`);
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log(error.isTtyError);
    } else {
      console.log("Something else went wrong");
    }
  });