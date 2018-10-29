# Toolkit for Next.js



Easy to use universal HOCs and Utilities for [Next.js](https://github.com/zeit/next.js) to manage page loading, [Edge Side Includes](https://en.wikipedia.org/wiki/Edge_Side_Includes) and `getInitialProps`. \
All these components can be used separately or together to create a composable structure.

- Page with Loader on the client side only
- Edge with Loader on the client side only **(not available yet)**
- Edge Side Include **(not available yet)**
- Edge **(not available yet)**
- ApiConnect utility **(not available yet)**


## How to use

Install:

```bash
npm install next-toolkit --save
```



### Page with Loader
In your page file

```javascript
import React from 'react'
import { withLoader } from 'next-toolkit'

export class Page extends React.Component {
  static async getInitialProps(ctx) {

    await new Promise((resolve) => setTimeout(() => resolve(), 3000));
        /** this promise above is only to performe the example */
  }

  render(){
      return (<div>Hello World!</div>)
  }
}


const Loader = ()=>(<div>Loading</div>)

export default withLoader(Loader)(Page)

```

This file is used both on server and client side. On the server side the `Loader` component will **never** be rendered.


##### Related links

- [zeit/next.js](https://github.com/zeit/next.js) - Framework for server-rendered React applications
