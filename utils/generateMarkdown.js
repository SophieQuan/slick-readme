const licenseBadgeLinks = require('./licenseBadgeLinks');

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
    data.licenseBadgeShield = licenseBadgeLinks[data.license]
    return `
# ${data.title}
${data.licenseBadgeShield}

## Description
${data.description}

## Table of Contents
  * [Installation](#installation)

  * [Usage](#usage)

  * [License](#license)

  * [Contribution](#contribution)
  
  * [Tests](#tests)

  * [Questions](#questions)

## Installation
To Install dependencies, run the following: \n 
      ${data.installation}

## Usage
${data.usage}

## License
This repository is licensed under the ${data.license} license.

## Contribution
${data.collaborator}

## Tests
To run test, run the following:\n 
      ${data.test}

## Questions
- Check out my Github repos [${data.github}](https://github.com/${data.github})
- Any questions regarding this repository please contact me at [${data.email}](mailto:${data.email}).
`;
}

module.exports = generateMarkdown;