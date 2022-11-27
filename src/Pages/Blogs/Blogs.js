import React from 'react';

const Blogs = () => {
    return (
        <div className='w-11/12 m-auto'>
            <p className='text-xl text-slate-800 font-bold mt-10'>BLOGS</p>
            <h1 className='text-4xl font-bold text-green-500'>Featured Blogs</h1>
            <div className='text-white mt-10'>
                <div tabIndex={0} className="collapse collapse-plus border border-base-300 rounded-box mb-10">
                    <input type="checkbox" className="peer" /> 
                    <div className="collapse-title text-xl bg-green-500 font-medium peer-checked:bg-slate-800 peer-checked:text-secondary-content">
                        What are the different ways to manage a state in a React application?
                    </div>
                    <div className="collapse-content bg-green-500 peer-checked:bg-slate-800 peer-checked:text-secondary-content"> 
                        <p>There are four main types of state you need to properly manage in your React apps: Local state, Global state ,Server state, URL state. Let's cover each of these in detail: Local (UI) state – Local state is data we manage in one or another component. Global (UI) state – Global state is data we manage across multiple components. Server state – Data that comes from an external server that must be integrated with our UI state. URL state – Data that exists on our URLs, including the pathname and query parameters.</p>
                    </div>
                </div>

                <div tabIndex={0} className="collapse collapse-plus border border-base-300 rounded-box mb-10">
                    <input type="checkbox" className="peer" /> 
                    <div className="collapse-title text-xl bg-green-500 font-medium peer-checked:bg-slate-800 peer-checked:text-secondary-content">
                        How does prototypical inheritance work?
                    </div>
                    <div className="collapse-content bg-green-500 peer-checked:bg-slate-800 peer-checked:text-secondary-content"> 
                        <p>The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the "Prototype" of an object, we use Object.getPrototypeOf and Object.</p>
                    </div>
                </div>

                <div tabIndex={0} className="collapse collapse-plus border border-base-300 rounded-box mb-10">
                    <input type="checkbox" className="peer" /> 
                    <div className="collapse-title text-xl bg-green-500 font-medium peer-checked:bg-slate-800 peer-checked:text-secondary-content">
                        What is a unit test? Why should we write unit tests?
                    </div>
                    <div className="collapse-content bg-green-500 peer-checked:bg-slate-800 peer-checked:text-secondary-content"> 
                        <p>The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.</p>
                    </div>
                </div>

                <div tabIndex={0} className="collapse collapse-plus border border-base-300 rounded-box mb-10">
                    <input type="checkbox" className="peer" /> 
                    <div className="collapse-title text-xl bg-green-500 font-medium peer-checked:bg-slate-800 peer-checked:text-secondary-content">
                        React vs. Angular vs. Vue?
                    </div>
                    <div className="collapse-content bg-green-500 peer-checked:bg-slate-800 peer-checked:text-secondary-content"> 
                        <p>There are three frameworks for building web applications that every frontend developer has heard about: React, Vue.js, and Angular. React can be used as a UI library to render elements, without enforcing a specific project structure, and that’s why it’s not strictly a framework. The Vue.js core library focuses on the View layer only. It’s called a progressive framework because you can extend its functionality with official and third-party packages, such as Vue Router or Vuex, to turn it into an actual framework. AngularJS, the original framework, is an MVC (Model-View-Controller)) framework. But in Angular 2, there’s no strict association with MV*-patterns as it is also component-based.</p>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default Blogs;