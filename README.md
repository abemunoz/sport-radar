## 🏒 NHL Radar 🥅
- A web app to view current NHL teams and rosters.
  - Link: https://abemunoz.github.io/sport-radar/

## 🏃‍♂️How to Run 🏃‍♀️
- Use node versions between 10.13.0 and 12
  - Node 10 is minimum version required for Gatsby and there is currently a babel issue with 13
- Install Gatsby CLI
  - ```npm install -g gatsby-cli```
- Install node_modules
  - ```npm i```
- Run application
  - ```gatsby develop```

## 🧐 Why Gatsby? 🤔
We are working with mostly static data so there is no need to fetch data at request time. So instead of waiting to generate pages when requested, the pages are pre-built and ready to be delivered instantly. Once loaded Gatsby also pre-fetches resources for other pages so clicking around the site feels incredibly fast. There are multiple options to refresh your data and pages like running a cron job, React Hydration, and splitting your app to fetch data client side for components that do have dynamic data.

Gatsby comes with standard stack that create-react-app but with GraphQL and Gatsby plugins for lazy loading images, responsive images, SEO, and Progressive Web App features among many others. 

These are the lighthouse tests for this web app:
###### Desktop LightHouse
![Desktop Lighthouse](/lighthouse/desktopLightHouse.png)
https://github.com/abemunoz/sport-radar/blob/master/lighthouse/desktopLightHouse.html

###### Mobile LightHouse
![Desktop Lighthouse](/lighthouse/mobileLightHouse.png)
https://github.com/abemunoz/sport-radar/blob/master/lighthouse/mobileLightHouse.html
