#!/usr/bin/env node

var inquirer = require('inquirer');
var replace = require('replace-in-file');
var fs = require('fs-extra');
var karmaFileVersion = require('./karma/version');

var questions = [{
  type: 'list',
  name: 'selectedStep',
  message: 'Change to step (ctrl+c to quit)',
  choices: [
    { name: 'Step 1', value: 'app' },
    { name: 'Step 2 - Beginning of Episode 3', value: 'steps/_step2' },
    { name: 'Step 3 - Beginning of Episode 5', value: 'steps/_step3' },
    { name: 'Step 3 - Exercise', value: 'steps/_step3-exercise' },
    { name: 'Step 3 - Exercise Solution', value: 'steps/_step3-exercise-solution' },
    { name: 'Step 4 - Beginning of Episode 7', value: 'steps/_step4' },
    { name: 'Step 4 - Exercise', value: 'steps/_step4-exercise' },
    { name: 'Step 4 - Exercise Solution', value: 'steps/_step4-exercise-solution' },
    { name: 'Step 5 - Beginning of Episode 8', value: 'steps/_step5' },
    { name: 'Step 5 - Exercise', value: 'steps/_step5-exercise' },
    { name: 'Step 5 - Exercise Solution', value: 'steps/_step5-exercise-solution' },
    { name: 'Step 6', value: 'steps/_step6' },
    { name: 'Step 7', value: 'steps/_step7' },
    { name: 'Step 7 - Exercise Solution', value: 'steps/_step7-exercise-solution' },
    { name: 'Step 8', value: 'steps/_step8' },
    { name: 'Step 8 - Exercise Solution', value: 'steps/_step8-exercise-solution' },
    new inquirer.Separator()
  ]
},];


inquirer.prompt(questions).then(function (answers) {
  replace({
    files: 'src/main.ts',
    from: /(from.\'\.\/).*(?=\/app\.module)/g,
    to: "from './" + answers.selectedStep
  })
  .then( function (){
    console.log("The app.module path in main.ts was replaced to:", answers.selectedStep)
    return replace({
      files: require.resolve('../test.ts'),
      from: /(const context = require\.context\(\').*(\')/g,
      to: "const context = require.context('./"+answers.selectedStep+"'"
    })
  })
  // .then(function () {
  //   return changeKarmaConfContent(answers.selectedStep);
  // })
  .catch(function (err) {
    console.error('Error in replacing "main.ts" ', err);
  })
})
.catch(function (error) {
  console.error('Error in making a choice: ', error);
});


function changeKarmaConfContent(selectedStep) {
  var changeTo;
  switch (selectedStep) {
    case 'app':
      changeTo = 1;  
      break;
    case 'steps/_step2':
      changeTo = 2;  
      break;  
    case 'steps/_step3-exercise':
    case 'steps/_step3-exercise-solution':
    case 'steps/_step3':
    case 'steps/_step4':
      changeTo = 3;  
      break;
    default:
      changeTo = 4;
  }
  
  if (karmaFileVersion !== changeTo){
    
    var source = require.resolve('./karma/step' + changeTo + '_karma.conf.js');
    var dest = require.resolve('../../karma.conf.js');

    return fs.copy(source, dest)
      .then( () => {
        var versionFile = require.resolve('./karma/version');
        return replace({
          files: versionFile,
          from: new RegExp(karmaFileVersion),
          to: changeTo.toString()
        })
        .then(function(){
          console.log('Karma conf content changed')
        })
      })
  }
}