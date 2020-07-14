const weather_form = document.querySelector('form')
const search = document.querySelector('input')
const msgone = document.querySelector('#msg-1')
const msgtwo = document.querySelector('#msg-2')

msgone.textContent=''
msgtwo.textContent=''

weather_form.addEventListener('submit',(e)=>{
    msgone.textContent='Loading....'
    msgtwo.textContent=''
    e.preventDefault()    
    const location = search.value
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        
        if (data.error){
            msgone.textContent=data.error
            
        }
        else{
            msgone.textContent=data.location
            msgtwo.textContent=data.forecast
            
        }

    })

})
})