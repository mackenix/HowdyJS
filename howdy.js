/* Creates the Howdy.js library v1.0
* inclues jQuery.js
*/

(function (global, $){

  var Howdy = function(firstName, lastName, language){
      return new Howdy.init(firstName, lastName, language);
    }

    /*current languages supported - English Spanish
    also hidden within the scope of this IIFE */
    var supportedLangs = ['en', 'es'];

    //informal greetings
    var greetings = {
        en: 'Hello',
        es: 'Hola'
      };

      // formal greetings
      var formalGreetings = {
        en: 'Greetings',
        es: 'Saludos'
      };

      //logger messages
      var logMessages = {
        en: 'Logged in',
        es: 'Inició de sesión'
      }

      /*Adds the functionality to our Howdy library */
    Howdy.prototype = {

        fullName: function(){
          return this.firstName + ' ' + this.lastName;
        },

        validate: function(){
          //checks if it's a valid langauge
          //references that supported language array above

        if (supportedLangs.indexOf(this.language) === -1){
            throw "Invalid Language! This language is not currently supported";
          }
        },

        greeting: function(){
          return greetings[this.language] + ' ' + this.firstName + "!";
        },

        formalGreeting: function(){
          return formalGreetings[this.language] + ', ' + this.fullName();
        },

        //important!!!
        //chainable methods return their own containing object
        greet: function(formal){
          var msg;

          if(formal){
            msg = this.formalGreeting();
          }
          else{
            msg = this.greeting();
          }

          if(console){
            console.log(msg);
          }

        /*  'this' refers to the calling objct at execution timeout
          makes the method chainable */
          return this;
        },

        log: function(){
          if(console){
            console.log(logMessages[this.language] + ': ' + this.fullName());
          }

          //make's it chainable
          return this;
        },

        setLang: function(lang){
          this.language = lang;

          this.validate();

          //guess what this does? make's it chainable
          return this;
        },

        HTMLGreeting: function(selector, formal){

          //checks if jQuery is loaded...duh
          if(!$){
            throw 'jQuery not loaded!';
          }

          if(!selector){
            throw 'Missing jQuery selector';
          }

          var msg;
          if(formal){
            msg.this.formalGreeting();
          } else{
            msg = this.greeting();
          }

          //injects the message into our DOM
          $(selector).html(msg);

          //survey says...make's it chainable!
          return this;
        }
};

  //creates our object and allows us to use 'new' without calling 'new'
  //ain't that cool?! thanks jQuery dev version for teaching me

    Howdy.init = function(firstName, lastName, language){

      /* sets up the default properties */

      var self = this;
      self.firstName = firstName || '';
      self.lastName = lastName || '';
      self.language = language || 'en';

      self.validate();
    }

    //trick learned again from jQuery so I don't have to use 'new'
    //type new? ain't nobody got time for that!

    Howdy.init.prototype = Howdy.prototype;

    /*attaches the Howdy to our global object and lets me call it by
     using H$. Not sure what else to call it, so it's invoked with
     H$ for now.
    */
    global.Howdy = global.H$ = Howdy;

})(window, jQuery);
