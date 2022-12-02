# Getting Started


1. Open your terminal and then type the following to clone the repo
  ```
   git clone {the url to the GitHub repo}
   ```

2. cd into the new folder and type to install the dependencies.
 ```
   $ npm install
   ```

3. To run the React project. 
  ```
  $ npm start
  ```

4. Hover on the + (plus icon) in the sidebar and click on the 'Add filter' text.
Select a tag from the dropdown.

5. Click on the select value. Then, select a value to make a filter
 
6. If the same label is selected, then the filter is AND filter.
 
7. If different labels are selected, then the filter is OR filter.

### Structure of the app: 

the app is structured into five folders 
1. app - which contains the global store
2. features - which contains global slice ( actions and reducers )
3. components - the components of the application
4. shared - files that are commonly shared among components
5. svgs - the svgs used in the app

### Global state: 
states which are used interchangeably across the components are only included in the global state

### Additional features:

##### Restriction on the addition of filters:
1. restriction of selecting a tag without selecting the label
2. restriction of applying filter without setting value
3. restriction of selecting the same value when the label and tag are the same
