import 'normalize.css';
import styles from './index.css';
import $ from 'jquery';
import beaniejoyImg from './images/beaniejoy.jpg';
import faceSvg from './images/face.svg';

function component() {
    const element = document.createElement('div');
    element.innerHTML = 'Hello Webpack Changed';

    const imgElement = document.createElement('img');
    imgElement.src = beaniejoyImg;

    const svgElement = document.createElement('img');
    svgElement.src = faceSvg;

    console.log(beaniejoyImg);
    console.log(styles);
    element.appendChild(imgElement);
    element.appendChild(svgElement);
    
    // css modules로 불러오기
    element.classList = styles.helloWebpack;

    return element;
}

document.body.appendChild(component());
console.log($(`.${styles.helloWebpack}`).length);
console.log(`IS_PRODUCTION: ${IS_PRODUCTION}`);