module.exports = function getRoutes(greetings){
    
     async function dRouts (req, res) {
        res.render('index', {
          message: 'Greet message will display here',
          counter: await greetings.counter()
        })
      
      }
      async function flshMessage(req, res) {
        const enterName = req.body.name
        const languages = req.body.language
      
        let errorMessage = "";
      
        if (!enterName && !languages) {
          errorMessage = 'select  your name and language';
        }
        else if (!languages) {
          errorMessage = 'Select Language'
        }
        else if (!enterName) {
          errorMessage = 'Enter Your Name Please'
        }
      
        if (errorMessage) {
          req.flash('info', errorMessage);
          res.render('index')
        } else {
          res.render("index", {
            message: await greetings.code(enterName, languages),
            counter: await greetings.counter()
          })
        }
      
        //   
        // await  greetings.setName(enterName)
      
      
      }
      async function gettingTheList(req, res) {
        //     //  var names = 
        // // console.log(names)
        res.render('greeted', {
          list: await greetings.getNames()
        })
      
      
      }
      async function greetedMessage(req, res) {
        const actions = req.params.name
        const counter = await greetings.getCounter(actions)
      
        res.render('message', {
          message: await greetings.getMessage(actions, counter)
        })
      
      }
      async function buttonRst(req, res) {
        try {
          await greetings.resetBtn()
        } 
        catch (err) {
        }
      
        res.redirect("/")
      
      
      }

      return{
        dRouts,
        flshMessage,
        gettingTheList,
        greetedMessage,
        buttonRst
      }
      
}












































