PennController.ResetPrefix(null)

//uncomment before publishing experiment
//DebugOff();

SetCounter("counter");

//define the sequence of the experiment
Sequence("counter",
    "welcome",
    "demographics",
    "instructions",
    "practice-start",
    sepWith("sep","practice"),
    "practice-end",
    sepWith("sep", shuffle(randomize("targets"))),
    "debriefing",
    "send",
    "completion_screen"
)


//load welcome screen file
newTrial("welcome",
    newHtml("welcome_form", "welcome.html") //displays an html file
        .cssContainer({"width":"1000px"})
        .checkboxWarning("Check the consent box before proceeding")
        .center()
        .print()
        .log()
    ,
    newButton("continue", "Continue")
        .center()
        .print()
        .cssContainer({"margin-bottom":"2em","margin-top":"2em"})
        .wait(getHtml("welcome_form").test.complete()
                  .failure(getHtml("welcome_form").warn()) //waits for button press to procede but doesn't if consent box wasn't checked
        )
)

//load instruction file
newTrial("instructions",
    newHtml("instructions", "instruction.html")
        .cssContainer({"width":"1000px"})
        .center()
        .log()
        .print()
    ,
    newTimer(20).start().wait() 
    ,
    newFunction( ()=>window.scrollTo(0,0) ).call() //fixes issue of htmls being displayed from the bottom of the page
    ,
    newButton("continue", "Continue")
        .center()
        .print()
        .cssContainer({"margin-bottom":"2em","margin-top":"2em"})
        .wait(getHtml("instructions").test.complete()
            .failure(getHtml("instructions").warn())
        )
)

//load demographic file
newTrial("demographics",
    newHtml("demographics_form", "intro_demographic.html")
        .cssContainer({"width":"1000px"})
        .center()
        .print()
        .log()
    ,
    newTimer(20).start().wait() 
    ,
    newFunction( ()=>window.scrollTo(0,0) ).call() 
    ,
    newButton("continue", "Continue")
        .center()
        .print()
        .cssContainer({"margin-bottom":"2em", "margin-top":"2em"})
        .wait(getHtml("demographics_form").test.complete()
            .failure(getHtml("demographics_form").warn())
        )
)

// Create introduction to practice items
newTrial("practice-start"
    ,
    newText("practice-start", "Let's start with a couple of practice sentences.")    
        .center()
        .print()
        .cssContainer({"margin-bottom":"2em"})

    ,
    newButton("continue", "Continue")
        .center()
        .print()
        .wait()

)

// define a separator which appears between each item in the experiment
newTrial("sep",

    newController("Separator",{transfer:"keypress", ignoreFailure:true})
        .print("center at 50%" , "center at 50%")
        .wait()

)

//define the self-paced reading controller which reads the items in the practice.csv file
Template("practice.csv" ,
    // Row will iteratively point to every row in myTable.csv
  row => newTrial("practice",
  
  //SPR
    newController("DashedSentence", 
        {s: row.sentence, 
        mode: "self-paced reading", 
        display:"dashed"})
        .css("font-size","16px")
        .print("center at 50%" , "center at 50%")
        .log()
        .wait()
        .remove()

  )
)

// create a conclusion to practice + introduction to the experimental items
newTrial("practice-end"
    ,
    newText("practice-end", "This is the end of the practice session. The experiment will begin now.")    
        .center()
        .print()
        .cssContainer({"margin-bottom":"2em"})
    ,
    newButton("continue", "Continue")
        .center()
        .print()
        .wait()

)

//define the self-paced reading controller which reads the items in the targets.csv file
Template("targets.csv" ,
    // Row will iteratively point to every row in myTable.csv
  row => newTrial("targets",
  
  //SPR
    newController("DashedSentence", 
        {s: row.sentence, 
        mode: "self-paced reading", 
        display:"dashed"})
        .css("font-size","16px")
        .print("center at 50%" , "center at 50%")
        .log()
        .wait()
        .remove()

  )
  
  //log information about the trials ~ these get appended at the end of results file
  .log("item", row.item)
  .log("condition", row.condition)
  .log("dist_num", row.dist_num)
  .log("gram", row.gram)
  
)


// Send results manually
SendResults("send");

//debriefing
newTrial("debriefing",
    newHtml("debriefing_form", "debrief.html")
        .cssContainer({"width":"720px"})
        .center()
        .log()
        .print()
    ,
    newButton("continue", "Continue")
        .center()
        .print()
        .wait(getHtml("debriefing_form").test.complete()
            .failure(getHtml("debriefing_form").warn())
        )
)


// Completion screen
newTrial("completion_screen",
    newText("thanks", "Thank you for participating!")
        .center()
        .print()
        .cssContainer({"margin-bottom":"2em"})

    ,
    newButton("end experiement", "End")
        .center()
        .print()
        .wait()
)

;