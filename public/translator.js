import { americanOnly } from './american-only.js';
import { britishOnly } from './british-only.js';
import { americanToBritishSpelling } from './american-to-british-spelling.js';
import { americanToBritishTitles } from './american-to-british-titles.js';

/* 
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/

function capital(str){
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function objectFlip(obj) {
  const ret = {};
  Object.keys(obj).forEach(key => {
    ret[obj[key]] = key;
  });
  return ret;
}



function replaceStr(str, key, value, indexes){
  const str_low = str.toLowerCase()
  const index = str_low.indexOf(key)
  if(index < 0 ){return str}
  const replacement = str.charAt(index) != str_low.charAt(index) ? capital(value) : value
  indexes[key] = replacement
  return str.slice(0, index) + replacement + str.slice(index + key.length)
}

function findIndexes(obj_array, str){
  const str_low = str.toLowerCase()
  const found = new Object()
  for(var [key, value] of obj_array){
    if(str_low.includes(key)  && (['', '.', ' ']).includes(str_low.charAt(str_low.indexOf(key) + key.length ))){
      found[key] = value
    }
  }
  return found
}

function findWordsIndexes(target, str){
  var obj
  if(target == "british"){
    obj = americanOnly
  }else if(target == "american"){
    obj = britishOnly
  }else{
    return str
  }
  return findIndexes(Object.entries(obj), str)
}

function findSpellingIndexes(target, str){
  var obj_array = Object.entries(americanToBritishSpelling)
  if(target == "american"){
    obj_array = Object.entries(objectFlip(americanToBritishSpelling))
  }
  return findIndexes(obj_array, str)
}

function findTitlesIndexes(target, str){
  var obj_array = Object.entries(americanToBritishTitles)
  if(target == "american"){
    obj_array = Object.entries(objectFlip(americanToBritishTitles))
  }
  return findIndexes(obj_array, str)
}

function translateTimesWithIndexes(target, str){
  var result = str
  const indexes = new Object()
  if(target == "british"){
    result = str.replace(/\d+:\d+/, (match) => {
      const new_value = match.split(':').join('.')
      indexes[match] = new_value
      return new_value
    })
  }else if (target == "american"){
    result = str.replace(/\d+.\d+/, (match) => {
      const new_value = match.split('.').join(':')
      indexes[match] = new_value
      return new_value
    })
  }
  return {result, indexes}
  
}

function translateWithIndexes(target, str){
  var {result, indexes} = translateTimesWithIndexes(target, str)
  indexes = {...indexes, ...findWordsIndexes(target, str)}
  indexes = {...indexes, ...findSpellingIndexes(target, str)}
  indexes = {...indexes, ...findTitlesIndexes(target, str)}
  for(const [key, value] of Object.entries(indexes)){
    result = replaceStr(result, key, value, indexes)
  }
  return {result, indexes}
}
 

/* front */

function displayTranslation(str, target){
  var {result, indexes} = translateWithIndexes(target, str)
  const values = Object.values(indexes)
  if(values.length == 0){
    return "Everything looks good to me!"
  }
  
  for(const value of values){
    result = result.replace(value, ("<span class=\"highlight\"> " + value + " </span>"))
  }
  
  return result
}

const target_node = document.getElementById('translated-sentence')
const translate_button = document.getElementById("translate-btn")
const clear_button = document.getElementById("clear-btn")
const textArea = document.getElementById("text-input")
const target_picker = document.getElementById("locale-select")
const error_div = document.getElementById("error-msg")

translate_button.addEventListener('click', () => {
  const target = target_picker.value
  const text = textArea.value
  if(text != "" && target == "american-to-british"){
      target_node.innerHTML = displayTranslation(text, "british")
      error_div.innerHTML = ""
  }else if (text != "" && target == "british-to-american"){
      target_node.innerHTML = displayTranslation(text, "american")
      error_div.innerHTML = ""
  }else{
      error_div.innerHTML = "Error: No text to translate."
  }
})

clear_button.addEventListener('click', () => {
  error_div.innerHTML = ""
  textArea.value = ""
  target_node.innerHTML = ""
})



try {
  module.exports = {
    translateWithIndexes
  }
} catch (e) {}
