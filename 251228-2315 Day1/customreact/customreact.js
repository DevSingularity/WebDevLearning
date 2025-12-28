
function customRender(reactEle, container){
    //long method
    // const domElement=document.createElement(reactEle.type)
    // domElement.innerHTML=reactEle.Children
    // domElement.setAttribute('href', reactEle.props.href)
    // domElement.setAttribute('target', reactEle.props.target)
    // container.appendChild(domElement)

    //short method
    const domElement=document.createElement(reactEle.type)
    domElement.innerHTML=reactEle.Children
    for (const prop in reactEle.props) {
        if (prop==='Children') continue;
        domElement.setAttribute(prop, reactEle.props[prop])
    }
    container.appendChild(domElement)
}

const reactEle={
    type: 'a',
    props: {
        href: 'https://google.com',
        target: '_blank'
    },
    Children: 'CLick to open google'
}

const mainContainer=document.querySelector('#root')

customRender(reactEle, mainContainer);

// here we have demonstrated how react works, 
// the eles are taken from the users' react code
// and passes it to a similar function