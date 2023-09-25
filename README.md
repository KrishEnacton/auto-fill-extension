#### How the Auto-filling functionality works?

1. Create a new folder of website name (which you want to implement auto-filling) inside the websites folder.
2. Create two new files named `index.ts` and `config.ts`
   - index file having the actual auto-filling functionality
   - config file having the selectors, url, name, etc for the website.
3. Additionally you need to add if check in `autoFilling.ts` file and `config.ts` file inside the Popup folder.
4. We are matching the website using it's regex inside the config file, auto-filling primarily works input type wise.
   - we are iterating through the selectors in the config, each selector has key-value pair
   - in each key-value pair, key is exactly the name of the field set in the values from the form in the options page
   - and value from the key-value pair should be the selector innerText/innerHTML that you'll get the access through regex.
   - their is main autofilling function inside every index file of the websites.
   - that main function iterates through each selector (from _config_) and fill the value that is mapped using _getInputValue_ function
   - and there are separate functions for different input types depending on the complexity of the input field of the website.
