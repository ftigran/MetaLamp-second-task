
function component() {
    const element = document.createElement('div');
  
    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  
    return element;
  }
  
  document.body.appendChild(component());

/*import * as $ from 'jquery'

/*import './styles/styles.css'
import'./styles/styles.css'*/

/*const post = new Post("webpack post title")

$('pre').addClass('code').html(post.toString())

console.log('post to str', post.toString())
console.log('JSON', json)*/