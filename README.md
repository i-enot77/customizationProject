# 3D Furniture Customization — E-commerce Project

## Overview

**Full-stack e-commerce application with an interactive 3D product configurator.**

This personal portfolio project explores how a React-based storefront can be connected to real-time 3D models customization on canvas, a shopping cart, a Node.js/Express API, MongoDB, and a Stripe test-mode checkout. The main focus is the interaction between the product interface, configurable 3D models, and backend data.

## Key Features

- Browse a furniture catalog with product details and category-based navigation.
- Inspect supported furniture products in an interactive 3D viewer.
- Customize visible product materials; supported models can expose separate options for the furniture body and legs.
- Use selectable options to update the rendered appearance of a model.
- Add selected items/configurations to the cart and adjust quantities.
- **Backend integration:** Use an Express REST API with MongoDB to manage application data.
- **Test checkout:** Create Stripe Checkout sessions in test mode. The backend also includes code for handling payment-related webhook events.

## Tech stack

| Layer | Technologies |
| --- | --- |
| Frontend | React, TypeScript, Vite, React Router |
| State and API integration | Redux Toolkit, RTK Query |
| 3D rendering | Three.js, React Three Fiber, Drei, WebGL |
| Interface and forms | Tailwind CSS, Material UI, Formik, Yup |
| Backend | Node.js, Express.js |
| Persistence | MongoDB, Mongoose |
| Payments | Stripe Checkout (test environment) |
| Supporting tools | Blender, Figma |

## Project Status

This is a **personal portfolio project**, not a production store. It demonstrates how interactive 3D customization can be combined with a React storefront, a shopping cart, a REST API, and a test payment flow. Some integrations require separate configuration; no real payments are processed.
