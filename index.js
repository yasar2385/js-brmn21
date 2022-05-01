// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>JS Starter</h1>`;
const ROLE_IDS = {
  '5b53536b4c4a803e9a5abf70': {
    name: 'Author',
    SelectorAttribute: 'showForAU',
    shortname: 'AU',
    backup: '5b53536b4c4a803e9a5abf70_AU',
  },
  '5b534de04c4a803e9a5abf45': {
    name: 'Production Editor',
    SelectorAttribute: 'showForPE',
    shortname: 'PE',
    backup: '5b534de04c4a803e9a5abf45_PE',
  },
  '5bcf15b1cf510152afba028a': {
    name: 'Collator',
    SelectorAttribute: 'showForCO',
    shortname: 'CO',
    backup: '5bcf15b1cf510152afba028a_CO',
  },
  '5bd1c4e2cf51015102014427': {
    name: 'Copyeditor',
    SelectorAttribute: 'showForCE',
    shortname: 'CE',
    backup: '5bd1c4e2cf51015102014427_CE',
  },
  '5b534dc54c4a803e9a5abf41': {
    name: 'Project Manager',
    SelectorAttribute: 'showForPM',
    shortname: 'PM',
    backup: '5b534dc54c4a803e9a5abf41_PM',
  },
  '5b534e334c4a803e9a5abf4c': {
    name: 'Editor',
    SelectorAttribute: 'showForED',
    shortname: 'ED',
    backup: '5b534e334c4a803e9a5abf4c_ED',
  },
  '5b534e5b4c4a803e9a5abf4f': {
    name: 'Journal Manager',
    SelectorAttribute: 'showForJM',
    shortname: 'JM',
    backup: '5b534e5b4c4a803e9a5abf4f_JM',
  },
  '5bcf11635e7186178a22eee0': {
    name: 'Proofreader',
    SelectorAttribute: 'showForPR',
    shortname: 'PR',
    backup: '5bcf11635e7186178a22eee0_PR',
  },
};
const ObjectFilter = (object, key, value, findParentKey) => {
  try {
    findParentKey = findParentKey ? !1 : !0;
    if (Array.isArray(object)) {
      console.log('eee');
      for (const obj of object) {
        const result = ObjectFilter(obj, key, value);
        if (result) {
          return obj;
        }
      }
    } else {
      if (object.hasOwnProperty(key) && object[key] === value) {
        console.log(' - ' + findParentKey);
        return object;
      }

      for (const k of Object.keys(object)) {
        if (typeof object[k] === 'object') {
          const o = ObjectFilter(object[k], key, value);
          //console.log(object[k])
          if (o !== null && typeof o !== 'undefined') return o;
        }
      }
      return null;
    }
  } catch (err) {
    console.warn(err.message);
    //ErrorLogTrace('ObjectFilter', err.message);
  }
};

function getObject(theObject) {
  var result = null;
  if (theObject instanceof Array) {
    for (var i = 0; i < theObject.length; i++) {
      result = getObject(theObject[i]);
    }
  } else {
    for (var prop in theObject) {
      console.log(prop + ': ' + theObject[prop]);
      if (prop == 'id') {
        if (theObject[prop] == 1) {
          return theObject;
        }
      }
      if (theObject[prop] instanceof Object || theObject[prop] instanceof Array)
        result = getObject(theObject[prop]);
    }
  }
  return result;
}
const findByKey = (obj, kee) => {
  if (kee in obj) return obj[kee];
  for (n of Object.values(obj)
    .filter(Boolean)
    .filter((v) => typeof v === 'object')) {
    let found = findByKey(n, kee);
    if (found) return found;
  }
};
function deepSearch(object, key, predicate) {
  if (object.hasOwnProperty(key) && predicate(key, object[key]) === true)
    return object;

  for (let i = 0; i < Object.keys(object).length; i++) {
    let value = object[Object.keys(object)[i]];
    if (typeof value === 'object' && value != null) {
      let o = deepSearch(object[Object.keys(object)[i]], key, predicate);
      if (o != null) return o;
    }
  }
  return null;
}
const findByProperty = (obj, predicate) => {
  if (predicate(obj)) return obj;
  for (n of Object.values(obj)
    .filter(Boolean)
    .filter((v) => typeof v === 'object')) {
    let found = findByProperty(n, predicate);
    if (found) return found;
  }
};
let findByValue = (o, val) => {
  if (o === val) return o;
  if (o === NaN || o === Infinity || !o || typeof o !== 'object') return;
  if (Object.values(o).includes(val)) return o;
  for (n of Object.values(o)) {
    const found = findByValue(n, val);
    if (found) return n;
  }
};
function findObjects(obj, targetProp, targetValue, finalResults) {
  function getObject(theObject) {
    let result = null;
    if (theObject instanceof Array) {
      for (let i = 0; i < theObject.length; i++) {
        getObject(theObject[i]);
      }
    } else {
      for (let prop in theObject) {
        if (theObject.hasOwnProperty(prop)) {
          console.log(prop + ': ' + theObject[prop]);
          if (prop === targetProp) {
            console.log('--found id');
            if (theObject[prop] === targetValue) {
              console.log('----found porop', prop, ', ', theObject[prop]);
              finalResults.push(theObject);
            }
          }
          if (
            theObject[prop] instanceof Object ||
            theObject[prop] instanceof Array
          ) {
            getObject(theObject[prop]);
          }
        }
      }
    }
  }

  getObject(obj);
}
let find_key = function (object, value) {
  return Object.keys(object).filter(
    (k) => JSON.stringify(object[k]) === JSON.stringify(value)
  );
};
let find_CL = ObjectFilter(ROLE_IDS, 'name', 'Collator');
var FIND_CL_ID = getObject(find_CL);
var get_Key = find_key(ROLE_IDS, find_CL);
console.log(get_Key[0]);

const setKeyofRole = function (Obj) {
  try {
    // for loop on obj
    for (var key in Obj) {
      let shotname = Obj[key].shortname;
      //console.log([key, shotname]);
      Obj[shotname]=key;      
    }
    return null;
  } catch (err) {
    console.warn(err.message);
  }
};
setKeyofRole(ROLE_IDS);
console.log(ROLE_IDS);
var test = [];
//var rsult = findObjects(ROLE_IDS, 'name', 'Collator',test);
console.log(test);

const arry = [
  { foo: 0 },
  null,
  { bar: [{ baz: { nutherKey: undefined, needle: 'gotcha!' } }] },
];
const obj1 = {
  alice: Infinity,
  bob: NaN,
  charlie: 'string',
  david: true,
  ebert: arry,
};

//findByKey(obj1, 'needle')// 'gotcha!'

//findByProperty(obj1, val => val.needle === 'gotcha!')
// { nutherKey: undefined, needle: "gotcha!" }

//findByValue(obj1, 'gotcha!')
// { nutherKey: undefined, needle: "gotcha!" }

//var result = deepSearch(myObject, 'title', (k, v) => v === 'Some Recommends');
