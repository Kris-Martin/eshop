# React e-Shop Website

## Outline

This project is designed to reinforce your React learnings and make sure that you are comfortable with most aspect of the framework.
With this project you will practice how to:

-   Fetch Data within a React App
-   Use react-router-dom
-   Use Firebase/Firestore

## MVP

At a minimum your e-shop website should have three pages:

-   Home Page

    -   This will contain:
        -   A Grid of products
        -   Carousel of featured products

-   Product Page (with id parameter)

    -   Similar to a product page on another site
    -   allows you to add to cart and select product variants

-   All products should be stored in Firestore:

    -   You should store the following information:
        -   quantity
        -   variants (could be colors, sizes, etc)
        -   price per unit
        -   name
        -   image url
        -   favourited or not (boolean)
            All data should be stored in Firestore and fetched by the frontend, there should be NO static product data in the react application

-   Cart Page and system

    Using Firestore and react, create a cart system.

    -   Create a cart page in your react app.

        -   Add logic to prevent users from adding items to cart that are no longer in stock.
        -   You will have to check the current cart and the product quantity.

    -   Cart page should have the following:

        -   List of products in cart
        -   Ability to change quantity of products in cart
        -   Ability to remove items from cart

-   TIPS :
    1. Make sure your site is scoped to one category of products

## Useful links

-   [React-router-dom](https://reactrouter.com/docs/en/v6/getting-started/overview)
-   [Dummy JSON](https://dummyjson.com/)
-   [Fake Store](https://fakestoreapi.com/)

# To run this project...

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
