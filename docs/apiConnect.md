# apiConnect HOC

HOC that connects a Component to next page architecture attaching an async function as a getInitialProps. Returns a react component that wraps the original component and can be used as a page in a next application

## Usage

```jsx
import { apiConnect } from 'next-toolkit';

export default function Component(props) {
  return <div><!-- whatever --></div>;
}

export const ConnectedComponent = apiConnect(async function getInitialProps(context){
  // const initialProps = fetch(...).then(resp => resp.json())
  return initialProps;
})(Component);
```

## Reasoning

In a [standard nextjs application](https://github.com/zeit/next.js/wiki/Global-styles-and-layouts) you have the following structure

```:ascii
  |-- /pages
  |-- /components
  |-- /layouts
```

Business logic can be spread across the three folders and looking for components can get tricky as the project grows.

The idea of moving all business logic in a standard directory as `/component` arises but comes along the idea of flexibly compose and reuse components in pages. Hence the need of the following implementation

```jsx
// /components/Component.jsx
export function Component(props) {
  // return whatever
}

export class ConnectedComponent() {
  static getInitialProps = async (context) => {
    // return initialProps
  }
  render() {
    return <Component {...this.props} />
  }
}
// /pages/whatever-route.js
import { ConnectedComponent } from '../components/Component';
export default ConnectedComponent;

// /components/AnotherComponent.jsx
import { Component } from '../components/Component';
export function AnotherComponent(props) {
  return (
    <div>
      blah blah blah
      <Component {...props.subset} />
    </div>
  )
}
```

The Component can be used either in composition given the needed props or as a page using the exported Connected version.

Actually the `ConnectedComponent` part of the implementation looks like a wonderful HOC use case.
