import scrape from 'website-scraper';

const options = {
  urls: ['https://arrakis.finance/'],
  directory: 'E:/frontend/clone2',
  sources: [
    {selector: 'img', attr: 'src'},
    {selector: 'link[rel="stylesheet"]', attr: 'href'},
    {selector: 'script', attr: 'src'},
    {selector: 'link[rel="icon"]', attr: 'href'},
    {selector: 'link[rel="preload"]', attr: 'href'}
  ],
  recursive: false,
  urlFilter: (url) => {
    return url.indexOf('https://arrakis.finance/') === 0;
  }
};

scrape(options).then((result) => {
    console.log("Entire website downloaded successfully");
}).catch((err) => {
    console.log("An error occurred", err);
});
