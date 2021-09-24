import _ from 'lodash';

function component() {
  const element = document.createElement('div');


  // added Lodash
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());
