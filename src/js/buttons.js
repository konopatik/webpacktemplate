const buttons = document.querySelectorAll('.buttons');
 if(buttons) {
     buttons.forEach(el => {
         const button = (el.querySelectorAll('button'));
            button.forEach(el => {
                el.classList.add('buttons__general-style','buttons__general-text','product__svg-button')
            })
     })

 }