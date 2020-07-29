/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

const chai = require('chai');
const assert = chai.assert;

let Translator;

suite('Functional Tests', () => {
 
  
  suiteSetup(() => {
    // DOM already mocked -- load translator then run tests
    Translator = require('../public/translator.js');
    
    
  });

  suite('Function ____()', () => {
    
    
    /* 
      The translated sentence is appended to the `translated-sentence` `div`
      and the translated words or terms are wrapped in 
      `<span class="highlight">...</span>` tags when the "Translate" button is pressed.
    */
    test("Translation appended to the `translated-sentence` `div`", done => {
        const translate_button = document.getElementById("translate-btn")
        const textArea = document.getElementById("text-input")
        const translation_div = document.getElementById("translated-sentence")
        const input = 'Mangoes are my Favorite fruit.';
        const output = 'Mangoes are my <span class=\"highlight\"> Favourite </span> fruit.';
        
     
        textArea.value = input
        translate_button.click()
        assert.equal(translation_div.innerHTML, output)
        done()
    });

    /* 
      If there are no words or terms that need to be translated,
      the message 'Everything looks good to me!' is appended to the
      `translated-sentence` `div` when the "Translate" button is pressed.
    */
    test("'Everything looks good to me!' message appended to the `translated-sentence` `div`", done => {
      const translate_button = document.getElementById("translate-btn")
      const textArea = document.getElementById("text-input")
      const target_picker = document.getElementById("locale-select")
      const translation_div = document.getElementById("translated-sentence")
      const input = 'Mangoes are my Favorite fruit.';
      const output = 'Everything looks good to me!';
      
      target_picker.value = "british-to-american"
      textArea.value = input
      translate_button.click()
      assert.equal(translation_div.innerHTML, output)
      done()
    });

    /* 
      If the text area is empty when the "Translation" button is
      pressed, append the message 'Error: No text to translate.' to 
      the `error-msg` `div`.
    */
    test("'Error: No text to translate.' message appended to the `translated-sentence` `div`", done => {
      const translate_button = document.getElementById("translate-btn")
      const textArea = document.getElementById("text-input")
      const error_div = document.getElementById("error-msg")
      const input = '';
      const output = 'Error: No text to translate.';
      
      textArea.value = input
      translate_button.click()
      assert.equal(error_div.innerHTML, output)
      done()
    });

  });

  suite('Function ____()', () => {
    /* 
      The text area and both the `translated-sentence` and `error-msg`
      `divs` are cleared when the "Clear" button is pressed.
    */
    test("Text area, `translated-sentence`, and `error-msg` are cleared", done => {
      const clear_button = document.getElementById("clear-btn")
      const textArea = document.getElementById("text-input")
      const error_div = document.getElementById("error-msg")
      const translation_div = document.getElementById("translated-sentence")
    
      const output = '';
      
      textArea.value = "zlkjlkhfbdj"
      translation_div.innerHTML = 'ljzhlzjv'
      error_div.innerHTML = 'lhezvflshv'
      clear_button.click()

      assert.equal(error_div.innerHTML, output, 'error_div is cleared')
      assert.equal(translation_div.innerHTML, output, 'translation_div is cleared')
      assert.equal(textArea.value, output, 'textarea is cleared')
      done()
    });

  });

});
