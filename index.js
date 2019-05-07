
/** library.js */
let instance_ = null

class LibraryInstance {
  constructor(managers) {
    if (!instance_) {
      this.componentsInitialized = false;
      this.managers = managers;
      this.managerInstances = [];
      instance_ = this
    }
    else {
      return instance_
    }
  }

  initComponents() {
    if (this.componentsInitialized) {
      return;
    }
    console.log('Components will be initialized')
    for (const manager of this.managers) {
      const man = new manager();
      this.managerInstances.push(man);
    }
    this.componentsInitialized = true;
  }
}


/** component-manager.js */
class ComponentManager {
  constructor(selector) {
    this.selector = selector;
    this.elements = this.getElements();
    console.log('ComponentManager',selector, this.elements);
    this.initComponents();
  }

  getElements() {
    return document.getElementsByClassName(this.selector);
  }

  initComponents() {
    console.log('ComponentManager, initComponents');
    if (!this.elements || !this.elements.length) {
      return;
    }
    for (const el of this.elements) {
      this.initSingleElement(el);
    }
  }
  initSingleElement(element) {
  }
}

/** filter-manager-js */
const FILTER_SELECTOR = 'filter';
class FilterManager extends ComponentManager {

  
  constructor() {
    super(FILTER_SELECTOR);
  }
  initSingleElement(element) {
    element.innerHTML = 'FILTER';
    /** implementation logic for each filter element */
  }
}

/** search-manager.js */
const SEARCH_SELECTOR = 'search';
class SearchManager extends ComponentManager {

  constructor() {
    super(SEARCH_SELECTOR);
  }
  initSingleElement(element) {
    //element.innerHTML = 'SEARCH!!!!!!!';
    const input = element.getElementsByTagName('input')
    console.log(input)
    input[0].addEventListener('keyup',(e)=>{
      console.log(e.target.value)
      var event = new CustomEvent('custom-keyup', {detail: e.target.value});
      input[0].dispatchEvent(event);

    })
    /** implementation logic for each search element */
  }
}

/** main.js */
function init() {
  console.log('init');
  const manager = new LibraryInstance([FilterManager, SearchManager]);
  manager.initComponents();
}

init();

