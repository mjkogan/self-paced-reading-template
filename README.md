# Self-Paced Reading Experiment (PCIbex Template)

This repository contains all of the files necessary to set up and run a basic self-paced reading experiment in [PennController for Internet Based Experiments (PCIbex)](https://doc.pcibex.net/). You can run a [demonstration version of this template](https://farm.pcibex.net/r/NNmAaf/), which also allows you to clone this template on the [PCIbex Farm](https://farm.pcibex.net/). The files are organized according to the PCIbex Farm file directories necessary for loading and running this template: Resources and Scripts. 

## Resources 

This folder contains:
- HTML files
	- Welcome screen (`welcome.html`)
	- Demographic survey (`intro_demographic.html`)
	- Instructions (`instruction.html`)
		- Picture demonstrating the self-paced reading formatting (`spr.png`)
	- Post-experiment debriefing questionnaire (`debrief.html`)
- CSV files
	- Sample Practice Items (`practice.csv`)
	- Sample Experimental Items (`targets.csv`) 
	
These files are referenced by name in the `main.js` file reviewed under Scripts below. 

The HTML files can be edited freely using HTML syntax and formatting. Note the instances of sample contact information in the welcome screen and debriefing form. The instructions include comprehension questions, which will be automatically checked for accuracy; participants will not be able to continue before accurately answering these questions. 

The CSV files include the sentences that participants will read during the course of the experiment. The Experimental Items correspond to a 2 x 2 crossed-factorial design, resulting in four conditions per itemset. PCIbex will present only one condition per itemset (see [the documentation on counterbalancing and group assignment](https://doc.pcibex.net/advanced-tutorial/10_counterbalancing.html) for further information). Note how column names are referenced when generating the self-paced reading items in the `main.js` file, and when logging information about the item in each trial. 


## Scripts 

This folder contains `main.js`, which is the backbone of the entire experiment. This file establishes the sequence of events in the experiment (Lines: 8-20), loads the HTML files from the Resources folder (Lines: 23-81; 172-186), and defines the self-paced reading controller parameters for practice and experimental items (Lines: 83-166). Read more about [creating elements and calling commands](https://doc.pcibex.net/basic-tutorial/) using PCIbex syntax.

## Setting up the experiment in PCIbex Farm

1. Take a look at the [First Steps guide](https://doc.pcibex.net/basic-tutorial/1_first-steps.html) for getting started in PCIbex Farm.
2. Create an blank experiment ("Start a new project" > "Empty Project")
3. Upload the files from the "Resources" folder to the Ibex Farm section on the left "Resources".
4. Upload the files from the "Scripts" folder to the Ibex Farm section on the left labeled "Scripts".
5. Run your self-paced reading experiment!

## Contact

Feel free to reach out (<mjkogan@ucsc.edu>) with any questions or comments. 
