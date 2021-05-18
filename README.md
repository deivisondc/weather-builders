# Weather Project

## Objective
This project is a technical challenge proposed in a job interview. It was made using [Next.js](https://nextjs.org/) (a ReactJS framework), using Sass in conjunction with CSS Modules and React ContextAPI to share state between components.

The Weather API used was the [OpenWeatherAPI](https://openweathermap.org/api).

> ## Disclaimer - Firefox Users
> This project uses the CSS property `backdrop-filter` in order to create the `glassmorphism effect` and it is not available for every browser yet. For Firefox users, please follow [this tutorial](https://developer.mozilla.org/pt-BR/docs/Web/CSS/backdrop-filter#compatibilidade_em_navegadores) to enable the feature.

---
## Preview
You can check the preview [here](https://weather.deivison.dev)

## Screenshots
![image](https://i.ibb.co/sVjQVsC/Screenshot-from-2021-05-17-22-07-09.png)
![image](https://i.ibb.co/9W56RzS/Screenshot-from-2021-05-17-22-08-22.png)
![image](https://i.ibb.co/C212gcm/Screenshot-from-2021-05-17-22-09-04.png)

---
## How to run the project
After cloning the project, you should copy the `.env.example` to a new file called `.env.local` and setup the environment variables and then run `npm run dev` or `yarn dev`. The project will run on http://localhost:3000

To run the tests you can run `npm run test` or `yarn test`.

To run the tests and generate the coverage run `npm run test:coverage` or `yarn run test:coverage`

---
## Choices
### Framework
At the beginning I thought it would be a good idea to use the SSR feature from [Next.js](https://nextjs.org/). But during the development I realize that my idea wouldn't work. So the framework help me only on routing since it uses FileSystem Routing and deploy which was using [Vercel](http://vercel.com).

### CSS modules
Since this is the default configuration for the [Next.js](https://nextjs.org/), I kept this. Otherwise I would use [styled-components](https://styled-components.com/).

### TypeScript
I decide to use TypeScript to practice, since I'm doing some courses that use it.

### Inspiration
The layout was inspired by this three designs on [dribbble](http://dribbble.com):

[Layout 1](https://dribbble.com/shots/6756055--50-Shots-for-Practice)

[Layout 2](https://dribbble.com/shots/6761761--50-1-Shots-for-Practice/attachments/6761761?mode=media)

[Layout 3](https://dribbble.com/shots/7376567-Weather-App-Website)

---
## Challenges
Looking for a better user experience, I have to change the code in order to prevent a delay on changing / downloading images, since they are the full size of the screen.

The coverage is not 100% and there are some situations with Jest that I couldn't resolve.

---
## ToDo's
 - 100% coverage
 - Using AsyncStorage to save the last city the user chose
 - Add [StoryBook](https://storybook.js.org/)
