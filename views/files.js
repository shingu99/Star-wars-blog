const fs = require('fs');

fs.readFile('./hellothere.txt', (err,data) =>{
    if(err)
    {
        console.log(err);
    }
    console.log(data.toString());
});

fs.writeFile('./hellothere.txt', 'bsdk', () => {
    console.log('file was written');
});

if(!fs.existsSync('./assets'))
{
    fs.mkdir('./assets', (err) => {
        if(err)
        {
            console.log(err);
        }
        console.log('folder created');
        });    
}
else{
    fs.rmdir('./assets', (err) => {
        if(err)
        {
            console.log(err)
        }
        console.log('folder deleted');
    });
}

if(fs.existsSync('./hellothere.txt'))
{
    fs.unlink('./hellothere.txt', (err) => {
        if(err)
        {
            console.log(err);
        }
        console.log('file deleted');
    });
}